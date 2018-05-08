const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NoEmitOnErrorsPlugin = require('webpack/lib/NoEmitOnErrorsPlugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';

module.exports = webpackMerge(commonConfig({ENV: ENV}), {
  devtool: 'source-map',
  target: 'web',
  mode: 'production',

  module: {
    rules: [
      /**
       * Extract and compile SCSS files from .src/styles directory to external CSS file
       */
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: helpers.root('config', 'postcss.config.js')
              },
              sourceMap: true
            }
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [helpers.root('src', 'styles')],
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true,
          keep_fnames: true
        }
      })
    ]
  },

  plugins: [
    /**
     * Stops the build if there is an error
     * */
    new NoEmitOnErrorsPlugin(),

    /**
     * Extracts imported CSS files into external stylesheet file
     */
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),

    new HashedModuleIdsPlugin(),

    /**
     * Webpack plugin and CLI utility that represents
     * bundle content as convenient interactive zoomable treemap
     */
    /*new BundleAnalyzerPlugin({
      defaultSizes: 'stat',
      // Automatically open report in default browser
      openAnalyzer: true,
      logLevel: 'info'
    })*/
  ]
});
