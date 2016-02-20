'use strict';

var config      = require('../config')();
var gulp        = require('gulp');
var browserSync = require('browser-sync').get('devEnv');
var runSequence = require('run-sequence');

gulp.task('watch', function () {
  gulp.watch(config.js.watchList, function () {
    runSequence('clean:js', 'build:js', 'inject:js');
  });

  gulp.watch(config.styles.main, function () {
    runSequence('clean:css', 'build:css', 'inject:css');
  });

  gulp.watch(config.html.watchList, function () {
    runSequence([ 'source:html', 'templateCache' ], 'clean:js', 'build:js', 'inject', browserSync.reload);
  });
});
