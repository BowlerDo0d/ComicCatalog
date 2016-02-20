'use strict';

var config        = require('../config.js')();
var gulp          = require('gulp');
var minifyHtml    = require('gulp-minify-html');
var templateCache = require('gulp-angular-templatecache');

gulp.task('templateCache', function () {
  return gulp.src(config.html.templates)
    .pipe(minifyHtml({empty: true}))
    .pipe(templateCache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.templateCache.destination));
});
