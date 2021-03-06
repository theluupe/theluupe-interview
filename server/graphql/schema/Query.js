const { queryType } = require('nexus');

const Query = queryType({
  definition(t) {
    t.crud.user({ filtering: true });
    t.crud.users({ ordering: true, filtering: true });
  },
});

module.exports = {
  Query,
};
