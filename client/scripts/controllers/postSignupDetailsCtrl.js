angular.module('sehajPaathTracker')
	.controller('PostSignupDetailsCtrl', PostSignupDetailsController);

function PostSignupDetailsController($scope, $reactive, postSignupDetails) {
	$reactive(this).attach($scope);

	var vm = this;
	vm.formValid = false;
	vm.profile = { name: null };

	vm.save = save;

	$scope.$watch("vm.profile.name", function () {
		vm.formValid = !(_.isEmpty(vm.profile.name));
	});
	
	///////////
	function save() {
		if (!vm.formValid) return;

		Meteor.call("savePostSignupDetails", vm.profile, function (error, result) {
			if (error) {
				console.log('failed', error);
			} else {
				postSignupDetails.hideModal();
			}
		});
	}
}