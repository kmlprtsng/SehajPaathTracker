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
    vm.addUserFormEmail = "";

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
        var newUser = addPersonToPaath.addUserToPaath(vm.addUserFormEmail, vm.users);
        
		if(newUser){
            delete vm.addUserFormEmail;
        }
	}
};