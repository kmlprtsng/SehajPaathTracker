Meteor.methods({
  createPaath: function (paath) {
    paath.timestamp = new Date();
 
    var paathId = Paaths.insert(paath);
    return paathId;
  }
});