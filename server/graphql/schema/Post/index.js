const { objectType } = require('nexus');

// const { authorData } = require('./resolver');

// GraphQL error: GraphQLError: Cannot query field "author" on type "Post".
const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
  },
});

module.exports = {
  Post,
};
