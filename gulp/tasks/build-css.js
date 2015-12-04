'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');

var CacheBuster = require('gulp-cachebust');
var cachebust   = new CacheBuster();

gulp.task('build:css', function() {
  return gulp.src(config.sass)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        config.sass,
        config.bootstrap + '/assets/stylesheets',
        config.fontAwesome + '/scss'
      ]
    }).on('error', sass.logError))
    .pipe(cachebust.resources())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.buildPath + '/css'));
});
