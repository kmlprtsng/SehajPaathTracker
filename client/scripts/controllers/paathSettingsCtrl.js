angular.module('sehajPaathTracker')  
.controller('paathSettingsCtrl', function($scope, $stateParams, $meteor, $state) {
	var paathId = $stateParams.paathId;
	$scope.paath = $scope.$meteorObject(Paaths, paathId, false);
	
	$scope.deletePaath = function(){
		$meteor.call("deletePaath", $scope.paath._id);
		
		$state.go("paaths");
	};
});