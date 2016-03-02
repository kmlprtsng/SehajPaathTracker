(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .controller('InternetStatusBarController', InternetStatusBarController);

    function InternetStatusBarController($scope, $reactive) {
        $reactive(this).attach($scope);
        
        var vm = this;

        this.autorun(() => {
            vm.isConnected = Meteor.status().status === "connected";
        });   
    }
})();