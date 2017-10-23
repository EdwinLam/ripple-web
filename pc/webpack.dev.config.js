const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const config = require('./src/config')
const pkg = require('./package.json')
const path = require('path')

module.exports = merge(webpackBaseConfig, {
  devtool: 'inline-source-map',
  output: {
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js'
    }),
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, 'qky2.ico'),
      filename: './index.html',
      template: './src/template/index.ejs',
      chunks: ['vendors', 'main','main.css'],
      inject: false
    }),
    new HtmlWebpackPlugin({
      favicon: path.join(__dirname, 'qky2.ico'),
      filename: './login.html',
      template: './src/template/login.ejs',
      inject: false,
      chunks: ['vendors', 'login','login.css'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: path.join(__dirname, 'libs/layui'),
      to: 'layui/'
    }])
  ],
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    open:true,
    hot: true,
    inline: true,
    compress: true,
    host: pkg.config.devHost,
    port: pkg.config.devPort,
    proxy: {
      '/**/**': {
        target: pkg.config.devApi,
        changeOrigin: true
      }
    }
  }
})
