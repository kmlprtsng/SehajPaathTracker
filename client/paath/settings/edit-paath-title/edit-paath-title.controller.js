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
    
    loadModal();
    
    ///////////
    
    
    function cancelEditTitleModel() {
        vm.modal.hide();
        vm.onCancel()();
    }
    
    function saveEditTitleModel() {
        //only highlight the save button if the value has been modified to something else and is filled in i.e. not empty
        //if title is the same or empty then do not update
        
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