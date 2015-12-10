Meteor.methods({
  createPaath: function (paath) {
    paath.timestamp = new Date();
    paath.logs = [];
    
    var paathId = Paaths.insert(paath);
    return paathId;
  },
  
  deletePaath : function(paathId){
    return Paaths.remove({ _id: paathId});
  },
  
  addPaathLog : function(paathId, paathLog){
     paathLog._id = new Mongo.ObjectID;
     return Paaths.update(paathId, { $push: { logs: paathLog } });
  }
});