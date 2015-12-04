angular.module('sehajPaathTracker')
	.controller('paathsCtrl', function ($scope) {
		$scope.paaths = [
			{
				title: "Family Sehaj Paath"
			},
			{
				title: "Friends Sehaj Paath"
			},
			{
				title: "Birthday Sehaj Paath"
			}
		];
	});