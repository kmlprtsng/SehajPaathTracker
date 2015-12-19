angular.module('sehajPaathTracker')
	.controller('PaathsCtrl', PaathsController);

function PaathsController($scope, $reactive) {
	$reactive(this).attach($scope);

	this.helpers({
		paaths() {
			return Paaths.find();
		}
	});
}