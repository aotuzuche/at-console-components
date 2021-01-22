module.exports = {
  extends: ['atzuche/react', 'atzuche/typescript'],
  plugins: ['markdown'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'no-undefined': 0,
    '@typescript-eslint/indent': 0,
  },
}
