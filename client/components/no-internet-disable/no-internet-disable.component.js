(function() {
    'use strict';

    angular
        .module('sehajPaathTracker')
        .directive('noInternetDisable', NoInternetDisable);

    NoInternetDisable.$inject = ['meteorConnectionStatus'];
    function NoInternetDisable(meteorConnectionStatus) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;
        
        function link(scope, element, attrs) {
            scope.meteorConnectionStatus = meteorConnectionStatus;
            
            scope.$watch("meteorConnectionStatus.connected", function(){
               if(scope.meteorConnectionStatus.connected){
                   element
                    .removeAttr("disabled");
               }
               else{
                   element
                    .attr("disabled", "");
               }
            });
        }
    }
})();