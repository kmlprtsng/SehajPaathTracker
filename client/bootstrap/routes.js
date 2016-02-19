angular.module('sehajPaathTracker')
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('login', {
				url: '/login',
				templateUrl: 'client/user-accounts/login.html',
				authRequired: false
			})
			.state('paaths', {
				url: '/paaths',
				templateUrl: 'client/paath/list/paaths.html',
				controller: 'PaathsCtrl as vm',
				authRequired: true
			})
			.state('createPaath', {
				url: '/create-paath',
				templateUrl: 'client/paath/create/create-paath.html',
				controller: "CreatePaathCtrl as vm",
				authRequired: true
			})
			.state('paathSettings', {
				url: '/paaths/:paathId/settings',
				templateUrl: 'client/paath/settings/paath-settings.html',
				controller: 'PaathSettingsCtrl as vm',
				authRequired: true
			})
			.state('paathDetails', {
				url: '/paaths/:paathId',
				templateUrl: 'client/paath/details/paath-details.html',
				controller: 'PaathDetailsCtrl as vm',
				authRequired: true
			})
			.state('paathHistoryLogs', {
				url: '/paaths/:paathId/history-logs',
				templateUrl: 'client/paath/history/paath-history-logs.html',
				controller: 'PaathHistoryLogsCtrl as vm',
				authRequired: true
			})
			.state('addPaathLog', {
				url: '/paaths/:paathId/paath-log/add',
				templateUrl: 'client/paath/log/paath-log-form.html',
				controller: 'PaathLogFormCtrl as vm',
				authRequired: true,
				resolve: {
					paathLogStatues: function(){ return PaathLogStatusesList; }
				}
			})
			.state('editPaathLog', {
				url: '/paaths/:paathId/paath-log/:paathLogId',
				templateUrl: 'client/paath/log/paath-log-form.html',
				controller: 'PaathLogFormCtrl as vm',
				authRequired: true,
				resolve: {
					paathLogStatues: function(){ return PaathLogStatusesList; }
				}
			});

		$urlRouterProvider.otherwise('/login');

	});