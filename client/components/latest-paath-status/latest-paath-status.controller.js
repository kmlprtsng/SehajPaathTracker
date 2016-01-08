(function () {
    'use strict';
    
    angular
        .module("sehajPaathTracker")
        .controller("LatestPaathStatusCtrl", LatestPaathStatusController);

    function LatestPaathStatusController($scope, userPaathStatus) {
        var vm = this,
            userLogs = _.where(vm.paathLogs, { userId: vm.user._id }),
            latestLog = getLatestPaathLog();

        $scope.$watch("latestLog", function () {
            if (latestLog) {
                vm.latestLogText = userPaathStatus.getLogStatusText(vm.user, latestLog);
            }
        });
    
        /////////////////
        function getLatestPaathLog() {
            var foundLatestLog;

            if (userLogs.length === 0) {
                return null;
            }

            foundLatestLog = findInProgressLatestLog(userLogs);

            if (!foundLatestLog) {
                foundLatestLog = findLastUpdatedLog(userLogs);
            }

            return foundLatestLog;
        }

        function findInProgressLatestLog(userLogs) {
            return _.find(userLogs, function (log) {
                return log.status === PaathLogStatuses.inProgress;
            });
        }

        function findLastUpdatedLog(userLogs) {
            return _.max(userLogs, function (log) {
                return log.updatedDate;
            });
        }
    }
}