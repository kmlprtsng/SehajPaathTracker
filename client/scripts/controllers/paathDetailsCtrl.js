angular.module('sehajPaathTracker')  
.controller('paathDetailsCtrl', function($scope, $stateParams) {
	var paathId = $stateParams.paathId;
	$scope.paath = $scope.$meteorObject(Paaths, paathId, false);
});