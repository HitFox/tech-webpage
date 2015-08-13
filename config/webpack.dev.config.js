'use strict';

var path    = require('path');
var webpack = require('webpack');
var _       = require('lodash');
var common  = require('./webpack.common.config');

var dev = _.cloneDeep(common);

dev.watch = true;
dev.devtool = 'source-map';

dev.devServer = {
  contentBase: './public',
  publicPath: '/javascripts',
  colors: true
};

module.exports = dev;
