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

    paath.userIds.push(this.userId);
    paath.userIds = _.uniq(paath.userIds);
    
    var numUsersFoundWithUserIds = Meteor.users.find({ _id : { $in: paath.userIds} }).count();
    
    if(numUsersFoundWithUserIds !== paath.userIds.length){
        throw new Meteor.Error('users-not-found',
        'One or more users with the user ids were not found in the database');
    }
    
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