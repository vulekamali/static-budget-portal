module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:sonarjs/recommended',
    'plugin:lodash/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-app',
    'prettier',
    'jest',
    'compat',
    'filenames',
    'sonarjs',
    'optimize-regex',
    'jsdoc',
    'lodash',
  ],
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off', // Conflicts with Prettier
    '@typescript-eslint/prefer-interface': 'off',
    'filenames/match-exported': 'warn',
    'optimize-regex/optimize-regex': 'warn',
    'jsdoc/require-jsdoc': 'error',
    'lodash/prefer-lodash-method': 'off',
    'lodash/prefer-constant': 'off',
    'no-warning-comments': ["error", { "terms": ["todo", "fixme"], "location": "anywhere" }],
    'jest/valid-describe': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
};
