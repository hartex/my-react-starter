const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig({ENV: ENV}), {

  devtool: 'cheap-module-eval-source-map',

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [helpers.root('src', 'styles')],
              sourceMap: true
            }
          }
        ],
      }
    ]
  },

  devServer: {
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: './dist',
    proxy: {
      // following URL can be used for development:
      // '/some-url/': 'https://google.com'
    },
    watchOptions: {
      ignored: /node_modules/
    }
  }
});
