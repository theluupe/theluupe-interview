const { extendType } = require('nexus');
const { User, SignUpInput, LoginInput } = require('./types');
const { signUp, login, logout } = require('./resolvers');

const Mutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneUser();
    t.field('signUp', {
      type: User,
      args: {
        data: SignUpInput,
      },
      resolve: signUp,
    });
    t.field('login', {
      type: User,
      args: {
        data: LoginInput,
      },
      resolve: login,
    });
    t.field('logout', {
      type: 'Boolean',
      resolve: logout,
    });
  },
});

module.exports = {
  Mutation,
};
