angular
    .module("sehajPaathTracker")
    .service("paathUsers", paathUsersService);
    
function paathUsersService($ionicPopup){
    var service = this;
    
    service.findUser = function(email, existingUsers){
        var alreadyExistingUser = _.find(existingUsers, function (user) {
			return _.isEqual(user.emails[0].address, email);
		});

		if(!_.isEmpty(alreadyExistingUser)){
			$ionicPopup.alert({
				title: "Chardikala ji",
				template: "<center>This person is already added to the list.</center>"
			});
            
            return null;
		}
        
        var loggedInUser = Meteor.user();
		var userFromDb = Meteor.users.findOne({
			_id: { $ne: loggedInUser._id },
			"emails.address": { $in: [email] }
		});

		if (_.isEmpty(userFromDb)) {
			$ionicPopup.alert({
				title: "Person not found",
				template: "<center>The user with this email address has not yet registered. Please get them to sign up first.</center>"
			});
            
            return null;
		}
        
        return userFromDb;
    }
}