angular.module('sehajPaathTracker')
    .controller('PaathsCtrl', PaathsController);

function PaathsController($scope, $reactive) {
    $reactive(this).attach($scope);

    var vm = this;

    vm.hasPaathsLoaded = false;
    vm.haveUsersLoaded = false;
    
    vm.subscribe('paaths', function(){}, {
        onReady: function () {
            vm.helpers({
                paaths() {
                    return Paaths.find();
                }
            });
            
            vm.hasPaathsLoaded = true;
        }
     });
     
     vm.subscribe('users', function(){}, {
        onReady: function () {
            vm.haveUsersLoaded = true;
        }
     });
}