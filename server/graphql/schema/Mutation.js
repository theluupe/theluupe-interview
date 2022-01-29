const { mutationType } = require('nexus');

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneUser();
  },
});

module.exports = {
  Mutation,
};
