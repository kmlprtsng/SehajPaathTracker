angular.module('sehajPaathTracker')
	.controller('PaathLogFormCtrl', PaathLogFormController);

function PaathLogFormController($scope, $state, $stateParams, $ionicHistory, paathLogStatues, notifications) {
	var vm = this,
		paathId = $stateParams.paathId,
		paathLogId = $stateParams.paathLogId;

	vm.newPaathLog = !paathLogId;
	vm.data = {};
	vm.paathLogStatus = paathLogStatues;

	vm.deletePaathLog = deletePaathLog;
	vm.updatePaathLog = updatePaathLog;

	init();

	////////////
		
	function deletePaathLog() {
		Meteor.call('deletePaathLog', paathId, paathLogId)
		$ionicHistory.goBack();
	}

	function init() {
		if (paathLogId) {
			var paath = Paaths.findOne(paathId),
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

			Meteor.call('savePaathLog', paathId, paathLog, function(error, result){
                
                if(!error){
                    $ionicHistory.goBack();
                    return;
                }
                
                if(error.error === "not-authorised"){
                    notifications.notify("Not Authorised", "Sorry Khalsa Ji but you are not allowed to edit other people's log");
                }
            });			
		}
	}
};