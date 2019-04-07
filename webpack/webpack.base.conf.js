const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: Path.join(__dirname, '../dist'),
    filename: 'assets/js/[name].js'
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
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: Path.resolve(__dirname, '..') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../src/assets/images/og'), to: 'assets/images/og', ignore: ['**/.DS_Store'] },
      { from: Path.resolve(__dirname, '../src/assets/images/touch-icons'), to: 'assets/images/touch-icons', ignore: ['**/.DS_Store'] },
      { from: Path.resolve(__dirname, '../src/assets/images/favicon.ico'), to: 'assets/images/favicon.ico' },
      { from: Path.resolve(__dirname, '../src/manifest.json'), to: 'manifest.json' }
    ]),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
      '@style': Path.resolve(__dirname, '../src/assets/scss'),
      '@images': Path.resolve(__dirname, '../src/assets/images'),
      '@js': Path.resolve(__dirname, '../src/assets/js')
    }
  },
  module: {
    rules: [
      {
        test: /\.(html|htm)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          Path.resolve(__dirname, '../src/assets/fonts')
        ],
        options: {
          limit: -1,
          name: 'assets/images/[ext]/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: -1,
          name: 'assets/media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [
          Path.resolve(__dirname, '../src/assets/images')
        ],
        options: {
          limit: -1,
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
};