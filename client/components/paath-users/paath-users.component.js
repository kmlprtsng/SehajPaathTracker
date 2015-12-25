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
            email: '=emailInput',
            adminId: '='
        },
        templateUrl: 'client/components/paath-users/paath-users.html'
    };
}