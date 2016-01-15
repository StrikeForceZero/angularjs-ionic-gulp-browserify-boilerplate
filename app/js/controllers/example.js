function ExampleCtrl(CordovaService, $cordovaDevice) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Cordova, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;
  vm.deviceReady = false;
  vm.deviceReadyStatus  ='Cordova not loaded';
  vm.deviceInfo = {};

  let loadDeviceInfo = () => {
    vm.deviceReady = true;
    vm.deviceReadyStatus = 'Device Ready';

    try {
      angular.isDefined($cordovaDevice.getDevice()); //unfortunately if the plugin is not installed calling this will cause fatal error
      vm.deviceInfo = $cordovaDevice.getDevice();
    }
    catch (e) {
      vm.deviceReadyStatus += ' - Plugin not installed, please run "cordova plugin add cordova-plugin-device"';
    }
  };

  CordovaService.ready.then( () => loadDeviceInfo() );
}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
