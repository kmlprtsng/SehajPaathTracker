angular.module('sehajPaathTracker')
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'client/templates/login.html',
				authRequired: false
			})
			.state('paaths', {
				url: '/paaths',
				templateUrl: 'client/templates/paaths.html',
				controller: 'PaathsCtrl',
				authRequired: true
			})
			.state('createPaath', {
				url: '/create-paath',
				templateUrl: 'client/templates/createPaath.html',
				controller: "CreatePaathCtrl",
				authRequired: true
			})
			.state('paathSettings', {
				url: '/paaths/:paathId/settings',
				templateUrl: 'client/templates/paathSettings.html',
				controller: 'PaathSettingsCtrl',
				authRequired: true
			})
			.state('paathDetails', {
				url: '/paaths/:paathId',
				templateUrl: 'client/templates/paathDetails.html',
				controller: 'PaathDetailsCtrl as vm',
				authRequired: true
			})
			.state('paathHistoryLogs', {
				url: '/paaths/:paathId/history-logs',
				templateUrl: 'client/templates/paathHistoryLogs.html',
				controller: 'PaathHistoryLogsCtrl as vm',
				authRequired: true
			})
			.state('addPaathLog', {
				url: '/paaths/:paathId/paath-log/add',
				templateUrl: 'client/templates/paathLogForm.html',
				controller: 'PaathLogFormCtrl as vm',
				authRequired: true,
				resolve: {
					paathLogStatues: function(){ return PaathLogStatuses; }
				}
			})
			.state('editPaathLog', {
				url: '/paaths/:paathId/paath-log/:paathLogId',
				templateUrl: 'client/templates/paathLogForm.html',
				controller: 'PaathLogFormCtrl as vm',
				authRequired: true,
				resolve: {
					paathLogStatues: function(){ return PaathLogStatuses; }
				}
			});

		$urlRouterProvider.otherwise('/login');

	});