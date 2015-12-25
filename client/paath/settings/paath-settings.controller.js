angular.module('sehajPaathTracker')
    .controller('PaathSettingsCtrl', PaathSettingsController);

function PaathSettingsController($scope, $stateParams, $state, $ionicHistory, $reactive, paathUsers, $ionicModal) {
    $reactive(this).attach($scope);

    var vm = this,
        paathId = $stateParams.paathId;

    vm.addUserForEmail = "";
    vm.subscribe('paaths');
    vm.subscribe('users');

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
    vm.cancelEditTitleModel = cancelEditTitleModel;
    vm.deletePaath = deletePaath;
    vm.editTitle = editTitle;
    vm.saveEditTitleModel = saveEditTitleModel;

    setupTitleModal();
    
    ////////////
    function addUser() {
        var newUser = paathUsers.findNewUserByEmail(vm.addUserFormEmail, vm.users);

        if (newUser) {
            Meteor.call("addUserToPaath", vm.paath._id, newUser._id);
            delete vm.addUserFormEmail;
        }
    }

    function cancelEditTitleModel() {
        vm.modal.hide();
    }

    function deletePaath() {
        Meteor.call("deletePaath", vm.paath._id);

        $ionicHistory.nextViewOptions({
            historyRoot: true,
            disableAnimate: true
        });

        $state.go("paaths");
    }

    function editTitle() {
        vm.modal.show();
    }
    
    function saveEditTitleModel(){
        //only highlight the save button if the value has been modified to something else and is filled in i.e. not tempy
        
        //if title is the same or empty then do not update
        
        Meteor.call('updatePaathTitle', paathId, vm.paath.title);
        vm.modal.hide();
    }

    function setupTitleModal() {
        $ionicModal.fromTemplateUrl('client/paath/settings/edit-paath-title-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            vm.modal = modal;
            vm.modal.show();
        });
    }
}