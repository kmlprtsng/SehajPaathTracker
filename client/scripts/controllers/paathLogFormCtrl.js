(function(){ 
	angular.module('sehajPaathTracker')
		.controller('paathLogFormCtrl', function($scope, $meteor, $state, $stateParams, $ionicHistory, paathLogStatues) {
		var paathId = $stateParams.paathId,
			paathLogId = $stateParams.paathLogId;
		
		$scope.newPaathLog = !paathLogId;
		$scope.data = {};
		$scope.paathLogStatus = paathLogStatues;
		
		$scope.deletePaathLog = deletePaathLog;
		$scope.updatePaathLog = updatePaathLog;
		
		init();
		
		function deletePaathLog(){
			$meteor.call('deletePaathLog', paathId, paathLogId)
			$ionicHistory.goBack();
		}
		
		function init(){
			if(paathLogId){
				var paath = $scope.$meteorObject(Paaths, paathId, false),
					paathLog = _.first(_.where(paath.logs, { _id: paathLogId}));
				
				$scope.data.startAng = paathLog.startAng;
				$scope.data.finishAng = paathLog.finishAng;
				$scope.data.nextPankti = paathLog.nextPankti;
				$scope.data.selectedStatus = _.where($scope.paathLogStatus, {title : paathLog.status})[0];
			}	
		}
		
		function updatePaathLog(isValid){
			if(isValid){
				var paathLog = {
					_id: paathLogId,
					startAng: $scope.data.startAng,
					finishAng: $scope.data.finishAng,
					nextPankti: $scope.data.nextPankti,
					status: $scope.data.selectedStatus.title
				};
				
				$meteor.call('savePaathLog', paathId, paathLog);
				
				$ionicHistory.goBack();
			}
		}
	});
})();