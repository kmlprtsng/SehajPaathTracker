Meteor.methods({
  createPaath: function (paath) {
    paath.timestamp = new Date();
    paath.logs = [];

    var paathId = Paaths.insert(paath);
    return paathId;
  },

  deletePaath: function (paathId) {
    return Paaths.remove({ _id: paathId });
  },

  savePaathLog: function (paathId, paathLog) {
    if (paathLog._id) {
      return Paaths.update(
        { _id: paathId, "logs._id": paathLog._id },
        { $set: { "logs.$": paathLog } });
    }
    else{
      var newId = new Mongo.ObjectID;
      paathLog._id = newId._str;
      return Paaths.update(paathId, { $push: { logs: paathLog } });
    }
  }
});