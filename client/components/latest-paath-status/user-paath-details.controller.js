(function () {
    'use strict';

    angular
        .module("sehajPaathTracker")
        .controller("UserPaathDetailsCtrl", UserPaathDetailsCtrl);

    function UserPaathDetailsCtrl($scope, latestPaathLogFinder, $state, $ionicPopup, $reactive) {
        $reactive(this).attach($scope);
        
        var vm = this,
            paathLogs = PaathLogs.find({paathId: vm.paath._id}).fetch();

        //vm.latestLog = latestPaathLogFinder.find(paathLogs, vm.user);

        vm.helpers({
            latestLog() {
                return PaathLogs.findOne();
            }
        });

        vm.loggedInUserId = Meteor.userId();

        vm.showAddButton = false;
        vm.showUpdateButton = false;

        vm.addLog = addLog;
        vm.like = like;
        vm.updateLog = updateLog;

        $scope.$watch("vm.latestLog", getUserPaathStatusText);
        
        //////////////
        function getUserPaathStatusText() {
            vm.showAddButton = !vm.latestLog
                ? true
                : vm.latestLog.status === PaathLogStatuses.done.title;
            vm.showUpdateButton = !vm.showAddButton;
        }

        function addLog() {
            $state.go("addPaathLog", { paathId: vm.paath._id });
        }

        function like() {
            $ionicPopup.alert({
                title: 'Sorry Khalsa Ji',
                template: 'We are still a fair bit away from adding this.'
            });
        }

        function updateLog() {
            $state.go("editPaathLog", { paathId: vm.paath._id, paathLogId: vm.latestLog._id });
        }
    }
})();