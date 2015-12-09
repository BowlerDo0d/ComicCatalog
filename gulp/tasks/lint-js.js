'use strict';

var config  = require('../config')();
var gulp    = require('gulp');
var jslint  = require('gulp-jslint');

gulp.task('lint', function () {
  return gulp.src(config.js.lintPaths)
    .pipe(jslint({
      node: true,
      indent: 2,
      errorsOnly: true
    }));
});
