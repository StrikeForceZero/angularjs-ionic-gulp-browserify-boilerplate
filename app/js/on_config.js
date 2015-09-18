'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $compileProvider, $urlRouterProvider) {

  var root = window.location.pathname;

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
  .state('Home', {
    url: root,
    controller: 'ExampleCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  });

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

  $urlRouterProvider.otherwise(root);

}

module.exports = OnConfig;