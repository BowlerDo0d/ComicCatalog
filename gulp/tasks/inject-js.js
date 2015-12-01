'use strict';

var gulp        = require('gulp');
var inject      = require('gulp-inject');
var browserSync = require('browser-sync').get('devEnv');

gulp.task('inject-js', [ 'clean-js', 'lint-js', 'build-js' ], function() {
  var target = gulp.src('./public/index.html');
  var sources = gulp.src(['./public/js/*.js'], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});
