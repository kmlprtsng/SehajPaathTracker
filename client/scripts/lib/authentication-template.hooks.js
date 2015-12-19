angular
    .module('sehajPaathTracker')
    .run(function ($ionicHistory, $state, postSignupDetails) {
		AccountsTemplates.options.onSubmitHook = onSubmitHook;
		AccountsTemplates.options.onLogoutHook = onLogoutHook;
		
		///////////////
		function onSubmitHook() {
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});

			$state.go("paaths");
			
			postSignupDetails.show();
		}

		function onLogoutHook() {
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});

			$state.go("login");
		}

    });