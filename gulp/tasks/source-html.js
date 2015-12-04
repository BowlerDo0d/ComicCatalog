'use strict';

var config  = require('../config');
var gulp    = require('gulp');

gulp.task('source:html', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest(config.buildPath));
});
