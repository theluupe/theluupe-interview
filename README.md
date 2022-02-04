# The Luupe Interview App

## Stack

### Introduction

Welcome to our interview App. The web application uses [Next.js](https://nextjs.org/) together with a [custom server](https://nextjs.org/docs/advanced-features/custom-server)
that uses [graphql-yoga](https://github.com/prisma-labs/graphql-yoga) to run the GraphQL API. The main benefits of this are:

- Next.js provides SSR support for better search engine indexing and load times on slower devices, as well as a sensible and tested framework
  together with a mature ecosystem.
- GraphQL is becoming the standard for APIs, and something we can open up to other companies for integration purposes.
- Using a custom server with Next.js allows us to run both SSR and our GraphQL API with one command, on a single instance. This
  eases development and deployments until we need to separate these into separate projects.

The app is running on port `3000` and you will find the actual activities and requirements once you run the app and go to the main page (`localhost:3000/`)

### Frontend

The frontend is built using [React](https://reactjs.org/) and written in a mix of ES2018 (ES9) JavaScript and TypeScript (currently under migration).
Since the frontend interfaces with the backend via GraphQL, we use the [Apollo Client for React](https://www.apollographql.com/docs/react/)
together with the hooks interface to supply data to our components. Since Apollo already has a client side cache, we are
using it with its [local state support](https://www.apollographql.com/docs/tutorial/local-state/) instead of having a
separate state management system such as Redux.

We are using a customized version of [Bootstrap 4](https://getbootstrap.com/) for our UI framework, including React components
provided by [React Bootstrap](https://react-bootstrap.github.io/).

Most of the frontend-specific code is in the `/src` folder, and follows the Next.js folder structure conventions mixed with [`Atomic Design`](https://bradfrost.com/blog/post/atomic-web-design/).

### Backend

The backend server is powered by [Express.js](https://expressjs.com/) via the graphql-yoga server, which initially adds
the GraphQL routes:

- `/graphql` hosts our main GraphQL endpoint
- `/graphql/playground` hosts a playground to test out queries/mutations
- `/graphql/subscriptions` hosts a websocket server for GraphQL subscriptions

Most of the backend-specific code is in the `/server` folder.

### Database

Our database code is managed by [Prisma](https://github.com/prisma/prisma). On the backend, we interface with our database using [Prisma Client](https://github.com/prisma/prisma-client-js) on the backend, which is called in our
[GraphQL Nexus](https://nexus.js.org/) schema definition files. These definitions then generate `.graphql` files that are loaded into Apollo Server.

### Installation

You will need the following (you'll need [Homebrew](https://brew.sh/) on macOS):

```shell
# n (node version manager) and Yarn
brew install n yarn
# Install Node.js v12
sudo n 12

# Install the project dependencies
yarn install
```

You can also use [nvm](https://github.com/nvm-sh/nvm).

Then you can run the project using `yarn dev`.

### Conventions

- Use `async`/`await` syntax for async calls
- Use [React hooks](https://reactjs.org/docs/hooks-intro.html) where possible
- Use Apollo's [local state](https://www.apollographql.com/docs/tutorial/local-state/) where you would use Redux

We use [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), and [Husky](https://github.com/typicode/husky) to maintain code formatting/standards.
