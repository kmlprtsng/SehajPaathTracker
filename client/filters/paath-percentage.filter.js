(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .filter('paathPercentage', PaathPercentage);

    function PaathPercentage() {
        return function(angsDone){
            var paathPercentage = angsDone / 1430 * 100,
                percentageRounded = Math.round(paathPercentage * 10) / 10;
            return  percentageRounded + "%";
        }
    }
})();