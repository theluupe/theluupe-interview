const { nexusPrisma } = require('nexus-plugin-prisma');
const { makeSchema, declarativeWrappingPlugin } = require('nexus');
const { getLoginSession } = require('../lib/auth');
const prisma = require('../lib/prisma');
const types = require('./schema');

const schema = makeSchema({
  types,
  plugins: [declarativeWrappingPlugin(), nexusPrisma({ experimentalCRUD: true, paginationStrategy: 'prisma' })],
  outputs: {
    schema: `${__dirname}/generated/schema.graphql`,
    typegen: `${__dirname}/generated/nexus.ts`,
  },
});

const context = async ({ request, response }) => {
  const session = await getLoginSession(request);
  return {
    session,
    request,
    response,
    prisma,
  };
};

module.exports = {
  schema,
  context,
};
