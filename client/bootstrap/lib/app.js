(function () {
  angular
    .module('sehajPaathTracker', [
      'angular-meteor',
      'ionic',
      'angular-svg-round-progress',
      'angularMoment'
    ]);

  if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
  }
  else {
    angular.element(document).ready(onReady);
  }

  function onReady() {
    angular.bootstrap(document, ['sehajPaathTracker']);
  }
})();