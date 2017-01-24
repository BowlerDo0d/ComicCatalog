import browserify from 'browserify';
import browserSync from 'browser-sync';
import buffer from 'vinyl-buffer';
import CacheBuster from 'gulp-cachebust';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gulpprint from 'gulp-print';
import gutil from 'gulp-util';
import inject from 'gulp-inject';
import minifyHtml from 'gulp-minify-html';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import taskListing from 'gulp-task-listing';
import templateCache from 'gulp-angular-templatecache';
import uglify from 'gulp-uglify';
import { argv } from 'yargs';
import config from './gulp-config';

const cachebust = new CacheBuster();

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
    .pipe(gulpif(argv.verbose, gulpprint()))
    .pipe(gulpif(!argv.production, sourcemaps.init()))
    .pipe(sass({
      includePaths: [
        config.styles.sass,
        config.bootstrap.styles,
        config.fontAwesome.styles
      ]
    }).on('error', sass.logError))
    .pipe(cachebust.resources())
    .pipe(gulpif(!argv.production, sourcemaps.write('./maps')))
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
    .pipe(gulpif(!argv.production, sourcemaps.init({ loadMaps: true })))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulpif(!argv.production, sourcemaps.write('./maps')))
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
    .pipe(gulpif(argv.verbose, gulpprint()))
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
    .pipe(gulpif(argv.verbose, gulpprint()))
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
    .pipe(gulpif(argv.verbose, gulpprint()))
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
