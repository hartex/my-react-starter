const helpers = require('./helpers');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = function (options) {

  const ENV = options.ENV ? options.ENV : 'production';

  return {

    entry: {
      /*polyfills: './src/polyfills.js',
      vendor: './src/vendor.js',*/
      app: './src/main.jsx',
    },

    resolve: {
      alias: {
        '~': helpers.root('src'),
      },

      /**
       * An array of extensions that should be used to resolve modules.
       */
      extensions: ['.ts', '.js', '.jsx', '.css', '.scss', '.html'],

      /**
       * An array of directory names to be resolved to the current directory
       */
      modules: [helpers.root('src'), helpers.root('node_modules')]
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },

        /**
         * File loader for supporting images, for example, in CSS files.
         */
        /*{
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },*/

        /**
         * File loader for supporting fonts, for example, in CSS files.
         */
        /*{
          test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        },*/

        /**
         * File loader for supporting fonts
         */
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'
        }
      ],
    },

    plugins: [
      new CleanWebpackPlugin(['dist']),

      /**
       * Copies project static assets.
       */
      new CopyWebpackPlugin([{from: 'img', to: 'img'}]),

      /**
       * Simplifies creation of HTML files to serve your webpack bundles.
       * This is especially useful for webpack bundles that include a hash in the filename
       * which changes every compilation.
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),

      /**
       * Plugin: DefinePlugin
       * Description: Define free variables.
       * Useful for having development builds with debug logging or adding global constants.
       *
       * Environment helpers
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
       */
      // NOTE: when adding more properties, make sure you include them in custom-typings.d.ts
      new DefinePlugin({
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV)
        }
      })
    ]

  };
};
