'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');

var CacheBuster = require('gulp-cachebust');
var cachebust   = new CacheBuster();

gulp.task('build-css', [ 'lint-js' ], function() {
  return gulp.src(config.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cachebust.resources())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'));
});
