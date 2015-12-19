angular.module('sehajPaathTracker')
	.controller('PaathSettingsCtrl', PaathSettingsController);

function PaathSettingsController($scope, $stateParams, $state, $ionicHistory, $reactive) {
	$reactive(this).attach($scope);

	var vm = this,
	 	paathId = $stateParams.paathId;

	vm.helpers({
		paath() { 
			return Paaths.findOne(paathId); 
		} 
	});
	
	vm.deletePaath = deletePaath;
	
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