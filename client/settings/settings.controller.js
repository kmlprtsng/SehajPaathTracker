(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .controller('SettingsCtrl', SettingsController);

    function SettingsController($meteor, $ionicHistory, $state, $stateParams) {
        var vm = this;
        
        vm.logout = logout;

        ////////////////

        function logout() { 
            $meteor.logout();
            
            $ionicHistory.nextViewOptions({
				historyRoot: true
			});

			$state.go("login", $stateParams, { notify: false });
        }
    }
})();