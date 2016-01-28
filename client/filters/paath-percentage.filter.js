(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .filter('paathPercentage', PaathPercentage);

    function PaathPercentage() {
        return function(angsDone){
            var paathPercentage = angsDone / 1430 * 100;
            return Math.floor(paathPercentage) + "%";
        }
    }
})();