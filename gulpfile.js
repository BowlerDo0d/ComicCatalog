'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

// Main build task
gulp.task('build', function() {
  runSequence('clean', 'lint:js', 'icons', ['build:js', 'build:css'], 'source:html', 'source:templates', 'inject' );
});

require('./gulp');
