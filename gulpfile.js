var _            = require('lodash');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var gutil        = require('gulp-util');
var livereload   = require('gulp-livereload');
var rev          = require('gulp-rev');
var stream       = require('webpack-stream');
var rename       = require('gulp-rename');
//var debug      = require('gulp-debug');
var sequence     = require('run-sequence');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker     = require('css-mqpacker');
var csswring     = require('csswring');
var gif          = require('gulp-if');
var jade         = require('gulp-jade');
var fs           = require('fs');
var named        = require('vinyl-named');
var revReplace   = require('gulp-rev-replace');
var sourcemaps   = require('gulp-sourcemaps');

var path             = require('path');
var webpack          = require('webpack');
var postProcessors   = [autoprefixer({browsers: ['last 3 version']}), mqpacker, csswring];

var BASE             = 'src/';
var ASSET_FILES      = 'src/assets/**/*';
var STYLESHEET_FILES = 'src/stylesheets/**/*.scss';
var VIEW_FILES       = 'src/views/**/*';
var JAVASCRIPT_FILES = 'src/javascripts/*.js';
var OUTPUT_FOLDER    = 'public/';

function replace() {
  var manifest = gulp.src(OUTPUT_FOLDER + 'rev-manifest.json');
  return revReplace({manifest: manifest});
}

gulp.task('assets:development', function(){
  return gulp.src(ASSET_FILES, {base: BASE})
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(livereload());
});

gulp.task('assets:production', function(){
  return gulp.src(ASSET_FILES, {base: BASE})
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev.manifest(OUTPUT_FOLDER + 'rev-manifest.json', {
      merge: true,
      base: OUTPUT_FOLDER
    }))
    .pipe(gulp.dest(OUTPUT_FOLDER));
});

gulp.task('css:development', function () {
  return gulp.src(STYLESHEET_FILES, {base: BASE})
    .pipe(sourcemaps.init())
    .pipe(sass()
       .on('error', sass.logError))
    .pipe(postcss(postProcessors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(livereload());
});

gulp.task('css:production', function () {
  return gulp.src(STYLESHEET_FILES, {base: BASE})
    .pipe(sass()
       .on('error', sass.logError))
    .pipe(postcss(postProcessors))
    .pipe(replace())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev.manifest(OUTPUT_FOLDER + 'rev-manifest.json', {
      merge: true,
      base: OUTPUT_FOLDER
    }))
    .pipe(gulp.dest(OUTPUT_FOLDER));
});

gulp.task('javascript:development', function(){
  var config = require('./config/webpack.dev.config');
  return gulp.src([JAVASCRIPT_FILES, '!**/_*'], {base: 'src'})
    .pipe(named())
    .pipe(stream(config, webpack))
    .pipe(rename({dirname: 'javascripts'}))
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(livereload());
});

gulp.task('javascript:production', function(){
  var config = require('./config/webpack.production.config');
  return gulp.src([JAVASCRIPT_FILES, '!**/_*'], {base: 'src'})
    .pipe(named())
    .pipe(stream(config, webpack))
    .pipe(rename({dirname: 'javascripts'}))
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev())
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(rev.manifest(OUTPUT_FOLDER + 'rev-manifest.json', {
      merge: true,
      base: OUTPUT_FOLDER
    }))
    .pipe(gulp.dest(OUTPUT_FOLDER));
});

gulp.task('html:development', function(){
  var jadeOptions = {
    locals: {
      develop: true,
      LRScript: "<script>document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':" + //eslint-disable-line quotes
        (/*config.port ||*/ 35729) +
        "/livereload.js\"></' + 'script>')</script>" //eslint-disable-line quotes
    }
  };

  return gulp.src([VIEW_FILES, '!**/_*'])
    .pipe(gif('*.jade', jade(jadeOptions)))
    .pipe(gulp.dest(OUTPUT_FOLDER))
    .pipe(livereload());
});

gulp.task('html:production', function(){
  var jadeOptions = {
    locals: { develop: false }
  };

  return gulp.src([VIEW_FILES, '!**/_*'])
    .pipe(gif('*.jade', jade(jadeOptions)))
    .pipe(replace())
    .pipe(gulp.dest(OUTPUT_FOLDER));
});

gulp.task('default', function(cb){
  sequence(
    'assets:development',
    'css:development',
    'html:development',
    'javascript:development'
  );
  livereload.listen();
  gulp.watch(STYLESHEET_FILES, ['css:development']);
  gulp.watch(VIEW_FILES, ['html:development']);
});

gulp.task('build', function(cb){
  sequence(
    'assets:production',
    'css:production',
    'javascript:production',
    'html:production',
    cb
  );
});
