'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var runSequence = require('run-sequence');

gulp.task('run:dev', function (done) {
  gutil.log(
    gutil.colors.yellow('Starting local server in'),
    gutil.colors.cyan('Development'),
    gutil.colors.yellow('mode')
  );

  runSequence('clean', 'icons', 'templateCache', [ 'build:js', 'build:css' ], 'source:html', 'inject', 'connect', 'watch', done);
});
