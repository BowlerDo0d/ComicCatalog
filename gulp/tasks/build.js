'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function (done) {
  runSequence(
    'clean',
    'lint',
    'icons',
    ['build:js', 'build:css'],
    'source:html',
    'source:templates',
    'inject',
    done
  );
});
