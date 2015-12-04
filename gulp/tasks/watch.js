'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var browserSync = require('browser-sync').get('devEnv');
var runSequence = require('run-sequence');

gulp.task('watch', function() {
  runSequence( 'clean', 'lint:js', 'icons', [ 'build:js', 'build:css' ], 'source:html', 'source:templates', 'inject', 'connect' );

  gulp.watch('./src/app/**/*.js', function() {
    runSequence( 'clean:js', 'lint:js', 'build:js', 'inject:js' );
  });
  gulp.watch('./src/sass/main.scss', function() {
    runSequence( 'clean:css', 'build:css', 'inject:css' );
  });
  gulp.watch(config.buildPath + '/*.html').on('change', browserSync.reload);
});
