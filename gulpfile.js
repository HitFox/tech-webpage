'use strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');

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
    .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('sass:build', function() {
  gulp.src('./src/assets/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('./src/.tmp/assets/css'))
})

gulp.task('sass:prefix', function() {
  var processors = [
      autoprefixer({browsers: ['last 2 versions']})
  ];
  return gulp.src('./src/.tmp/assets/css/*.css')
  .pipe(postcss(processors))
  .pipe(gulp.dest('./dist/assets/css'))
})

gulp.task('sass:watch', function () {
  gulp.watch('./src/assets/scss/**/*.scss', ['sass']);
});



  //TASK SASS
  //TASK WATCH
  //TASK AUTOPREFIXING
  //TASK IMAGEMAGIC
  //TASK COPY
  //TASK MINIFY
  //TASK CONCATINATE
  //TASK OPTIMIZE SVG