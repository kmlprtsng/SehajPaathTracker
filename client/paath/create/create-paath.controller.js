angular.module('sehajPaathTracker')
	.controller('CreatePaathCtrl', CreatePaathController);

function CreatePaathController($scope, $state, $ionicPopup, $reactive, paathUsers) {
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

		$state.go('tab.paaths');
	};

	function addUser(email) {
        var newUser = paathUsers.findNewUserByEmail(vm.addUserFormEmail, vm.users);
        
		if(newUser){
            vm.users.push(newUser);
            delete vm.addUserFormEmail;
        }
	}
};