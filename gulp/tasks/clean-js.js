'use strict';

var gulp  = require('gulp');
var del   = require('del');

gulp.task('clean-js', function(cb) {
  del([ './public/js/' ]).then(cb());
});
