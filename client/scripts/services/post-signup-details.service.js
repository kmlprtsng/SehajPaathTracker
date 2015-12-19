angular
  .module('sehajPaathTracker')
  .service('postSignupDetails', PostSignup);

function PostSignup($rootScope, $ionicModal) {
  var templateUrl = 'client/templates/postSignUpDetails.html';

  this.showModal = showModal;
  this.hideModal = hideModal;

  //TODO-KC only show this if the user's name is null

  ////////////

  function showModal () {
    this._scope = $rootScope.$new();

    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: this._scope,
      backdropClickToClose: false
    }).then((modal) => {
      this._modal = modal;
      modal.show();
    });
  }

  function hideModal () {
    this._scope.$destroy();
    this._modal.remove();
  }
}