'use strict';

var config  = require('../config');
var gulp    = require('gulp');

gulp.task('icons', function() {
  return gulp.src(config.fontAwesome + '/fonts/**.*')
    .pipe(gulp.dest('./public/fonts'));
});
