angular.module('sehajPaathTracker')
	.controller('CreatePaathCtrl', CreatePaathController);

function CreatePaathController($scope, $state, $ionicPopup) {
	var vm = this;

	vm.data = {
		title: "",
		formValid: false
	};

	vm.createPaath = createPaath;
	vm.addPerson = addPerson;

	vm.people = [{
		name: "Jasvinder Kaur"
	},
		{
			name: "Satvinder Kaur"
		}];

	$scope.$watch("vm.data.title", function () {
		vm.data.formValid = !(_.isEmpty(vm.data.title));
	});
		
	//////////
		
	function createPaath() {
		if (!vm.data.formValid) {
			return;
		}

		Meteor.call('createPaath', {
			title: vm.data.title
		});

		$state.go('paaths');
	};

	function addPerson() {
		if (vm.addPeopleForm.email.$error.email) {
			$ionicPopup.alert({
				title: "Invalid Email",
				template: '<center>Please enter valid email pyario !!</center>'
			});
		}
		
		//validate user exists
		
		//if user doesn't exist then throw alert
		
		//add to the list of group
		
		//save users into the db
		
		//if user already added then handle that scenario
	}
};