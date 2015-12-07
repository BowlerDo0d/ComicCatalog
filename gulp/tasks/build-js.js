'use strict';

var config      = require('../config')();
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var browserify  = require('browserify');
var ngAnnotate  = require('browserify-ngannotate');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var args        = require('yargs').argv;

var CacheBuster = require('gulp-cachebust');
var cachebust   = new CacheBuster();

gulp.task('build:js', function () {
  return browserify({
    entries: config.js.appEntryPoint,
    debug: true,
    transform: [ngAnnotate]
  }).bundle()
    .pipe(source(config.js.compiledFile))
    .pipe(buffer())
    .pipe(cachebust.resources())
    .pipe(gulpif(!args.production, sourcemaps.init({ loadMaps: true })))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulpif(!args.production, sourcemaps.write('./maps')))
    .pipe(gulp.dest(config.build.js.path));
});
