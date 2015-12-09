angular.module('sehajPaathTracker')
.controller('addPaathLogCtrl', function($scope, $meteor, $state, $stateParams, $ionicHistory) {
	var paathId = $stateParams.paathId;
	
	$scope.data = {};
	$scope.paathLogStatus = PaathLogStatuses;
	
	$scope.addPaathLog = function(isValid){
		if(isValid){
			var paathLog = {
				startAng: $scope.data.startAng,
				finishAng: $scope.data.finishAng,
				nextPankti: $scope.data.nextPankti,
				status: $scope.data.selectedStatus.title
			};
			
			$meteor.call('addPaathLog', paathId, paathLog);
			
			$ionicHistory.goBack();
		}
	};
});