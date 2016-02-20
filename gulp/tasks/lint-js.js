'use strict';

var config    = require('../config')();
var gulp      = require('gulp');
var gulpif    = require('gulp-if');
var gulpprint = require('gulp-print');
var jscs      = require('gulp-jscs');
var jshint    = require('gulp-jshint');
var args      = require('yargs').argv;

gulp.task('lint', function () {
  return gulp.src(config.js.lintPaths)
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe(jshint.reporter('fail'));
});
