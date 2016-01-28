(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .filter('userLogString', UserLogStringFilter);

    UserLogStringFilter.$inject = ['stringHelper'];
    
    function UserLogStringFilter(stringHelper) {
       return function (log, logUser){
           
           var loggedInUserId = Meteor.user()._id,
                hasHaveStr = loggedInUserId === logUser._id ? "have" : "has";

            if (!log) {
                return stringHelper.format("{hasHave} not started any angs yet", { hasHave: hasHaveStr });
            }

            var logText;

            switch (log.status) {
                case PaathLogStatuses.inProgress.title:
                    logText = "{hasHave} in progress ang {startAng} to {finishAng}";
                    break;
                case PaathLogStatuses.willDo.title:
                    logText = "{hasHave} assigned ang {startAng} to {finishAng}";
                    break;
                case PaathLogStatuses.done.title:
                    logText = "{hasHave} completed ang {startAng} to {finishAng}";
                    break;
                default: return "Uknown log status";
            }

            return stringHelper.format(logText,
                {
                    hasHave: hasHaveStr,
                    startAng: log.startAng,
                    finishAng: log.finishAng
                });
       }
    }
})();