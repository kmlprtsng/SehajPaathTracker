angular.module('sehajPaathTracker')  
.controller('paathHistoryLogsCtrl', function($scope, $stateParams) {
	var paathId = $stateParams.paathId;
	$scope.paath = $scope.$meteorObject(Paaths, paathId, false);
});