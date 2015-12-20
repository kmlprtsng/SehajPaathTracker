(function () {
  Meteor.methods({
    savePostSignupDetails: savePostSignupDetails
  });

  function savePostSignupDetails(profile) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update users name.');
    }

    if (profile.name.length === 0) {
      throw Meteor.Error('name-required', 'Must proive user name');
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': profile.name } });
  }

})();