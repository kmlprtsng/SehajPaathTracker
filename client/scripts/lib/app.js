angular
  .module('sehajPaathTracker', [
    'angular-meteor',
    'ionic',
    'angular-svg-round-progress'
  ]);
 
if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}
 
function onReady() {
  angular.bootstrap(document, ['sehajPaathTracker']);
}


var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn" || state === "signUp") {
      window.location = "#/paaths";
    }
  }
};

AccountsTemplates.configure({
  onSubmitHook: mySubmitFunc
});