module.exports = {
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  env: {
    node: true,
  },
  rules: {
    'global-require': 'off',
    'import/prefer-default-export': 'off'
  },
};
