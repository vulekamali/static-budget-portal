const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const normalize = require('postcss-normalize');


module.exports = {
  entry: './assets-src/index.jsx',
  output: {
    path: resolve(__dirname, 'assets'),
    filename: 'scripts.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: [
      '.jsx',
      '.js',
    ],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
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
          },
        ),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
  ],
};
