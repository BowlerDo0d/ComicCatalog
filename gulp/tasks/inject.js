'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var inject  = require('gulp-inject');

gulp.task('inject', function() {
  var target = gulp.src(config.buildPath + '/index.html');
  var sources = gulp.src([config.buildPath + '/css/*.css', config.buildPath + '/js/*.js'], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest(config.buildPath));
});
