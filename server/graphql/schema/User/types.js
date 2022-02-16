const { objectType, inputObjectType } = require('nexus');

const { fullName } = require('./resolvers');

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.firstName();
    t.model.lastName();
    t.string('fullName', { resolve: fullName });
  },
});

const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('password');
  },
});

const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

module.exports = {
  User,
  SignUpInput,
  LoginInput,
};
