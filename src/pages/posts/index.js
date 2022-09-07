import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { withApollo } from '@lib/apollo';
import { GetPosts } from '@lib/gql/queries.gql';

import { PublicLayout } from '@templates/Layout';
import { PostsManager } from '@templates/PostsManagement';

function Posts() {
  const { data, loading } = useQuery(GetPosts);
  const posts = data?.posts || [];

  return (
    <PublicLayout loading={loading}>
      <PostsManager posts={posts} />
    </PublicLayout>
  );
}

// eslint-disable-next-line import/no-default-export
export default withApollo(Posts);
