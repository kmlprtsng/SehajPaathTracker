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
      udpatePaathLog(paathId, paathLog)
    }
    else {
      addPaathLog(paathId, paathLog);
    }
  }
  
  function udpatePaathLog(paathId, paathLog){
    //get previous start and finish angs and add and remove angs as necessary.
    //also remove all the old angs and add the new ones.
    var oldPaathLog = Paaths.findOne({_id: paathId, "logs._id": paathLog._id}, {});
    
    return Paaths.update(
        { _id: paathId, "logs._id": paathLog._id },
        { 
          $set: { "logs.$": paathLog },
          //$pull: {"tracking.angsDone" : generateTrackingData(paathLog.startAng, paathLog.finishAng)},
          //$pushAll: {"tracking.angsDone" : generateTrackingData(paathLog.startAng, paathLog.finishAng)},
        });
  }
  
  function addPaathLog(paathId, paathLog){
    var newId = new Mongo.ObjectID;
    
    paathLog._id = newId._str;
    
    var trackingData = generateTrackingData(paathLog.startAng, paathLog.finishAng);
    
    return Paaths.update(paathId, 
      { 
        $pushAll: { "tracking.angsDone" : generateTrackingData(paathLog.startAng, paathLog.finishAng)},
        $push: { logs: paathLog }
      }
    );
  }
  
  function generateTrackingData(newStartAng, newEndAng){
     if(!newEndAng){
       return [newStartAng];
     }
     
     var trackingData = [];
     
     for(var i = newStartAng; i <= newEndAng; i++){
       trackingData.push(i);
     }
     
     return trackingData;
  }
})();