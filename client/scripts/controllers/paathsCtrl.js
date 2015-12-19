angular.module('sehajPaathTracker')
	.controller('PaathsCtrl', function ($scope) {
		$scope.paaths = $scope.$meteorCollection(Paaths, false);
	});