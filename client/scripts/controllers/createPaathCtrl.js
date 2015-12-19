angular.module('sehajPaathTracker')
	.controller('CreatePaathCtrl', CreatePaathController);

function CreatePaathController($scope, $state) {
	var vm = this;

	vm.data = {
		title: "",
		formValid: false
	};

	vm.createPaath = createPaath;

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
};