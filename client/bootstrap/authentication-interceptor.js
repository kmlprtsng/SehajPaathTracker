(function(){
  angular
    .module('sehajPaathTracker')
    .run(function ($rootScope, $state) {
      $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        var isAuthenticated = Meteor.userId() !== null;
  
        var isAuthRequired =  toState.authRequired;
        
        if(isAuthRequired === undefined || isAuthRequired === null){
          isAuthRequired = true;
        }
        
        if (isAuthRequired && !isAuthenticated) {
          $state.transitionTo("login");
          event.preventDefault();
        }
        
        if(isAuthenticated && toState.name === "login"){
          $state.transitionTo("tab.paaths");
          event.preventDefault();
        }
      });
    });
})();
