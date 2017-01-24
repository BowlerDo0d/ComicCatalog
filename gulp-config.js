import * as project from './package.json';

const source = './src',
  appSource = `${source}/app/`,
  buildPath = './dist',
  indexFile = 'index.html',
  bootstrapPath = './node_modules/bootstrap-sass',
  fontAwesomePath = './node_modules/font-awesome',

  config = {

    bootstrap: {
      root: bootstrapPath,
      styles: `${bootstrapPath}/assets/stylesheets/`
    },

    fontAwesome: {
      root: fontAwesomePath,
      fonts: `${fontAwesomePath}/fonts/**.*`,
      styles: `${fontAwesomePath}/scss/`
    },

    fonts: [
      `${fontAwesomePath}/fonts/**.*`
    ],

    styles: {
      sass: `${source}/sass/**/*.scss`,
      main: `${source}/sass/main.scss`
    },

    js: {
      appEntryPoint: `${appSource}/main.js`,
      compiledFile: 'main.js',
      watchList: `${appSource}/**/*.js`,
      lintPaths: [
        `${appSource}/**/*.js`,
        './*.js',
        `!${appSource}/templates.js`
      ]
    },

    html: {
      templates: `${appSource}/**/*.tmpl.html`,
      baseFile: `${source}/${indexFile}`,
      watchList: `${source}/**/*.html`
    },

    templateCache: {
      destination: appSource,
      file: 'templates.js',
      options: {
        module: `${project.name}.templates`,
        standalone: true,
        root: 'app/'
      }
    },

    build: {
      root: buildPath,
      baseFile: `${buildPath}/${indexFile}`,
      js: {
        path: `${buildPath}/js/`,
        files: `${buildPath}/js/**/*.js`
      },
      css: {
        path: `${buildPath}/css/`,
        files: `${buildPath}/css/**/*.css`
      },
      fonts: {
        path: `${buildPath}/fonts/`
      }
    }
  };

export default config;
