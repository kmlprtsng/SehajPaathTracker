(function () {
  Meteor.methods({
    deletePaathLog: deletePaathLog,
    savePaathLog: savePaathLog
  });

  function deletePaathLog(paathId, paathLogId) {
    Paaths.update(
      {},
      { $pull: { logs: { _id: paathLogId } } });
  }

  function savePaathLog(paathId, paathLog) {
    if (paathLog._id) {
      return Paaths.update(
        { _id: paathId, "logs._id": paathLog._id },
        { $set: { "logs.$": paathLog } });
    }
    else {
      var newId = new Mongo.ObjectID;
      paathLog._id = newId._str;
      return Paaths.update(paathId, { $push: { logs: paathLog } });
    }
  }
})();