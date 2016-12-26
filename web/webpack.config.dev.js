const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname)
  },
  entry: [
    path.join(__dirname, '../index.web.js')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { 
          cacheDirectory: true,
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: '[name].[hash:16].[ext]' }
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'js/app': path.join(__dirname, '../appWeb/js/app.web.js'),
      '../tools/xFetch': path.join(__dirname, '../appWeb/js/tools/xFetch.web.js')
    }
  }
};
