'use strict';

var fs = require('fs');
/*jslint stupid: true*/
var tasks = fs.readdirSync('./gulp/tasks');

tasks.forEach(function (task) {
  require('./tasks/' + task);
});
