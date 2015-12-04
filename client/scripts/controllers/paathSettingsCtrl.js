angular.module('sehajPaathTracker')  
.controller('paathSettingsCtrl', function($scope, $stateParams) {
	var paathId = $stateParams.paathId;
	$scope.paath = $scope.$meteorObject(Paaths, paathId, false);
});