'use strict';

var config  = require('../config')();
var gulp    = require('gulp');
var jscs    = require('gulp-jscs');
var jshint  = require('gulp-jshint');

gulp.task('lint', function () {
  return gulp.src(config.js.lintPaths)
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe(jshint.reporter('fail'));
});
