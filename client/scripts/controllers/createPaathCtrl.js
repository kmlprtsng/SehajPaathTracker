angular.module('sehajPaathTracker')
	.controller('createPaathCtrl', function ($scope, $meteor, $state) {
		$scope.data = {
			title: "",
			formValid: false
		};

		$scope.$watch("data.title", function(){
			$scope.data.formValid = !(_.isEmpty($scope.data.title));
		});
		
		$scope.createPaath = function () {
			if (!$scope.data.formValid) {
				return;
			}

			$meteor.call('createPaath', {
				title: $scope.data.title
			});

			$state.go('paaths');
		};
	});