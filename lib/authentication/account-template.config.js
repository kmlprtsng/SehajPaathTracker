var mySubmitFunc = function(error, state){
  if (!error) {
    if (state === "signIn" || state === "signUp") {
      window.location = "#/paaths";
    }
  }
};

AccountsTemplates.configure({
    //defaultLayout: 'emptyLayout',
    showForgotPasswordLink: false,
    overrideLoginErrors: true,
    enablePasswordChange: true,
    sendVerificationEmail: false,

    //enforceEmailVerification: true,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: false,
    //formValidationFeedback: true,
    //homeRoutePath: 'paaths',
    //showAddRemoveServices: false,
    //showPlaceholders: true,

    negativeValidation: false,
    negativeFeedback: false,
    positiveValidation: false,
    positiveFeedback: false,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
	
	// onSubmitHook: mySubmitFunc
});

