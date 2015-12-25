angular.module('sehajPaathTracker')
    .controller('EditPaathTitleCtrl', EditPaathTitleController);

function EditPaathTitleController($scope, $reactive, $ionicModal) {
    $reactive(this).attach($scope);

    var vm = this;
    vm.cancelEditTitleModel = cancelEditTitleModel;
    vm.saveEditTitleModel = saveEditTitleModel;
    
    vm.form = {
        title : vm.title()
    }
    
    vm.formValid = false;
    
    loadModal();
    
    $scope.$watch("vm.form.title", function(newVal, oldVal){
        if(newVal === oldVal){
            return;
        }
        
        if(_.isEmpty(vm.form.title)){
            vm.formValid = false;
        }
        else{
            vm.formValid = true;
        }
    });
    
    ///////////
    
    
    function cancelEditTitleModel() {
        vm.modal.hide();
        vm.onCancel()();
    }
    
    function saveEditTitleModel() {
        if(!vm.formValid){
            return;
        }
        
        vm.modal.hide();
        vm.onSave()(vm.form.title);
    }
    
    function loadModal() {
        $ionicModal.fromTemplateUrl('client/paath/settings/edit-paath-title/edit-paath-title-modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        }).then(function (modal) {
            vm.modal = modal;
            vm.modal.show();
        });
    }
};