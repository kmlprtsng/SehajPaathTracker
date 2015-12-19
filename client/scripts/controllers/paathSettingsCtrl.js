angular.module('sehajPaathTracker')  
.controller('PaathSettingsCtrl', function($scope, $stateParams, $meteor, $state, $ionicHistory) {
	var paathId = $stateParams.paathId;
	$scope.paath = $scope.$meteorObject(Paaths, paathId, false);
	
	$scope.deletePaath = function(){
		$meteor.call("deletePaath", $scope.paath._id);
		
		$ionicHistory.nextViewOptions({
			historyRoot: true,
			disableAnimate: true
		});
		
		$state.go("paaths");
	};
});