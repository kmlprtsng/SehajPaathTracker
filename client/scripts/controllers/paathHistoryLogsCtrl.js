(function () {
	'use strict';
	
	angular.module('sehajPaathTracker')
		.controller('PaathHistoryLogsCtrl', PaathHistoryLogsCtrl);
		
		function PaathHistoryLogsCtrl($scope, $stateParams){
			var vm = this,
				paathId = $stateParams.paathId;

			this.paath = $scope.$meteorObject(Paaths, paathId, false);
		}
})();