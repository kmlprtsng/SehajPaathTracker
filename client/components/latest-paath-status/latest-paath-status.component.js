angular
    .module("sehajPaathTracker")
    .directive("latestPaathStatus", latestPaathStatusDirective);
   
function latestPaathStatusDirective(){
    return {
        scope: {},
        controller: 'LatestPaathStatusCtrl',
        controllerAs: 'vm',
        bindToController: {
            user: '=',
            paathLogs: "="
        },
        templateUrl: 'client/components/latest-paath-status/latest-paath-status.html'
    };
}