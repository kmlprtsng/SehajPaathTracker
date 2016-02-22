(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .controller('SettingsCtrl', SettingsController);

    function SettingsController($meteor, $ionicHistory, $state) {
        var vm = this;
        
        vm.logout = logout;

        ////////////////

        function logout() { 
            $meteor.logout();
            
            $ionicHistory.nextViewOptions({
				historyRoot: true
			});

			$state.go("login", { isSigningOut: true});
        }
    }
})();