angular.module('sehajPaathTracker')
	.controller('CreatePaathCtrl', CreatePaathController);

function CreatePaathController($scope, $state, $ionicPopup, $reactive) {
	$reactive(this).attach($scope);

	var vm = this;
	var loggedInUser = Meteor.user();

	vm.data = {
		title: "",
		formValid: false
	};

	vm.createPaath = createPaath;
	vm.addPerson = addPerson;

	vm.people = [loggedInUser];

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
		if (vm.addPeopleForm.email.$error.email) {
			return $ionicPopup.alert({
				title: "Invalid Email",
				template: '<center>Please enter valid email pyario !!</center>'
			});
		}

		var email = vm.data.email;

		var existingPerson = _.find(vm.people, function (person) {
			return _.isEqual(person.emails[0].address, email);
		});

		if(!_.isEmpty(existingPerson)){
			return $ionicPopup.alert({
				title: "Chardikala ji",
				template: "<center>This person is already added to the list.</center>"
			});
		}
		
		var user = Meteor.users.findOne({
			_id: { $ne: loggedInUser._id },
			"emails.address": { $in: [email] }
		});

		if (_.isEmpty(user)) {
			return $ionicPopup.alert({
				title: "Person not found",
				template: "<center>The user with this email address has not yet registered. Please get them to sign up first.</center>"
			});
		}
		vm.people.push(user);

		delete vm.data.email;
		//convert this to a service
		
		// create filter for people with missing profile names
		
		//stop the enter causing multiple popups.
		
		//protect data going into the database.
	}
};