const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    main: './src/main',
    vendors: './src/vendors',
    login:'./src/login'
  },
  output: {
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?minimize', 'postcss-loader'],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.sass/,
        use: ExtractTextPlugin.extract({
          use: ['postcss-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=1024'
      },
      {
        test: /\.(html|tpl)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'libs': path.resolve(__dirname, './libs'),
      'api': path.resolve(__dirname, './src/api'),
      'utils': path.resolve(__dirname, './src/utils')
    }
  }
}
