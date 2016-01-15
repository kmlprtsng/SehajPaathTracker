(function () {
    Meteor.methods({
        deletePaathLog: deletePaathLog,
        savePaathLog: savePaathLog
    });

    function deletePaathLog(paathLogId) {
        Meteor.call("validateUser");
        return PaathLogs.remove({_id: paathLogId});
    }

    function savePaathLog(paathLog) {
        Meteor.call("validateUser");
        
        paathLog.updatedDate = new Date();

        if (paathLog._id) {
            var paathLogFromDb = PaathLogs.findOne({_id: paathLog._id });
            
            if(paathLogFromDb.userId !== this.userId){
                throw new Meteor.Error('not-authorised',
                    "Cannot update another user's log " + paathLog.userId);
            }
            
            udpatePaathLog(paathLog)
        }
        else {            
            paathLog.userId = this.userId;
            paathLog.createdDate = new Date();
            PaathLogs.insert(paathLog);
        }
    }

    function udpatePaathLog(paathLog) {
        return PaathLogs.update(
            { _id: paathLog._id },
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