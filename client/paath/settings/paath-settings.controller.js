angular.module('sehajPaathTracker')
    .controller('PaathSettingsCtrl', PaathSettingsController);

function PaathSettingsController($scope, $stateParams, $state, $ionicHistory, $reactive, paathUsers) {
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
    vm.deletePaath = deletePaath;
    
    ////////////
    function addUser(){
        var newUser = paathUsers.findNewUserByEmail(vm.addUserFormEmail, vm.users);
        
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