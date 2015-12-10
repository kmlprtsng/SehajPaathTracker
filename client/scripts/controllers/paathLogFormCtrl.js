angular.module('sehajPaathTracker')
.controller('paathLogFormCtrl', function($scope, $meteor, $state, $stateParams, $ionicHistory) {
	var paathId = $stateParams.paathId,
		paathLogId = $stateParams.paathLogId;
	
	$scope.data = {};
	$scope.paathLogStatus = PaathLogStatuses;
	
	// if(paathLogId){
	// 	var paathLog = Paaths.find()
	// 	$scope.data.startAng = 
	// }
	
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