'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css');
var livereload = require('gulp-livereload');

gulp.task('loadNormalize', function() {
  gulp.src('./node_modules/normalize.css/normalize.css')
  .pipe(rename('_normalize.scss'))
  .pipe(gulp.dest('./src/assets/scss'));
})

gulp.task('sass', function () {
  gulp.src('./src/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(livereload());
});

gulp.task('sass:build', function() {
  var processors = [
      autoprefixer({browsers: ['last 2 versions']})
  ];
  gulp.src('./src/assets/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(postcss(processors))
  .pipe(minifyCss({compatibility: '*'}))
  .pipe(gulp.dest('./dist/assets/css'));
})

gulp.task('sass:watch', function () {
  livereload.listen();
  gulp.watch('./src/assets/scss/**/*.scss', ['sass']);
});

gulp.task('build', function() {
  runSequence(
    'sass:build');
});

gulp.task('default', ['sass:watch']);

  //TASK IMAGEMAGIC
  //TASK CONCATINATE
  //TASK OPTIMIZE SVG