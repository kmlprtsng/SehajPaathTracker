Meteor.methods({
  createPaath: function (paath) {
    paath.timestamp = new Date();
    paath.logs = [{
				startAng: 1,
				finishAng: 3,
				status: "Done"
			},
      {
				startAng: 3,
				finishAng: 5,
				status: "In progress"
			}];
    
    var paathId = Paaths.insert(paath);
    return paathId;
  },
  
  deletePaath : function(paathId){
    return Paaths.remove({ _id: paathId});
  },
  
  addPaathLog : function(paathId, paathLog){
    // return Paaths.update(paathId, { $push: { logs: paathLog } });
  }
});