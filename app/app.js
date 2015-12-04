'use strict';

/*jslint browser: true*/
var $;
window.jQuery = $ = require('jQuery');

require('bootstrap-sass');

var angular = require('angular');
var MainController = require('./controllers/MainController');

var app = angular.module('BANG-Boilerpate', []);

app.controller('MainController', MainController);
