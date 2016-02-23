angular
    .module('sehajPaathTracker')
    .run(function ($ionicHistory, $state, postSignupDetails) {
		AccountsTemplates.options.onSubmitHook = onSubmitHook;
		AccountsTemplates.options.onLogoutHook = onLogoutHook;
		
		///////////////
		function onSubmitHook(error, state) {
			if (!error) {
				if (state === "signIn" || state === "signUp") {
					$ionicHistory.nextViewOptions({
						historyRoot: true
					});

					$state.go("tab.paaths");

					postSignupDetails.show();
				}
			}
		}

		function onLogoutHook() {
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});

			$state.go("login");
		}

    });