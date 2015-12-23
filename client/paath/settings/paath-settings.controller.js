angular.module('sehajPaathTracker')
    .controller('PaathSettingsCtrl', PaathSettingsController);

function PaathSettingsController($scope, $stateParams, $state, $ionicHistory, $reactive) {
    $reactive(this).attach($scope);

    var vm = this,
        paathId = $stateParams.paathId;

    vm.users = [];

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

    vm.deletePaath = deletePaath;
    vm.addUser = function () { };
    
    ////////////

    function deletePaath() {
        Meteor.call("deletePaath", vm.paath._id);

        $ionicHistory.nextViewOptions({
            historyRoot: true,
            disableAnimate: true
        });

        $state.go("paaths");
    }
}