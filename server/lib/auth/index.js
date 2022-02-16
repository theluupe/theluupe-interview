const Iron = require('@hapi/iron');
const crypto = require('crypto');
const { MAX_AGE, setTokenCookie, getTokenCookie, removeTokenCookie } = require('./cookies');

const { TOKEN_SECRET } = process.env ?? 'secret';

function generatePassword(userPassword) {
  const salt = crypto.randomBytes(16).toString('hex');
  const password = crypto.pbkdf2Sync(userPassword, salt, 1000, 64, 'sha512').toString('hex');

  return { salt, password };
}

function passwordIsValid(userSalt, userPassword, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, userSalt, 1000, 64, 'sha512').toString('hex');

  return userPassword === inputHash;
}

async function setLoginSession(response, session) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults);

  setTokenCookie(response, token);
}

async function getLoginSession(request) {
  const token = getTokenCookie(request);

  if (!token) return null;

  const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}

module.exports = {
  removeTokenCookie,
  generatePassword,
  passwordIsValid,
  setLoginSession,
  getLoginSession,
};
