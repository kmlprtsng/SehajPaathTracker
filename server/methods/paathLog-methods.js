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
            
            addPaathLog(paathLog);
        }
    }
    
    function addPaathLog(paathLog){
        PaathLogs.insert(paathLog, function (err, paathLogId) {
            var logInProgress = paathLog.status !== PaathLogStatuses.done.title,
                addToSetCommand;

            if (logInProgress) {
                addToSetCommand = { inProgress: paathLogId };
            }
            else{
                addToSetCommand = { done: paathLogId };
            }

            for (var i = paathLog.startAng; i <= paathLog.finishAng; i++) {
                PaathTracking.update(
                    {
                        ang: i,
                        paathId: paathLog.paathId
                    },
                    {
                        $addToSet: addToSetCommand
                    },
                    { upsert: true }
                );
            }
        });
    }

    function udpatePaathLog(paathLogId, paathLog, previousPaathLogFromDb) {
        return PaathLogs.update(
            { _id: paathLogId },
            { $set: { 
                    startAng: paathLog.startAng,
                    finishAng: paathLog.finishAng,
                    nextPankti: paathLog.nextPankti,
                    status: paathLog.status,
                    updatedDate: paathLog.updatedDate
                } 
            }, function(){
                
                var logInProgress = paathLog.status !== PaathLogStatuses.done.title,
                    addToSetCommand;
                    
                if (logInProgress) {
                    addToSetCommand = { inProgress: paathLogId };
                }
                else {
                    addToSetCommand = { done: paathLogId };
                }

                //next: work on adding the paathLogId to set
                PaathTracking.update(
                    {
                        $or: [ {done: { $in: [paathLogId] } }, {inProgress: { $in: [paathLogId] } }]
                    },
                    {
                        $pull: { done: paathLogId }
                        //$addToSet: addToSetCommand
                    },
                    { multi: true }
                );
            });
    }
})();