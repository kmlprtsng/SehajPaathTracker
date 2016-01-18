(function () {
    'use strict';

    angular
        .module("sehajPaathTracker")
        .controller("UserPaathDetailsCtrl", UserPaathDetailsCtrl);

    function UserPaathDetailsCtrl($scope, $state, $ionicPopup, $reactive) {
        $reactive(this).attach($scope);
        
        var vm = this;

        vm.helpers({
            latestLog() {
                var items = PaathLogs
                                .find({userId: vm.user._id, status: { $ne: PaathLogStatuses.done.title }, paathId: vm.paath._id }, 
                                        {sort: {updatedDate: -1}},
                                        {limit: 1})
                                .fetch();
                
                if(items.length === 0){
                    items =  PaathLogs
                                .find({userId: vm.user._id, paathId: vm.paath._id }, 
                                        {sort: {updatedDate: -1}},
                                        {limit: 1})
                                .fetch();
                }
                
                return items[0];
            }
        });

        vm.loggedInUserId = Meteor.userId();

        vm.showAddButton = showAddButton;

        vm.addLog = addLog;
        vm.like = like;
        vm.updateLog = updateLog;
        
        //////////////
        function showAddButton() {
            return !vm.latestLog
                ? true
                : vm.latestLog.status === PaathLogStatuses.done.title;
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