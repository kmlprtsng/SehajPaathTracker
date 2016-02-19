angular.module('sehajPaathTracker')
	.controller('PaathHistoryLogsCtrl', PaathHistoryLogsController);

function PaathHistoryLogsController($scope, $stateParams, $reactive) {
	$reactive(this).attach($scope);
	
	var vm = this,
		paathId = $stateParams.paathId;
        
    vm.subscribe('paaths');
	vm.subscribe('users');

	vm.helpers({
		paathLogs() { 
			return PaathLogs.find({paathId: paathId}); 
		} 
	});
}
