angular.module('sehajPaathTracker')
	.controller('PaathDetailsCtrl', PaathDetailsController);

function PaathDetailsController($scope, $stateParams, $reactive) {
	$reactive(this).attach($scope);
	
	var vm = this,
		paathId = $stateParams.paathId;
        
    vm.subscribe("users");
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
    
    
}