angular.module('sehajPaathTracker')
	.controller('createPaathCtrl', function ($scope, $meteor, $state) {
		$scope.data = {};

		$scope.createPaath = function () {
			if (_.isEmpty($scope.data.title)) {
				return;
			}

			$meteor.call('createPaath', {
				title: $scope.data.title
			});

			$state.go('paaths');
		};
	});