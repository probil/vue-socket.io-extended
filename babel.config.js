module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: [
            'supports proxy',
            'not dead',
          ],
        },
      },
    ],
  ],
  comments: false,
  env: {
    test: {
      presets: [
        '@babel/preset-env',
      ],
    },
  },
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};
