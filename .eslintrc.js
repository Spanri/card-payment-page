module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/standard',
  ],

  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: {
          max: 2,
          allowFirstLine: false,
        },
      },
    ],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
    ],
    semi: [
      2,
      'always',
    ],
    'no-extra-semi': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': [
      2,
      'always',
    ],
    'space-before-function-paren': [
      2,
      'never',
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
};
