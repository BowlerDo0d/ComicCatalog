'use strict';

/*jslint browser: true*/
var $;
window.jQuery = $ = require('jQuery');

require('bootstrap-sass');

var angular = require('angular');
var uiRouter = require('angular-ui-router');
var MainController = require('./controllers/MainController');

var app = angular.module('BANG-Boilerpate', [ uiRouter ]);

app.config(function ($stateProvider, $urlRouterProvider) {
  // Un-matched URL
  $urlRouterProvider.otherwise('/state1');

  // Setup the states
  $stateProvider
    .state('state1', {
      url: '/state1',
      templateUrl: 'partials/state1.html'
    })
    .state('state1.list', {
      url: '/list',
      templateUrl: 'partials/state1.list.html'
    })
    .state('state2', {
      url: '/state2',
      templateUrl: 'partials/state2.html'
    })
    .state('state2.list', {
      url: '/list',
      templateUrl: 'partials/state2.list.html'
    });
});

app.controller('MainController', MainController);
