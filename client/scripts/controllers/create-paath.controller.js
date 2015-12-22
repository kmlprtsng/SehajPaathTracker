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
	vm.addPerson = addPerson;

	vm.people = [vm.loggedInUser];

	$scope.$watch("vm.data.title", function () {
		vm.data.formValid = !(_.isEmpty(vm.data.title));
	});

	this.subscribe('users');
		
	//////////
		
	function createPaath() {
		if (!vm.data.formValid) {
			return;
		}
		
		var userIds = _.pluck(vm.people, "_id");

		Meteor.call('createPaath', {
			title: vm.data.title,
			userIds: userIds
		});

		$state.go('paaths');
	};

	function addPerson() {
		if (_.isEmpty(vm.data.email) || vm.addPeopleForm.email.$error.email) {
			return $ionicPopup.alert({
				title: "Invalid Email",
				template: '<center>Please enter valid email pyario !!</center>'
			});
		}

        var userSuccessfullyAdded = addPersonToPaath.addUserToPaath(vm.data.email, vm.people);
        
		if(userSuccessfullyAdded){
            delete vm.data.email;
        }
	}
};