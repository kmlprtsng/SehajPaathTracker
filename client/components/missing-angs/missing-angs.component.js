(function() {
    'use strict';

    angular
        .module('sehajPaathTracker')
        .directive('missingAngs', MissingAngs);

    function MissingAngs() {
        var directive = {
            bindToController: {
                angs: "="
            },
            controller: 'MissingAngsCtrl',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {},
            templateUrl: 'client/components/missing-angs/missing-angs.html'
        };
        
        return directive;
    }
})();