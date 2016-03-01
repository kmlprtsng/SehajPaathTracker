(function() {
    'use strict';

    angular
        .module('sehajPaathTracker')
        .directive('internetStatusBar', internetStatusBarDirective);

    function internetStatusBarDirective() {
        var directive = {
            //bindToController: true,
            //controller: 'InternetStatusBarController',
            //controllerAs: 'vm',
            restrict: 'E',
            scope: {},
            templateUrl: 'client/components/internet-status-bar/internet-status-bar.html'
        };
        return directive;
    }
})();