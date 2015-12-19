angular
    .module('sehajPaathTracker')
    .run(function ($ionicHistory, $state) {
		AccountsTemplates.options.onSubmitHook = onSubmitHook;
		AccountsTemplates.options.onLogoutHook = onLogoutHook;
		
		///////////////
		function onSubmitHook() {
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});

			$state.go("paaths");
		}

		function onLogoutHook() {
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});

			$state.go("login");
		}

    });