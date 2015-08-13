'use strict';

var path    = require('path');
var webpack = require('webpack');
var _       = require('lodash');
var dev  = require('./webpack.dev.config');

var hot = _.cloneDeep(dev);

hot.entry = hot.entry || [];
hot.entry.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
);
hot.output.publicPath = '//localhost:8080/javascripts';

hot.plugins = hot.plugins || [];
hot.plugins.push(new webpack.HotModuleReplacementPlugin());

hot.devServer.hot = true;

module.exports = hot;
