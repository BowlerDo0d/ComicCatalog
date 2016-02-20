'use strict';

var $, app, angular;

// Load these on the main window object
window.jQuery = $ = require('jQuery');

angular = require('angular');

// Vendor modules
require('angular-ui-router');
require('bootstrap-sass');

// Custom modules
require('./templates.js');

// Main module
app = angular.module('ngSpark', [ 'ngSpark.templates', 'ui.router' ]);

app.config(require('./routes'));

require('./mainController.js');
