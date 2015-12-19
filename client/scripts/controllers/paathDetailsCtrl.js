(function () {
	'use strict';
	
	angular.module('sehajPaathTracker')
		.controller('PaathDetailsCtrl', PaathDetailsCtrl);
		
	function PaathDetailsCtrl($scope, $stateParams){
		var vm = this,
			paathId = $stateParams.paathId;
			
		vm.paath = $scope.$meteorObject(Paaths, paathId, false);
	}
})();