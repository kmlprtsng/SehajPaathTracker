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
			.state('createPaath', {
				url: '/create-paath',
				templateUrl: 'client/templates/createPaath.html',
				controller: "createPaathCtrl"
			})
			.state('paathSettings', {
				url: '/paaths/:paathId/settings',
				templateUrl: 'client/templates/paathSettings.html',
				controller: 'paathSettingsCtrl'
			})
			.state('paathDetails', {
				url: '/paaths/:paathId',
				templateUrl: 'client/templates/paathDetails.html',
				controller: 'paathDetailsCtrl'
			})
			.state('addPaathLog', {
				url: '/add-paath-log',
				templateUrl: 'client/templates/addPaathLog.html',
				controller: 'addPaathLogCtrl'
			});

		$urlRouterProvider.otherwise('/login');

	});