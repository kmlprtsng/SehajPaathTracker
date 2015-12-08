angular.module('sehajPaathTracker')
.controller('addPaathLogCtrl', function($scope) {
	
	$scope.data = {};
	
	$scope.addPaathLog = function(isValid){
		console.log("yep. Ive been submitted");
	};
});