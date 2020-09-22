const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../server/public')
  },
  devServer: {
      port: 8080,
      hot: true
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
              }
          },
          {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
          },
          {
              test: /\.(png|jp(e*)g)$/,
              use: 'file-loader'
          }
      ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: 'index.html'
      })
  ]
};