'use strict';

var gulp    = require('gulp');
var inject  = require('gulp-inject');

gulp.task('inject', [ 'build-js', 'build-css' ], function() {
  var target = gulp.src('./public/index.html');
  var sources = gulp.src(['./public/css/*.css', './public/js/*.js'], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest('./public'));
});
