module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  parserOptions: {
            ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
  },
  plugins: ['react', 'prettier'],

  rules: {
    'class-methods-use-this': 'off',
    'prettier/prettier': 'error',
    camelcase: 'off',
    'linebreak-style': 0,
    'trailing-comma': [true],
  },
};
