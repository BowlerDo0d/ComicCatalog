'use strict';

var config  = require('../config');
var gulp    = require('gulp');

gulp.task('source:templates', function() {
  return gulp.src(config.templates)
    .pipe(gulp.dest(config.buildPath));
});
