angular.module('sehajPaathTracker')
	.controller('paathsCtrl', function ($scope) {
		$scope.paaths = $scope.$meteorCollection(Paaths, false);
	});