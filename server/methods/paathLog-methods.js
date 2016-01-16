(function () {
    Meteor.methods({
        deletePaathLog: deletePaathLog,
        savePaathLog: savePaathLog
    });

    function deletePaathLog(paathLogId) {
        Meteor.call("validateUser");
        return PaathLogs.remove({_id: paathLogId});
    }

    function savePaathLog(paathLogId, paathLog) {
        Meteor.call("validateUser");
        
        //TODO-KC validate paathLog paathId on payload matches the paath Id in db.
        
        paathLog.updatedDate = new Date();

        if (paathLogId) {
            var paathLogFromDb = PaathLogs.findOne(paathLogId);
            
            
            if(paathLogFromDb.userId !== this.userId){
                throw new Meteor.Error('not-authorised',
                    "Cannot update another user's log ");
            }
            
            udpatePaathLog(paathLogId, paathLog)
        }
        else {            
            paathLog.userId = this.userId;
            paathLog.createdDate = new Date();
            PaathLogs.insert(paathLog);
        }
    }

    function udpatePaathLog(paathLogId, paathLog) {
        return PaathLogs.update(
            { _id: paathLogId },
            { $set: { 
                    startAng: paathLog.startAng,
                    finishAng: paathLog.finishAng,
                    nextPankti: paathLog.nextPankti,
                    status: paathLog.status,
                    updatedDate: paathLog.updatedDate
                } 
            });
    }
})();