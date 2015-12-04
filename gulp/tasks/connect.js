'use strict';

var gulp = require('gulp');

// BrowserSync needs to have one and only one instance running.
// Create a named environment here and use .get() within
// other files that depend on BrowserSync to get the same instance
var browserSync = require('browser-sync').create('devEnv');

gulp.task('connect', function() {
  browserSync.init({
    server: 'public',
    port: 4000
  });
});
