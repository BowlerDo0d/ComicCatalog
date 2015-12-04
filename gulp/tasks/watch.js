'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').get('devEnv');
var runSequence = require('run-sequence');

gulp.task('watch', function() {
  runSequence( 'clean', 'lint-js', 'icons', [ 'build-js', 'build-css' ], 'inject', 'connect' );

  gulp.watch('./app/**/*.js', function() {
    runSequence( 'clean-js', 'lint-js', 'build-js', 'inject-js' );
  });
  gulp.watch('./sass/main.scss', function() {
    runSequence( 'clean-css', 'build-css', 'inject-css' );
  });
  gulp.watch('./public/*.html').on('change', browserSync.reload);
});
