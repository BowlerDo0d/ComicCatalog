'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').get('devEnv');

gulp.task('watch', [ 'clean', 'build-js', 'build-css', 'inject', 'connect' ], function() {
  gulp.watch('./app/**/*.js', [ 'inject-js' ]);
  gulp.watch('./sass/main.scss', [ 'inject-css' ]);
  gulp.watch('./public/*.html').on('change', browserSync.reload);
});
