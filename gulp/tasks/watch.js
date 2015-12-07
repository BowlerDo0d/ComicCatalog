'use strict';

var config      = require('../config')();
var gulp        = require('gulp');
var browserSync = require('browser-sync').get('devEnv');
var runSequence = require('run-sequence');

gulp.task('watch', function (done) {
  runSequence('clean', 'lint:js', 'icons', [ 'build:js', 'build:css' ], 'source:html', 'source:templates', 'inject', 'connect', done);

  gulp.watch(config.js.watchList, function () {
    runSequence('clean:js', 'lint:js', 'build:js', 'inject:js');
  });
  gulp.watch(config.styles.main, function () {
    runSequence('clean:css', 'build:css', 'inject:css');
  });

  // TODO: Add support for *.html file watcher
});
