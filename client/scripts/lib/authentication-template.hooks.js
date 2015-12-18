(function () {
	function redirect(routePaath, setHistoryRoot) {
		var injector = angular.element(document.body).injector(),
			$ionicHistory = injector.get('$ionicHistory'),
			$state = injector.get('$state');

		if (setHistoryRoot) {
			$ionicHistory.nextViewOptions({
				historyRoot: true
			});
		}

		$state.go(routePaath);
	}

	var mySubmitFunc = function (error, state) {
		console.log("submit clicked");
		if (!error) {
			if (state === "signIn" || state === "signUp") {
				redirect("paaths", true);
			}
		}
	};
	
	var logoutFunc = function(){
		redirect("login", true);
	}

	AccountsTemplates.configure({
		onSubmitHook: mySubmitFunc,
		onLogoutHook: logoutFunc
	});

})();