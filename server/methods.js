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
     var newId = new Mongo.ObjectID;
     paathLog._id = newId._str;
     return Paaths.update(paathId, { $push: { logs: paathLog } });
  }
});