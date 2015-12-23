angular
    .module("sehajPaathTracker")
    .controller("PaathUsersCtrl", PaathUsersController);

function PaathUsersController($ionicPopup){
    var vm = this;
    
    vm.addUser = addUser;
    
    ////////
    
    function addUser(){
        if (_.isEmpty(vm.formEmailValue) || vm.addUserForm.email.$error.email) {
			return $ionicPopup.alert({
				title: "Invalid Email",
				template: '<center>Please enter valid email pyario !!</center>'
			});
		}
        
        vm.onAddUser();
    }
}