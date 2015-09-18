'use strict';

var controllersModule = require('./_index');

/**
 * @ngInject
 */
function ExampleCtrl($cordovaDevice) {

  // ViewModel
  var vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify!';
  vm.number = 1234;

  document.addEventListener("deviceready", function () {

    vm.number = "Device Ready";
    console.log("device ready");

    var device = $cordovaDevice.getDevice();

    var cordova = $cordovaDevice.getCordova();

    var model = $cordovaDevice.getModel();

    var platform = $cordovaDevice.getPlatform();

    var uuid = $cordovaDevice.getUUID();

    var version = $cordovaDevice.getVersion();

    console.log({
      "device" : device,
      "cordova" : cordova,
      "model" : model,
      "platform" : platform,
      "uuid" : uuid,
      "version" : version
    });

  }, false);

}

controllersModule.controller('ExampleCtrl', ExampleCtrl);