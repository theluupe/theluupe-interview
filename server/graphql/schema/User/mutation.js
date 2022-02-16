const { extendType } = require('nexus');
const { SignUpInput, LoginInput } = require('./types');
const { signUp, login } = require('./resolvers');

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
    t.field('login', {
      type: 'User',
      args: {
        data: LoginInput,
      },
      resolve: login,
    });
  },
});

module.exports = {
  Mutation,
};
