'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var inject      = require('gulp-inject');
var browserSync = require('browser-sync').get('devEnv');

gulp.task('inject:js', function() {
  var target = gulp.src(config.buildPath + '/index.html');
  var sources = gulp.src([config.buildPath + '/js/*.js'], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest(config.buildPath))
    .pipe(browserSync.stream());
});
