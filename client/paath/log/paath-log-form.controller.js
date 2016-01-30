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
		Meteor.call('deletePaathLog', paathLogId)
		$ionicHistory.goBack();
	}

	function init() {
		if (paathLogId) {
			loadPaathLogDetails();
		}
        else {
            var paath = Paaths.find({_id: paathId}).fetch()[0];
            console.log(paath);
            vm.data.startAng = paath.nextAvailableAng;
        }
	}
    
    function loadPaathLogDetails(){
        var paathLog = PaathLogs.findOne(paathLogId);

			vm.data.startAng = paathLog.startAng;
			vm.data.finishAng = paathLog.finishAng;
			vm.data.nextPankti = paathLog.nextPankti;
			vm.data.selectedStatus = _.where(vm.paathLogStatus, { title: paathLog.status })[0];
    }

	function updatePaathLog(isValid) {
		if (isValid) {
			var paathLog = {
				startAng: vm.data.startAng,
				finishAng: vm.data.finishAng,
				nextPankti: vm.data.nextPankti,
				status: vm.data.selectedStatus.title,
				paathId: paathId
			};

			Meteor.call('savePaathLog', paathLogId, paathLog, function(error, result){
                
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