const env = process.env.BABEL_ENV

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        modules: env === 'es' ? false : 'auto',
      },
    ],
    '@babel/preset-react',
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
  plugins: [
    'transform-class-properties',
    ['import', { libraryName: 'antd', style: true }, 'antd'],
    ['import', { libraryName: 'at-console-components', style: true }, 'at-console-components'],
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
}
