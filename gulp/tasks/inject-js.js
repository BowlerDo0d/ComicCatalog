'use strict';

var config      = require('../config')();
var gulp        = require('gulp');
var inject      = require('gulp-inject');
var browserSync = require('browser-sync').get('devEnv');

gulp.task('inject:js', function () {
  var target = gulp.src(config.build.baseFile),
    sources = gulp.src([config.build.js.files], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest(config.build.root))
    .pipe(browserSync.stream());
});
