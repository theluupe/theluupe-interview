const { objectType } = require('nexus');

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

module.exports = {
  User,
};
