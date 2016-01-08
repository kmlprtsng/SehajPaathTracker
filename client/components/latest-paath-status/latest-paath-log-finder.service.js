(function() {
'use strict';

    angular
        .module("sehajPaathTracker")
        .service('latestPaathLogFinder', latestPaathLogFinderService);
    
    function latestPaathLogFinderService() {
        var service = this;
        
        service.find = find;
        
        ////////////////
        function find(paathLogs, user) {
            var userLogs = _.where(paathLogs, { userId: user._id }),                
                foundLatestLog;

            if (userLogs.length === 0) {
                return null;
            }

            foundLatestLog = findInProgressLatestLog(userLogs);

            if (!foundLatestLog) {
                foundLatestLog = findLastUpdatedLog(userLogs);
            }

            return foundLatestLog;
        }

        //////////////////// PRIVATE METHODS
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
})();