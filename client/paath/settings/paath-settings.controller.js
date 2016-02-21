angular.module('sehajPaathTracker')
    .controller('PaathSettingsCtrl', PaathSettingsController);

function PaathSettingsController($scope, $stateParams, $state, $ionicHistory, $reactive, paathUsers, $ionicModal) {
    $reactive(this).attach($scope);

    var vm = this,
        paathId = $stateParams.paathId;

    vm.addUserForEmail = "";
    vm.editPaathTitle = false;
    vm.loggedInUserId = Meteor.userId();
    
    vm.helpers({
        paath() {
            return Paaths.findOne(paathId);
        }
    });

    var paathWatch = $scope.$watch("vm.paath", function () {
        if (vm.paath) {
            vm.helpers({
                users() {
                    return Meteor.users.find({ _id: { $in: vm.paath.users } });
                }
            });

            paathWatch();
        }
    });

    vm.addUser = addUser;
    vm.deletePaath = deletePaath;
    vm.showTitleModal = showTitleModal;
    vm.titleModal = {
        show: false,
        onSave: onTitleModalSave,
        onCancel: onTitleModalCancel
    };
    
    ////////////
    
    function addUser() {
        var newUser = paathUsers.findNewUserByEmail(vm.addUserFormEmail, vm.users);

        if (newUser) {
            Meteor.call("addUserToPaath", vm.paath._id, newUser._id);
            delete vm.addUserFormEmail;
        }
    }

    function deletePaath() {
        Meteor.call("deletePaath", vm.paath._id);

        $ionicHistory.nextViewOptions({
            historyRoot: true,
            disableAnimate: true
        });

        $state.go("tab.paaths");
    }

    function showTitleModal() {
        vm.titleModal.show = true;
    }
    
    function onTitleModalSave(newTitle){
        Meteor.call('updatePaathTitle', paathId, newTitle);
        vm.titleModal.show = false;
    }
    
    function onTitleModalCancel(){
        vm.titleModal.show = false;
    }
}