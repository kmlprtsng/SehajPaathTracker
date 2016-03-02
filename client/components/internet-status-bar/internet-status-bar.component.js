(function() {
    'use strict';

    angular
        .module('sehajPaathTracker')
        .directive('internetStatusBar', internetStatusBarDirective);

    function internetStatusBarDirective() {
        var directive = {
            bindToController: true,
            controller: 'InternetStatusBarController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {},
            templateUrl: 'client/components/internet-status-bar/internet-status-bar.html',
            link: link
        };
        return directive;
        
        function link(scope, element, attrs) {
            scope.$watch("isShown", function(){
               if(scope.isShown){
                   element
                    .removeClass("hide")
                    .addClass("shown");
               }
               else{
                   element
                    .addClass("hide")
                    .removeClass("shown");
               }
            });
        }
    }
})();
