angular.module('sehajPaathTracker')
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'client/templates/login.html',
				controller: 'loginCtrl'
			})
			.state('signup', {
				url: '/signup',
				templateUrl: 'client/templates/signup.html',
				controller: 'signupCtrl'
			})
			.state('paaths', {
				url: '/paaths',
				templateUrl: 'client/templates/paaths.html',
				controller: 'paathsCtrl'
			})
			.state('paathDetails', {
				url: '/paath-details',
				templateUrl: 'client/templates/paathDetails.html',
				controller: 'paathDetailsCtrl'
			})
			.state('addPaath', {
				url: '/add-paath',
				templateUrl: 'client/templates/addPaath.html',
				controller: 'addPaathCtrl'
			});

		$urlRouterProvider.otherwise('/login');

	});