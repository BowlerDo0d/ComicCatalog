'use strict';

var config  = require('../config')();
var gulp    = require('gulp');
var del     = require('del');

gulp.task('clean:css', function (cb) {
  del([ config.build.css.path ]).then(cb());
});
