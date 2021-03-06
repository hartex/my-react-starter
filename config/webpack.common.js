const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = function (options) {

  const ENV = options.ENV ? options.ENV : 'production';

  return {

    entry: {
      app: './src/main.jsx',
    },

    output: {
      path: helpers.root('dist'),
      publicPath: '/',
      filename: '[name].[hash].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[name].[chunkhash].chunk.js'
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

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            enforce: true
          },
        }
      }
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },

        /**
         * File loader for supporting images and svg, for example.
         */
        {
          test: /\.(png|svg|gif|ico)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'img/',
              name: '[name].[ext]',
            }
          }
        },

        /**
         * File loader for supporting fonts
         */
        {
          test: /\.(woff(2)?|eot|ttf)$/,
          use: {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              name: '[name].[ext]'
            }
          }
        }
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new ScriptExtHtmlPlugin({
        defaultAttribute: 'defer'
      }),
      new DefinePlugin({
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV)
        }
      })
    ]
  };
};
