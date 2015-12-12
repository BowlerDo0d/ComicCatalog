'use strict';

var $, app;
var jQuery = require('jQuery');

var angular = require('angular');
var uiRouter = require('angular-ui-router');

require('bootstrap-sass');

window.jQuery = $ = jQuery;

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

app.controller('MainController', MainController);

function MainController() {
  var vm = this;
  vm.navItems = [
    {
      name: 'Setup',
      href: 'setup'
    },
    {
      name: 'Gulp Info',
      href: 'gulp-info'
    },
    {
      name: 'About',
      href: 'about'
    }
  ];
}
