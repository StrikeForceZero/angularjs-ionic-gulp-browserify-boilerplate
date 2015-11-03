'use strict';

import angular from 'angular';

function ExampleCtrl($scope, $cordovaDevice) {

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;
  vm.deviceReady = false;
  vm.deviceReadyStatus  ='Cordova not loaded';
  vm.deviceInfo = {};

  vm.loadDeviceInfo = function(){
    $scope.$apply(function () { //lets make sure angular hears about our update
      vm.deviceReady = true;
      vm.deviceReadyStatus = 'Device Ready';

      try {
        angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
        vm.deviceInfo = $cordovaDevice.getDevice();
      }
      catch (e) {
        vm.deviceReadyStatus += ' - Plugin not installed, please run "cordova plugin add cordova-plugin-device"';
      }
    });
  };

  document.addEventListener('deviceready', vm.loadDeviceInfo, false);
}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
