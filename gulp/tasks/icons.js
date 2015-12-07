'use strict';

var config    = require('../config')();
var gulp      = require('gulp');
var gulpprint = require('gulp-print');
var gulpif    = require('gulp-if');
var args      = require('yargs').argv;

gulp.task('icons', function () {
  return gulp.src(config.fontAwesome.fonts)
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(gulp.dest(config.build.fonts.path));
});
