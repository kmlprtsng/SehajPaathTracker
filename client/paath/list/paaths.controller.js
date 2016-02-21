angular.module('sehajPaathTracker')
    .controller('PaathsCtrl', PaathsController);

function PaathsController($scope, $reactive) {
    $reactive(this).attach($scope);

    var vm = this;
    
    vm.isLoading = true;
    
    vm.subscribe('paaths', function(){}, {
        onReady: function () {
            vm.helpers({
                paaths() {
                    return Paaths.find();
                }
            });
            
            vm.isLoading = false;
        }
    });
    
    vm.subscribe('users');
}