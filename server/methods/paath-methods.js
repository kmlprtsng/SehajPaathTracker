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

    var paathObj = {
      title: paath.title,
      createdAt: new Date(),
      users: [{ id: this.userId, isAdmin: true }]
    };

    var paathId = Paaths.insert(paathObj);
    return paathId;
  }

  function deletePaath(paathId) {
    return Paaths.remove({ _id: paathId });
  }
})();