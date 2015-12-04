'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var del     = require('del');

gulp.task('clean:js', function(cb) {
  del([ config.buildPath + '/js/' ]).then(cb());
});
