import 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';

import './templates';
import routing from './routes';

import MainController from './mainController';

// Main module
angular.module('ngSpark', [ 'ui.bootstrap', 'ui.router', 'ngSpark.templates' ])
  .config(routing)
  .controller('MainController', MainController);
