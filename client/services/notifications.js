(function() {
'use strict';

    angular
        .module('sehajPaathTracker')
        .service('notifications', Notifications);

    Notifications.$inject = ['$ionicPopup'];
    function Notifications($ionicPopup) {
        var service = this;
        
        service.notify = notify;
        service.confirm = confirm;
        
        ////////////////
        function notify(title, template) { 
            $ionicPopup.alert({
                title: title,
                template: template
            });
        }
        
        function confirm(title, template){
            var promise = $ionicPopup.confirm({
                    title: title,
                    template: template
                });
            
            return promise;
        }
    }
})();