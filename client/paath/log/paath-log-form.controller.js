angular.module('sehajPaathTracker')
	.controller('PaathLogFormCtrl', PaathLogFormController);

function PaathLogFormController($scope, $state, $stateParams, $ionicHistory, paathLogStatues, notifications, $reactive, $ionicPopup, $timeout) {
    $reactive(this).attach($scope);
    
	var vm = this,
		paathId = $stateParams.paathId,
		paathLogId = $stateParams.paathLogId;

	vm.newPaathLog = !paathLogId;
	vm.data = {};
	vm.paathLogStatus = paathLogStatues;
    vm.loggedInUserId = Meteor.userId();

	vm.deletePaathLog = deletePaathLog;
	vm.showMissingAngs = showMissingAngs;
    vm.updatePaathLog = updatePaathLog;
    vm.isAllowedToEdit = false;
    
    vm.helpers({
		paath() { 
			return Paaths.findOne(paathId);
		} 
	});
    
    var nextAvailableAngWatch = $scope.$watch("vm.paath.nextAvailableAng", function(oldVal, newVal){
       if(oldVal === newVal) return;
       
       if(vm.newPaathLog){
           $timeout(function(){
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Chardikala Ji',
                    template: 'The next available ang has just changed to ' 
                                    + vm.paath.nextAvailableAng 
                                    + '. <br /><br />Would you like to update your starting ang?'
                });
                
                confirmPopup.then(function(res) {
                    if(res) {
                        vm.data.startAng = vm.paath.nextAvailableAng;
                    }
                });
            });
       } 
    });
    
	init();

	////////////
		
	function deletePaathLog() {
		Meteor.call('deletePaathLog', paathLogId, function (error) {
            if (error) {
                notifications.notify("Bhakslo Khalsa Ji", "Sorry Khalsa Ji but there was a problem deleting your paath log");
            }
        });
        
		$ionicHistory.goBack();
	}
    
	function init() {
		if (!vm.newPaathLog) {
			loadPaathLogDetails();
		}
        else {
            vm.data.startAng = vm.paath.nextAvailableAng;
            vm.data.userId = vm.loggedInUserId;
        }
        
        vm.isAllowedToEdit = vm.newPaathLog || vm.data.userId === vm.loggedInUserId; 
	}
    
    function loadPaathLogDetails(){
        var paathLog = PaathLogs.findOne(paathLogId);

        vm.data.startAng = paathLog.startAng;
        vm.data.finishAng = paathLog.finishAng;
        vm.data.nextPankti = paathLog.nextPankti;
        vm.data.selectedStatus = _.where(vm.paathLogStatus, { title: paathLog.status })[0];
        vm.data.userId = paathLog.userId;
    }

    function showMissingAngs(){
        $ionicPopup.alert({
            title: 'Waheguru Bhala Kare',
            template: "Missing Angs are: " + vm.paath.missingAngs.join(", ")
        });
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

            nextAvailableAngWatch();

			Meteor.call('savePaathLog', paathLogId, paathLog, function(error){
                if(error){
                    if(error.error === "not-authorised"){
                        notifications.notify("Not Authorised", "Sorry Khalsa Ji but you are not allowed to edit other people's log");
                        return;
                    }
                    
                    notifications.notify("Bhakslo Khalsa Ji", "Sorry but we could not save your paath log");
                }
            });
            
            $ionicHistory.goBack();	
		}
	}
};