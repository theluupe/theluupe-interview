const { serialize, parse } = require('cookie');

const TOKEN_NAME = 'luupe-user-token';

const MAX_AGE = 60 * 60 * 8; // 8 hours

function setTokenCookie(response, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  response.setHeader('Set-Cookie', cookie);
}

function removeTokenCookie(response) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  response.setHeader('Set-Cookie', cookie);
}

function parseCookies(request) {
  if (request.cookies) return request.cookies;

  const cookie = request.headers?.cookie;
  return parse(cookie || '');
}

function getTokenCookie(request) {
  const cookies = parseCookies(request);
  return cookies[TOKEN_NAME];
}

module.exports = {
  setTokenCookie,
  removeTokenCookie,
  parseCookies,
  getTokenCookie,
};
