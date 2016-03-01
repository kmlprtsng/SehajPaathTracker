(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .controller('InternetStatusBarController', InternetStatusBarController);

    InternetStatusBarController.$inject = [''];
    function InternetStatusBarController($meteor) {
        var vm = this;
        vm.isConnected = $meteor.status().status === "connected";
    }
})();