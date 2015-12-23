angular.module('sehajPaathTracker')
    .controller('PaathSettingsCtrl', PaathSettingsController);

function PaathSettingsController($scope, $stateParams, $state, $ionicHistory, $reactive, addPersonToPaath) {
    $reactive(this).attach($scope);

    var vm = this,
        paathId = $stateParams.paathId;

    vm.users = [];
    vm.addUserForEmail = "";

    vm.subscribe('users');

    vm.helpers({
        paath() {
            return Paaths.findOne(paathId);
        }
    });

    var paathWatch = $scope.$watch("vm.paath", function () {
        if (vm.paath) {
            vm.users = Meteor.users.find({ _id: { $in: vm.paath.users } }).fetch();
            paathWatch();
        }
    });

    vm.addUser = addUser;
    vm.deletePaath = deletePaath;
    
    ////////////
    function addUser(){
        var newUser = addPersonToPaath.addUserToPaath(vm.addUserFormEmail, vm.users);
        
        //TODO-KC see if the users are immediately shown on other screens.
        
		if(newUser){
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

        $state.go("paaths");
    }
}