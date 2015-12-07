'use strict';

var config      = require('../config')();
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var gulpprint   = require('gulp-print');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var args        = require('yargs').argv;

var CacheBuster = require('gulp-cachebust');
var cachebust   = new CacheBuster();

gulp.task('build:css', function () {
  return gulp.src(config.styles.sass)
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(gulpif(!args.production, sourcemaps.init()))
    .pipe(sass({
      includePaths: [
        config.styles.sass,
        config.bootstrap.styles,
        config.fontAwesome.styles
      ]
    }).on('error', sass.logError))
    .pipe(cachebust.resources())
    .pipe(gulpif(!args.production, sourcemaps.write('./maps')))
    .pipe(gulp.dest(config.build.css.path));
});
