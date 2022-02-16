const { extendType } = require('nexus');
const { SignUpInput } = require('./types');
const { signUp } = require('./resolvers');

const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.field('signUp', {
      type: 'User',
      args: {
        data: SignUpInput,
      },
      resolve: signUp,
    });
  },
});

module.exports = {
  Mutation,
};
