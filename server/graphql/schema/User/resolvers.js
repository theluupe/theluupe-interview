const { generatePassword } = require('../../../lib/auth');

function fullName(parent) {
  const { firstName, lastName } = parent;
  if (firstName || lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  return null;
}

async function signUp(_parent, { data }, { prisma }) {
  const user = await prisma.user.create({
    data: {
      ...data,
      ...generatePassword(data.password),
    },
  });

  return user;
}

module.exports = {
  fullName,
  signUp,
};
