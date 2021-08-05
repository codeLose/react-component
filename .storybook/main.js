module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../components/**/stories/*.stories.js'],
  // addons: [
  //   '@storybook/addon-actions',
  //   '@storybook/addon-controls',
  //   '@storybook/addon-docs',
  // ],
  // webpackFinal: (config) => {
  //   return {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       fallback: {
  //         ...config.fallback,
  //         // assert: require.resolve('assert-browserify/'),
  //       },
  //     },
  //   };
  // },
};