import config from './gulp-config';

const args = require('yargs').argv,
  babelify = require('babelify'),
  browserify = require('browserify'),
  browserSync = require('browser-sync'),
  buffer = require('vinyl-buffer'),
  CacheBuster = require('gulp-cachebust'),
  cachebust = new CacheBuster(),
  del = require('del'),
  eslint = require('gulp-eslint'),
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  gulpprint = require('gulp-print'),
  gutil = require('gulp-util'),
  inject = require('gulp-inject'),
  minifyHtml = require('gulp-minify-html'),
  ngAnnotate = require('browserify-ngannotate'),
  runSequence = require('run-sequence'),
  sass = require('gulp-sass'),
  source = require('vinyl-source-stream'),
  sourcemaps = require('gulp-sourcemaps'),
  taskListing = require('gulp-task-listing'),
  templateCache = require('gulp-angular-templatecache'),
  uglify = require('gulp-uglify');

/* Build tasks */
gulp.task('build', (done) => {
  runSequence(
    'clean',
    'lint',
    'fonts',
    'templateCache',
    ['build:js', 'build:css'],
    'source:html',
    'inject',
    done
  );
});

gulp.task('build:css', () => (
  gulp.src(config.styles.sass)
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(gulpif(!args.production, sourcemaps.init()))
    .pipe(sass({
      includePaths: [
        config.styles.sass,
        config.bootstrap.styles,
        config.fontAwesome.styles
      ]
    }).on('error', sass.logError))
    .pipe(cachebust.resources())
    .pipe(gulpif(!args.production, sourcemaps.write('./maps')))
    .pipe(gulp.dest(config.build.css.path))
));

gulp.task('build:js', () => (
  browserify({
    entries: config.js.appEntryPoint,
    debug: true
  }).bundle()
    .pipe(source(config.js.compiledFile))
    .pipe(buffer())
    .pipe(cachebust.resources())
    .pipe(gulpif(!args.production, sourcemaps.init({ loadMaps: true })))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulpif(!args.production, sourcemaps.write('./maps')))
    .pipe(gulp.dest(config.build.js.path))
));

/* Clean tasks */
gulp.task('clean:css', (done) => {
  del([config.build.css.path]).then(done());
});

gulp.task('clean:js', (done) => {
  del([config.build.js.path]).then(done());
});

gulp.task('clean', (done) => {
  del([
    config.build.root,
    config.templateCache.destination + config.templateCache.file
  ]).then(done());
});

/* Local server connect */
gulp.task('connect', () => (
  browserSync.init({
    server: config.build.root,
    port: 4000
  })
));

/* Default task */
gulp.task('default', ['help']);

/* Font task */
gulp.task('fonts', () => (
  gulp.src(config.fonts)
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(gulp.dest(config.build.fonts.path))
));

/* Help task */
gulp.task('help', taskListing);

/* Injection tasks */
gulp.task('inject', () => {
  const target = gulp.src(config.build.baseFile),
    sources = gulp.src([config.build.css.files, config.build.js.files], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest(config.build.root));
});

gulp.task('inject:css', () => {
  const target = gulp.src(config.build.baseFile),
    sources = gulp.src([config.build.css.files], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest(config.build.root))
    .pipe(browserSync.stream());
});

gulp.task('inject:js', () => {
  const target = gulp.src(config.build.baseFile),
    sources = gulp.src([config.build.js.files], { read: false });

  return target.pipe(inject(sources, { relative: true, addRootSlash: true }))
    .pipe(gulp.dest(config.build.root))
    .pipe(browserSync.stream());
});

/* Linting task */
gulp.task('lint', () => (
  gulp.src(config.js.lintPaths)
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(eslint())
    .pipe(eslint.format())
));

/* Serve tasks */
gulp.task('serve', () => {
  gutil.log(
    gutil.colors.yellow('This task is just an abstract parent task. Please use one of the'),
    gutil.colors.gray('\'Sub Tasks\''),
    gutil.colors.yellow('listed below:')
  );

  // eslint-disable-next-line arrow-body-style
  taskListing.withFilters(null, (task) => {
    return task.indexOf('serve');
  })();
});

gulp.task('serve:dev', (done) => {
  gutil.log(
    gutil.colors.yellow('Starting local server in'),
    gutil.colors.cyan('Development'),
    gutil.colors.yellow('mode')
  );

  runSequence('clean', 'fonts', 'templateCache', ['build:js', 'build:css'], 'source:html', 'inject', 'connect', 'watch', done);
});

/* Source html copy task */
gulp.task('source:html', () => (
  gulp.src(config.html.baseFile)
    .pipe(gulpif(args.verbose, gulpprint()))
    .pipe(gulp.dest(config.build.root))
));

/* Template cache task */
gulp.task('templateCache', () => (
  gulp.src(config.html.templates)
    .pipe(minifyHtml({ empty: true }))
    .pipe(templateCache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.templateCache.destination))
));

/* Watcher task */
gulp.task('watch', () => {
  gulp.watch(config.js.watchList, () => (
    runSequence('clean:js', 'build:js', 'inject:js')
  ));

  gulp.watch(config.styles.main, () => (
    runSequence('clean:css', 'build:css', 'inject:css')
  ));

  gulp.watch(config.html.watchList, () => (
    runSequence(['source:html', 'templateCache'], 'clean:js', 'build:js', 'inject', browserSync.reload)
  ));
});
