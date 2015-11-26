'use strict';

var gulp        = require('gulp');
var inject      = require('gulp-inject');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var ngAnnotate  = require('browserify-ngannotate');
var del         = require('del');

var CacheBuster = require('gulp-cachebust');
var cachebust   = new CacheBuster();

// Main task
gulp.task('build', ['clean', 'build-js', 'build-css', 'inject', 'connect', 'watch']);

// Connect task
gulp.task('connect', ['inject'], function() {
  browserSync.init({
    server: 'public',
    port: 4000
  });

  gulp.watch('./public/*.html').on('change', browserSync.reload);
});

// Clean task
gulp.task('clean', function() {
  return del([
    './public/js/',
    './public/css/'
  ]);
});

// JS task
gulp.task('build-js', [ 'clean' ], function() {
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

// CSS task
gulp.task('build-css', [ 'clean' ], function() {
  return gulp.src('./sass/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'));
});

// Injection task
gulp.task('inject', [ 'build-js', 'build-css' ], function() {
  var target = gulp.src('./public/index.html');
  var sources = gulp.src(['./public/css/*.css', './public/js/*.js'], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

///////////////////////////////////
// Development tasks
///////////////////////////////////

// Clean and rebuild JS
gulp.task('inject-js', [ 'clean-js', 'rebuild-js' ], function() {
  var target = gulp.src('./public/index.html');
  var sources = gulp.src(['./public/js/*.js'], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

gulp.task('rebuild-js', [ 'clean-js' ], function() {
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

gulp.task('clean-js', function() {
  return del([ './public/js/' ]);
});

// Clean and rebuild CSS
gulp.task('inject-css', [ 'clean-css', 'rebuild-css' ], function() {
  var target = gulp.src('./public/index.html');
  var sources = gulp.src(['./public/css/*.css'], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

gulp.task('rebuild-css', [ 'clean-css' ], function() {
  return gulp.src('./sass/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('clean-css', function() {
  return del([ './public/css/' ]);
});

// Watcher for JS and SASS files
gulp.task('watch', function() {
  gulp.watch('app/**/*.js', [ 'inject-js' ]);
  gulp.watch('sass/main.scss', [ 'inject-css' ]);
});
