(function () {
  Meteor.methods({
    savePostSignupDetails: savePostSignupDetails
  });

  function savePostSignupDetails(profile) {
    if (!this.userId) {
      throw new Meteor.Error("not-logged-in",
        "Must be logged in to update user's name.");
    }

    if (profile.name.length === 0) {
      throw Meteor.Error('name-required', "Must provide user's name");
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': profile.name } });
  }

})();