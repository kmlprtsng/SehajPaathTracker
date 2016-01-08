(function () {
    'use strict';

    angular
        .module("sehajPaathTracker")
        .controller("UserPaathDetailsCtrl", UserPaathDetailsCtrl);

    function UserPaathDetailsCtrl($scope, userPaathStatus, latestPaathLogFinder, $state) {
        var vm = this,
            latestLog = latestPaathLogFinder.find(vm.paath.logs, vm.user);

        vm.loggedInUserId = Meteor.userId();
        
        vm.showAddButton = false;
        vm.showUpdateButton = false;

        vm.addLog = addLog;
        vm.updateLog = updateLog;

        $scope.$watch("latestLog", getUserPaathStatusText);
        
        //////////////
        function getUserPaathStatusText() {
            vm.latestLogText = userPaathStatus.getLogStatusText(vm.user, latestLog);
            vm.showAddButton = !latestLog 
                                    ? true 
                                    : latestLog.status === PaathLogStatuses.done.title;
            vm.showUpdateButton = !vm.showAddButton;
        }

        function addLog() {
            $state.go("addPaathLog", { paathId: vm.paath._id });
        }

        function updateLog() {
            $state.go("editPaathLog", { paathId: vm.paath._id, paathLogId: latestLog._id });
        }
    }
})();