(function () {
    Meteor.methods({
        savePostSignupDetails: savePostSignupDetails
    });
    
    function savePostSignupDetails(profile) {
        Meteor.call("validateUser");

        if (profile.name.length === 0) {
            throw Meteor.Error('name-required', "Must provide user's name");
        }

        return Meteor.users.update(this.userId, { $set: { 'profile.name': profile.name } });
    }

})();