angular.module('sehajPaathTracker')
	.controller('PaathsCtrl', function ($scope, $reactive) {
		$reactive(this).attach($scope)
		
		this.helpers({
			paaths() {
				return Paaths.find();
			}
		});
	});