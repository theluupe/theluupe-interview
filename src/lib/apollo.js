import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import React from 'react';

import { log } from '@shared/lib/logger';
import { addNotification } from './notifications';

let globalApolloClient = null;

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(initialState = {}) {
  const isSSR = typeof window === 'undefined';
  const cacheOptions = {
    dataIdFromObject: object => {
      if (object.id) {
        return `${object.__typename}.${object.id}`;
      }
      if (object.value || object.code) {
        return `${object.__typename}.${object.value || object.code}`;
      }
      return defaultDataIdFromObject(object);
    },
  };
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    const errorMsgs = [];
    (graphQLErrors || []).forEach(err => {
      if (err) {
        errorMsgs.push(err);
      }
    });
    const withErrorMsgs = errorMsgs.length > 0;
    if (graphQLErrors || networkError) {
      if (withErrorMsgs) {
        const parsedMsg = errorMsgs.join(' ');
        addNotification({ message: parsedMsg });
      } else {
        addNotification();
      }
    }
  });
  const httpLink = new HttpLink({
    // We only need absolute URLs on the server
    uri: `${isSSR ? 'http://localhost:3000' : ''}/graphql`,
    credentials: 'same-origin',
    fetch,
  });
  return new ApolloClient({
    // Disable forceFetch on the server (so queries are only run once)
    ssrMode: isSSR,
    link: ApolloLink.from([errorLink, httpLink]),
    cache: new InMemoryCache(cacheOptions).restore(initialState),
  });
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(...props) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(...props);
  }
  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(...props);
  }
  return globalApolloClient;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent, { ssr = true } = {}) {
  // eslint-disable-next-line react/prop-types
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';
    if (displayName === 'App') {
      log.warn('This withApollo HOC only works with PageComponents.');
    }
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx;
      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      // eslint-disable-next-line no-multi-assign
      const apolloClient = (ctx.apolloClient = initApolloClient({}));

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />,
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            log.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}
