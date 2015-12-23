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
            formEmailValue: '=' 
        },
        templateUrl: 'client/paath/create/paath-users.html'
    };
}