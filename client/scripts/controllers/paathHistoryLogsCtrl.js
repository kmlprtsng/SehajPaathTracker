angular.module('sehajPaathTracker')  
.controller('paathHistoryLogsCtrl', function($scope, $stateParams) {
	var vm = this,
		paathId = $stateParams.paathId;
	
	this.paath = $scope.$meteorObject(Paaths, paathId, false);
});