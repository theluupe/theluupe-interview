const { extendType } = require('nexus');

const Query = extendType({
  type: 'Query',
  definition(t) {
    t.crud.user({ filtering: true });
    t.crud.users({ ordering: true, filtering: true });
  },
});

module.exports = {
  Query,
};
