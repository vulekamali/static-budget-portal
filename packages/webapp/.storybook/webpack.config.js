module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(jsx?)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: false, corejs: 2, compact : false }]],
    },
  });
  config.resolve.extensions.push('.js', '.jsx');
  return config;
};