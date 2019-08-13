module.exports = function (api) {
  api.cache(true);

  return {
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: {
            version: 3,
            proposals: true
          }
        }
      ]
    ],
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          shippedProposals: true,
          corejs: {
            version: 3,
            proposals: true
          },
          targets: {
            edge: '16',
            ie: '11'
          }
        }
      ]
    ]
  };
};
