const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/js/index.js',
    output: {
      filename: 'site.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules:[
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.(png|jpg|jpeg|bmp)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192
                }
              }
            ]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use:
          {
            loader: 'babel-loader',
            options:
            {
              presets: ['latest', 'react', 'stage-2']
            }
          }
        }
    ]},
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new HtmlWebpackPlugin({template: './src/index.html'})
    ]
  };