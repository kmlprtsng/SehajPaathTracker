angular.module('sehajPaathTracker')
	.controller('PaathDetailsCtrl', PaathDetailsController);

function PaathDetailsController($scope, $stateParams, $reactive) {
	$reactive(this).attach($scope);
	
	var vm = this,
		paathId = $stateParams.paathId;

	vm.helpers({
		paath() { 
			return Paaths.findOne(paathId); 
		} 
	});
}