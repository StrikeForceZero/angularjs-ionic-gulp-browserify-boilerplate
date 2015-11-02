'use strict';

function ExampleCtrl($cordovaDevice) {

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;
  vm.deviceReady = 'Cordova not loaded';

  document.addEventListener('deviceready', function () {

    vm.deviceReady = 'Device Ready - ';

    try {
      angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
      vm.deviceReady += 'Check console for device information';
    }
    catch (e) {
      vm.deviceReady += 'Plugin not installed, please run "cordova plugin add cordova-plugin-device"';
      return;
    }

    var device = $cordovaDevice.getDevice(),
        cordova = $cordovaDevice.getCordova(),
        model = $cordovaDevice.getModel(),
        platform = $cordovaDevice.getPlatform(),
        uuid = $cordovaDevice.getUUID(),
        version = $cordovaDevice.getVersion();

    console.log({
      "device": device,
      "cordova": cordova,
      "model": model,
      "platform": platform,
      "uuid": uuid,
      "version": version
    });

  }, false);
}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
