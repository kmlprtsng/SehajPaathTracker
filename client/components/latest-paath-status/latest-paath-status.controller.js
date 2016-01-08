(function () {
    'use strict';
    
    angular
        .module("sehajPaathTracker")
        .controller("LatestPaathStatusCtrl", LatestPaathStatusController);

    function LatestPaathStatusController($scope, userPaathStatus, latestPaathLogFinder) {
        var vm = this,
            latestLog = latestPaathLogFinder.find(vm.paathLogs, vm.user);

        $scope.$watch("latestLog", function () {
            if (latestLog) {
                vm.latestLogText = userPaathStatus.getLogStatusText(vm.user, latestLog);
            }
        });
    }
})();