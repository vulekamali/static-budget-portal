const base = require('./webpack.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  ...base,
  output: {
    ...base.output,
    filename: 'scripts.[chunkhash].js',
  },

  plugins: [
    ...base.plugins,
    new ExtractTextPlugin('styles.[contenthash].css'),
  ],
};
