'use strict';

module.exports = function () {
  var appSource = './src/',
    buildPath = './build/',
    indexFile = 'index.html',
    bootstrapPath = './node_modules/bootstrap-sass/',
    fontAwesomePath = './node_modules/font-awesome/',

    config = {
      bootstrap: {
        root: bootstrapPath,
        styles: bootstrapPath + 'assets/stylesheets/'
      },
      fontAwesome: {
        root: fontAwesomePath,
        fonts: fontAwesomePath + 'fonts/**.*',
        styles: fontAwesomePath + 'scss/'
      },
      styles: {
        sass: appSource + 'sass/**/*.scss',
        main: appSource + 'sass/main.scss'
      },
      js: {
        appEntryPoint: appSource + 'app/app.js',
        compiledFile: 'main.js',
        watchList: appSource + 'app/**/*.js',
        lintPaths: [
          appSource + 'app/**/*.js',
          './gulp/**/*.js',
          './*.js'
        ]
      },
      templates: appSource + '**/*.tmpl.html',
      baseFile: appSource + indexFile,
      build: {
        root: buildPath,
        baseFile: buildPath + indexFile,
        js: {
          path: buildPath + 'js/',
          files: buildPath + 'js/**/*.js'
        },
        css: {
          path: buildPath + 'css/',
          files: buildPath + 'css/**/*.css'
        },
        fonts: {
          path: buildPath + 'fonts/'
        }
      }
    };

  return config;
};
