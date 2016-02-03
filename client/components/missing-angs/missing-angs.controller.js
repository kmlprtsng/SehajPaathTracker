(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .controller('MissingAngsCtrl', MissngAngsController);

    MissngAngsController.$inject = ['$ionicPopup'];
    function MissngAngsController($ionicPopup) {
        var vm = this;
        
        vm.show = show;
        
        ////////////////
        function show(){
            $ionicPopup.alert({
                title: "Missing Angs",
                template: "Missing angs are: " + vm.angs.join(", ")
            });
        }
    }
})();