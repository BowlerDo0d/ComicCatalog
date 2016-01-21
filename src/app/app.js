'use strict';

var $, app, angular, uiRouter;

window.jQuery = $ = require('jQuery');

require('bootstrap-sass');

angular = require('angular');
uiRouter = require('angular-ui-router');

app = angular.module('BANG-Boilerpate', [ uiRouter ]);

app.config(function ($stateProvider, $urlRouterProvider) {
  // Un-matched URL
  $urlRouterProvider.otherwise('/setup');

  // Setup the states
  $stateProvider
    .state('setup', {
      url: '/setup',
      templateUrl: 'app/templates/setup.tmpl.html'
    })
    .state('gulp-info', {
      url: '/gulp-info',
      templateUrl: 'app/templates/gulp-info.tmpl.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/templates/about.tmpl.html'
    });
});

require('./mainController.js');
