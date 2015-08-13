'use strict';

var path    = require('path');
var webpack = require('webpack');
var _       = require('lodash');
var common  = require('./webpack.common.config');

var prod = _.cloneDeep(common);

prod.plugins = prod.plugins || [];
prod.plugins.push(new webpack.optimize.UglifyJsPlugin({
  sourceMap: false,
  compress: {
    warnings: false
  }
}));

module.exports = prod;
