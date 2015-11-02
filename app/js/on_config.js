'use strict';

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {

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