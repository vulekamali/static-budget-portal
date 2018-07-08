const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const normalize = require('postcss-normalize');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: './scripts.js',
  output: {
    path: resolve(__dirname, 'assets'),
    filename: 'scripts.[chunkhash].js',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: { compact: false },
      },

      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },

              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: () => [
                    autoprefixer(),
                    normalize(),
                  ],
                },
              },

              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          }
        ),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin('assets/*'),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new ManifestPlugin({
      fileName: 'preact-asset-manifest.json',
    }),
  ],
};
