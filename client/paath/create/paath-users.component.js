angular
    .module("sehajPaathTracker")
    .directive("paathUsers", paathUsersDirective);

function paathUsersDirective() {
    return {
        scope: {},
        controller: 'PaathUsersCtrl',
        controllerAs: 'vm',
        bindToController: {
            users: '=',
            onAddUser: "&",
            email: '=emailInput' 
        },
        templateUrl: 'client/paath/create/paath-users.html'
    };
}