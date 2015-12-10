angular.module('sehajPaathTracker')
.controller('paathLogFormCtrl', function($scope, $meteor, $state, $stateParams, $ionicHistory) {
	var paathId = $stateParams.paathId,
		paathLogId = $stateParams.paathLogId;
	
	$scope.data = {};
	$scope.paathLogStatus = PaathLogStatuses;
	
	if(paathLogId){
		var paath = $scope.$meteorObject(Paaths, paathId, false),
			paathLog = _.first(_.where(paath.logs, { _id: paathLogId}));
		
		$scope.data.startAng = paathLog.startAng;
		$scope.data.finishAng = paathLog.finishAng;
		$scope.data.nextPankti = paathLog.nextPankti;
		$scope.data.selectedStatus = _.where($scope.paathLogStatus, {title : paathLog.status})[0];
	}
	
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