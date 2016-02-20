'use strict';

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var taskListing = require('gulp-task-listing');

gulp.task('run', function () {
  gutil.log(
    gutil.colors.yellow('This task is just an abstract parent task. Please use one of the'),
    gutil.colors.gray('Sub Tasks'),
    gutil.colors.yellow('listed below:')
  );

  taskListing.withFilters(null, function (task) {
    return task.indexOf('run');
  })();
});
