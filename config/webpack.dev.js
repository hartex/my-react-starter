const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig({ENV: ENV}), {

  devtool: 'cheap-module-eval-source-map',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [helpers.root('src', 'styles')]
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
      // '/profiler/': 'http://dep-id-ci.netcracker.com:3030'
    },
    watchOptions: {
      // if you're using Docker you may need this
      // aggregateTimeout: 300,
      // poll: 1000,
      ignored: /node_modules/
    }
  }
});
