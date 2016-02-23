angular.module('sehajPaathTracker')
	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('login', {
				url: '/login?logout=:isSigningOut',
				templateUrl: 'client/user-accounts/login.html',
				authRequired: false
			})
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'client/tabs.html',
                authRequired: true,
                resolve: {
                    paathsSubscriptionHandler() {
                        return Meteor.subscribe('paaths');
                    },
                    users(){
                        return Meteor.subscribe('users');
                    }
                }
            })
			.state('tab.paaths', {
				url: '/paaths',
                views: {
                    'tab-paaths': {
                        templateUrl: 'client/paath/list/paaths.html',
                        controller: 'PaathsCtrl as vm'
                    }
                }
			})
			.state('tab.createPaath', {
				url: '/paaths/create',
                views: {
                    'tab-paaths': {
                        templateUrl: 'client/paath/create/create-paath.html',
                        controller: 'CreatePaathCtrl as vm'
                    }
                }
			})
			.state('tab.paathSettings', {
				url: '/paaths/:paathId/settings',
                views: {
                    'tab-paaths': {
                        templateUrl: 'client/paath/settings/paath-settings.html',
                        controller: 'PaathSettingsCtrl as vm'
                    }
                }
			})
			.state('tab.paathDetails', {
				url: '/paaths/:paathId',
                views: {
                    'tab-paaths': {
                        templateUrl: 'client/paath/details/paath-details.html',
                        controller: 'PaathDetailsCtrl as vm'
                    }
                }
			})
			.state('tab.paathHistoryLogs', {
				url: '/paaths/:paathId/history-logs',
                views: {
                    'tab-paaths': {
                        templateUrl: 'client/paath/history/paath-history-logs.html',
                        controller: 'PaathHistoryLogsCtrl as vm'
                    }
                }
			})
			.state('tab.addPaathLog', {
				url: '/paaths/:paathId/paath-log/add',
                views: {
                    'tab-paaths': {
                        templateUrl: 'client/paath/log/paath-log-form.html',
                        controller: 'PaathLogFormCtrl as vm'
                    }
                },
				resolve: {
					paathLogStatues: function(){ return PaathLogStatusesList; }
				}
			})
			.state('tab.editPaathLog', {
				url: '/paaths/:paathId/paath-log/:paathLogId',
                views: {
                    'tab-paaths': {
                        templateUrl: 'client/paath/log/paath-log-form.html',
                        controller: 'PaathLogFormCtrl as vm'
                    }
                },
				resolve: {
					paathLogStatues: function(){ return PaathLogStatusesList; }
				}
			})
            
			.state('tab.settings', {
				url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'client/settings/settings.html',
                        controller: 'SettingsCtrl as vm'
                    }
                }
			});

		$urlRouterProvider.otherwise('/login');

	});