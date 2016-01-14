(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .service('notifications', Notifications);

    Notifications.$inject = ['$ionicPopup'];
    function Notifications($ionicPopup) {
        var service = this;
        
        service.notify = notify;
        
        ////////////////
        function notify(title, template) { 
            $ionicPopup.alert({
                title: title,
                template: template
            });
        }
    }
})();