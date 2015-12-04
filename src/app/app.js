'use strict';

/*jslint browser: true*/
var $;
window.jQuery = $ = require('jQuery');
var bootstrap = require('bootstrap-sass');
var angular = require('angular');
var uiRouter = require('angular-ui-router');

var app = angular.module('BANG-Boilerpate', [ uiRouter ]);

var MainController;

app.config(function ($stateProvider, $urlRouterProvider) {
  // Un-matched URL
  $urlRouterProvider.otherwise('/state1');

  // Setup the states
  $stateProvider
    .state('state1', {
      url: '/state1',
      templateUrl: 'app/templates/state1.tmpl.html'
    })
    .state('state1.list', {
      url: '/list',
      templateUrl: 'app/templates/state1.list.tmpl.html'
    })
    .state('state2', {
      url: '/state2',
      templateUrl: 'app/templates/state2.tmpl.html'
    })
    .state('state2.list', {
      url: '/list',
      templateUrl: 'app/templates/state2.list.tmpl.html'
    });
});

app.controller('MainController', MainController);

function MainController() {
  var vm = this;
  vm.message = 'Angular Works!!!';
}
