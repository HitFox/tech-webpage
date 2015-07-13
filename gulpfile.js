'use strict'

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    rename        = require('gulp-rename'),
    sourcemaps    = require('gulp-sourcemaps'),
    postcss       = require('gulp-postcss'),
    autoprefixer  = require('autoprefixer-core'),
    runSequence   = require('run-sequence'),
    minifyCss     = require('gulp-minify-css'),
    livereload    = require('gulp-livereload'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify');


gulp.task('loadNormalize', function() {
  gulp.src('./node_modules/normalize.css/normalize.css')
  .pipe(rename('_normalize.scss'))
  .pipe(gulp.dest('./src/assets/scss'));
});

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
});

gulp.task('sass:watch', function () {
  livereload.listen();
  gulp.watch('./src/assets/scss/**/*.scss', ['sass']);
});

gulp.task('build', function() {
  runSequence(
    'sass:build',
    'scripts:build');
});

gulp.task('scripts:build', function() {
  return gulp.src('./src/assets/js/*.js')
  .pipe(concat('bananascript.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('default', ['sass:watch']);

  //TASK IMAGEMAGIC
  //TASK OPTIMIZE SVG
