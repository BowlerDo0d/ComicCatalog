'use strict';

var gulp    = require('gulp');
var jslint  = require('gulp-jslint');

gulp.task('lint:js', function() {
  return gulp.src('./src/app/**/*.js')
    .pipe(jslint({
      node: true,
      indent: 2,
      errorsOnly: true
    }));
});
