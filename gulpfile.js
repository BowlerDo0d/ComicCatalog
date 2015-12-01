'use strict';

var gulp = require('gulp');

// Main build task
gulp.task('build', [ 'clean', 'build-js', 'build-css', 'inject' ]);

require('./gulp');
