function getItem(key) {
  const isServer = typeof window === 'undefined';

  return isServer ? null : window.localStorage.getItem(key);
}

function setItem(key, value) {
  const isServer = typeof window === 'undefined';

  if (!isServer) {
    window.localStorage.setItem(key, value);
  }
}

function removeItem(key) {
  const isServer = typeof window === 'undefined';

  if (!isServer) {
    window.localStorage.removeItem(key);
  }
}

export function getUser() {
  const userString = getItem('user');

  return userString ? JSON.parse(userString) : null;
}

export function setUser(user) {
  setItem('user', JSON.stringify(user));
}

export function removeUser() {
  removeItem('user');
}

export function isAuthenticated() {
  return getUser() != null;
}
