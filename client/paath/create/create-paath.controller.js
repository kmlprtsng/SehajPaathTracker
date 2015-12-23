angular.module('sehajPaathTracker')
	.controller('CreatePaathCtrl', CreatePaathController);

function CreatePaathController($scope, $state, $ionicPopup, $reactive, addPersonToPaath) {
	$reactive(this).attach($scope);

	var vm = this;
	vm.loggedInUser = Meteor.user();

	vm.data = {
		title: "",
		formValid: false
	};

	vm.createPaath = createPaath;
	vm.addUser = addUser;

	vm.users = [vm.loggedInUser];
    vm.userFormEmail = "";

	$scope.$watch("vm.data.title", function () {
		vm.data.formValid = !(_.isEmpty(vm.data.title));
	});

	this.subscribe('users');
		
	//////////
		
	function createPaath() {
		if (!vm.data.formValid) {
			return;
		}
		
		var userIds = _.pluck(vm.users, "_id");

		Meteor.call('createPaath', {
			title: vm.data.title,
			userIds: userIds
		});

		$state.go('paaths');
	};

	function addUser(email) {
        var userSuccessfullyAdded = addPersonToPaath.addUserToPaath(vm.userFormEmail, vm.users);
        
		if(userSuccessfullyAdded){
            delete vm.userFormEmail;
        }
	}
};