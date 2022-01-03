module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    semi: [2, 'never'],
    'import/prefer-default-export': 'off',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'react/jsx-props-no-spreading': ['off'],
    'react/forbid-prop-types': [0],
    'react/jsx-one-expression-per-line': 0,
    'comma-dangle': 0,
    'react-hooks/exhaustive-deps': 0, // reactivate asap
    'react/jsx-no-target-blank': 0,
    'no-console': 2,
  },
}
