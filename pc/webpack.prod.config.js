const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var config = require('./src/config')

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: __dirname,
        verbose: true,
        dry: false
      }
    ),
    new webpack.DefinePlugin({
      'process.env': config.prod.env
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.[hash].js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/template/index.ejs',
      inject: false
    })
  ]
})
