'use strict';

var config  = require('../config')();
var gulp    = require('gulp');
var del     = require('del');

gulp.task('clean', function (cb) {
  del([
    config.build.root,
    config.templateCache.destination + config.templateCache.file
  ]).then(cb());
});
