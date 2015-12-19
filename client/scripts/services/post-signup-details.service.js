angular
  .module('sehajPaathTracker')
  .service('postSignupDetails', PostSignup);

function PostSignup($rootScope, $ionicModal) {
  var service = this;
  var templateUrl = 'client/templates/postSignUpDetails.html';

  service.show = show;
  service.hideModal = hideModal;

  ////////////
  
  function show(){
    var user = Meteor.user();
    if(_.isEmpty(user.profile) || _.isEmpty(user.profile.name)){
      showModal();
    }
  }

  function showModal () {
    service._scope = $rootScope.$new();

    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: service._scope,
      backdropClickToClose: false
    }).then(function(modal){
      service._modal = modal;
      modal.show();
    });
  }

  function hideModal () {
    service._scope.$destroy();
    service._modal.remove();
  }
}