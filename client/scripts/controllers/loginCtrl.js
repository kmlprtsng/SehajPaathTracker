angular.module('sehajPaathTracker')
.controller('loginCtrl', function($scope, $ionicHistory, $state) {
	$scope.login = function(){
		$ionicHistory.nextViewOptions({
			historyRoot: true
		});
		
		$state.go("paaths");
	}
});