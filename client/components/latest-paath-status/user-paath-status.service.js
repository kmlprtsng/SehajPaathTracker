(function () {
    'use strict';

    angular
        .module('sehajPaathTracker')
        .service('userPaathStatus', userPaathStatusService);

    userPaathStatusService.$inject = ['stringHelper'];

    function userPaathStatusService(stringHelper) {
        var service = this;
        
        service.getLogStatusText = getLogStatusText;
        
        ////////////////
        function getLogStatusText(user, latestLog) {
            
            var loggedInUserId = Meteor.user()._id,
                hasHaveStr = loggedInUserId === user._id ? "have" : "has";

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
})();