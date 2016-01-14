angular
    .module("sehajPaathTracker")
    .directive("userPaathDetails", latestPaathStatusDirective);
   
function latestPaathStatusDirective(){
    return {
        scope: {},
        controller: 'UserPaathDetailsCtrl',
        controllerAs: 'vm',
        bindToController: {
            user: '=',
            paath: "="
        },
        templateUrl: 'client/components/latest-paath-status/user-paath-details.html'
    };
}