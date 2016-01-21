'use strict';

var angular = require('angular');
var app = angular.module('BANG-Boilerpate');

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
