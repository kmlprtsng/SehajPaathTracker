(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .controller('InternetStatusBarController', InternetStatusBarController);

    function InternetStatusBarController($scope, $reactive) {
        $reactive(this).attach($scope);

        this.autorun(() => {
            $scope.isShown = Meteor.status().status !== "connected";
        });   
    }
})();