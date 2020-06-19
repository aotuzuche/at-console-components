module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['markdown', '@typescript-eslint', 'react-hooks', 'prettier'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  overrides: [
    {
      files: ['**/*.md'],
      globals: {
        React: true,
        ReactDOM: true,
      },
      rules: {
        'no-undef': 0,
        'no-unused-vars': 0,
        'no-console': 0,
        'padded-blocks': 0,
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx', '.md'],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'import/extensions': 0,
    'consistent-return': 0,
    'import/no-unresolved': [2, { ignore: ['at-console-components'] }],
    'no-unused-expressions': [2, { allowShortCircuit: true }],
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-explicit-any': [2, { ignoreRestArgs: true }],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': 2,
    'no-console': 2,
    'prettier/prettier': 'error',
  },
}
