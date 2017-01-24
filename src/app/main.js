import 'babel-polyfill';

import 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';

import * as project from '../../package.json';
import './templates';
import routing from './routes';

import MainController from './mainController';

const projectName = project.name;

// Main module
angular.module(projectName, [ 'ui.bootstrap', 'ui.router', `${projectName}.templates` ])
  .config(routing)
  .controller('MainController', MainController);
