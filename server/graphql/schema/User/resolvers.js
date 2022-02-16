const { setLoginSession, passwordIsValid, generatePassword, removeTokenCookie } = require('../../../lib/auth');

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

async function login(_parent, { data }, { prisma, response }) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (user && passwordIsValid(user.salt, user.password, data.password)) {
    const session = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    await setLoginSession(response, session);

    return user;
  }

  throw new Error('Invalid email and password combination');
}

async function logout(_parent, _args, { response }) {
  removeTokenCookie(response);
  return true;
}

module.exports = {
  fullName,
  signUp,
  login,
  logout,
};
