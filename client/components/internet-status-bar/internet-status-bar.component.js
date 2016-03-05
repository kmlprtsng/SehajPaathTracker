(function() {
    'use strict';

    angular
        .module('sehajPaathTracker')
        .directive('internetStatusBar', internetStatusBarDirective);

    function internetStatusBarDirective(meteorConnectionStatus) {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'client/components/internet-status-bar/internet-status-bar.html',
            link: link
        };
        return directive;
        
        function link(scope, element, attrs) {
            scope.meteorConnectionStatus = meteorConnectionStatus;
            
            scope.$watch("meteorConnectionStatus.connected", function(){
               if(scope.meteorConnectionStatus.connected){
                   element
                    .addClass("hide")
                    .removeClass("shown");
               }
               else{
                   element
                    .removeClass("hide")
                    .addClass("shown");
               }
            });
        }
    }
})();
