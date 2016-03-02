(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .factory('meteorConnectionStatus', MeteorConnectionStatus);

    function MeteorConnectionStatus($rootScope, $reactive) {
        $reactive(this).attach($rootScope);
        
        var service = {
            connected: true
        };
        
        this.autorun(() => {
             service.connected = Meteor.status().status === "connected";
        });

        return service;
    }
})();