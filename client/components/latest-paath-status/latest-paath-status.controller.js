angular
    .module("sehajPaathTracker")
    .controller("LatestPaathStatusCtrl", LatestPaathStatusController);

function LatestPaathStatusController($scope, stringHelper) {
    var vm = this,
        userLogs = _.where(vm.paathLogs, { userId: vm.user._id }),
        latestLog,
        loggedInUserId = Meteor.user()._id;

    if (userLogs.length > 0) {
        latestLog = findInProgressLatestLog(userLogs);

        if (!latestLog) {
            latestLog = findLastUpdatedLog(userLogs);
        }
    }

    $scope.$watch("latestLog", function () {
        if (latestLog) {
            vm.latestLogText = getLatestLogText();
        }
    });
    
    /////////////////
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

    function getLatestLogText() {
        var hasHaveStr = loggedInUserId === vm.user._id ? "have" : "has";

        if (!latestLog) {
            return stringHelper.format("{hasHave} not started any angs yet", { hasHave: hasHaveStr });
        }

        var latestText;

        switch (latestLog.status) {
            case PaathLogStatuses.inProgress.title:
                latestText = "{hasHave} in progress ang {startAng} to {finishAng}";
                break;
            case PaathLogStatuses.willDo.title:
                latestText = "{hasHave} assigned ang {startAng} to {finishAng}";
                break;
            case PaathLogStatuses.done.title:
                latestText = "{hasHave} completed ang {startAng} to {finishAng}";
                break;
            default: return "Uknown log status";
        }

        return stringHelper.format(latestText,
            {
                hasHave: hasHaveStr,
                startAng: latestLog.startAng,
                finishAng: latestLog.finishAng
            });
    }
}