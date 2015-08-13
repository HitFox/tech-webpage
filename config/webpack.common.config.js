'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  output: {
    path: path.resolve('./public/javascripts'),
    publicPath: '/javascripts',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx?|tag)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      }
    ]
  }
};

