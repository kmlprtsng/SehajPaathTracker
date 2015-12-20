(function () {
  Meteor.methods({
    createPaath: createPaath,
    deletePaath: deletePaath
  });

  function createPaath(paath) {

    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a paath.');
    }

    //TODO-KC don't let duplicates be added and the stop the current user from adding himself.
    
    var paathObj = {
      title: paath.title,
      createdAt: new Date(),
      users: paath.userIds,
      adminId: this.userId
    };

    var paathId = Paaths.insert(paathObj);
    return paathId;
  }

  function deletePaath(paathId) {
    return Paaths.remove({ _id: paathId });
  }
})();