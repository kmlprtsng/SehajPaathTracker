(function () {
	angular.module('sehajPaathTracker')
		.controller('paathLogFormCtrl', function ($scope, $meteor, $state, $stateParams, $ionicHistory, paathLogStatues) {
			var vm = this,
				paathId = $stateParams.paathId,
				paathLogId = $stateParams.paathLogId;

			vm.newPaathLog = !paathLogId;
			vm.data = {};
			vm.paathLogStatus = paathLogStatues;

			vm.deletePaathLog = deletePaathLog;
			vm.updatePaathLog = updatePaathLog;

			init();

			function deletePaathLog() {
				$meteor.call('deletePaathLog', paathId, paathLogId)
				$ionicHistory.goBack();
			}

			function init() {
				if (paathLogId) {
					var paath = $scope.$meteorObject(Paaths, paathId, false),
						paathLog = _.first(_.where(paath.logs, { _id: paathLogId }));

					vm.data.startAng = paathLog.startAng;
					vm.data.finishAng = paathLog.finishAng;
					vm.data.nextPankti = paathLog.nextPankti;
					vm.data.selectedStatus = _.where(vm.paathLogStatus, { title: paathLog.status })[0];
				}
			}

			function updatePaathLog(isValid) {
				if (isValid) {
					var paathLog = {
						_id: paathLogId,
						startAng: vm.data.startAng,
						finishAng: vm.data.finishAng,
						nextPankti: vm.data.nextPankti,
						status: vm.data.selectedStatus.title
					};

					$meteor.call('savePaathLog', paathId, paathLog);

					$ionicHistory.goBack();
				}
			}
		});
})();