'use strict';

var gulp  = require('gulp');
var del   = require('del');

gulp.task('clean-css', function(cb) {
  del([ './public/css/' ]).then(cb());
});
