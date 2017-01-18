/* @ngInject */
function routing($stateProvider, $urlRouterProvider) {
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
}

export default routing;
