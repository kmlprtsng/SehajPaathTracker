(function () {
  Meteor.methods({
    deletePaathLog: deletePaathLog,
    savePaathLog: savePaathLog
  });

  function deletePaathLog(paathId, paathLogId) {
    Paaths.update(
      { _id: paathId },
      { $pull: { logs: { _id: paathLogId } } });
  }

  function savePaathLog(paathId, paathLog) {
    if (paathLog._id) {
      addPaathLog(paathId, paathLog)
    }
    else {
      updatePaathLog(paathId, paathLog);
    }
  }
  
  function addPaathLog(paathId, paathLog){
    return Paaths.update(
        { _id: paathId, "logs._id": paathLog._id },
        { $set: { "logs.$": paathLog } });
  }
  
  function updatePaathLog(paathId, paathLog){
    var newId = new Mongo.ObjectID;
    
    paathLog._id = newId._str;
    return Paaths.update(paathId, { $push: { logs: paathLog } });
  }
  
})();