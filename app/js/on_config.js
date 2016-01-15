function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  /* This needs to remain disabled for bundled apps, as the base is disabled in the index.html */
  $locationProvider.html5Mode(false);

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'ExampleCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  });

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
