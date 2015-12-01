'use strict';

var gulp        = require('gulp');
var browserify  = require('browserify');
var ngAnnotate  = require('browserify-ngannotate');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');

var CacheBuster = require('gulp-cachebust');
var cachebust   = new CacheBuster();

gulp.task('build-js', function() {
  return browserify({
    entries: './app/app.js',
    debug: true,
    //paths: ['./js/controllers', './js/services', './js/directives'],
    transform: [ngAnnotate]
  }).bundle()
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(cachebust.resources())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./public/js/'));
});
