angular.module('sehajPaathTracker')
	.controller('PaathsCtrl', PaathsController);

function PaathsController($scope, $reactive) {
	$reactive(this).attach($scope);

	var vm = this;
    vm.subscribe('paaths');
	vm.subscribe('users');
	
	vm.helpers({
		paaths() {
			return Paaths.find();
		}
	});
}