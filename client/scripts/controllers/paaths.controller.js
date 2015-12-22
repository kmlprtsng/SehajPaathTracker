angular.module('sehajPaathTracker')
	.controller('PaathsCtrl', PaathsController);

function PaathsController($scope, $reactive) {
	$reactive(this).attach($scope);

	var vm = this;
	
	vm.helpers({
		paaths() {
			return Paaths.find();
		}
	});
}