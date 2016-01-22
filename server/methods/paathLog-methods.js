(function () {
    Meteor.methods({
        deletePaathLog: deletePaathLog,
        savePaathLog: savePaathLog
    });

    function deletePaathLog(paathLogId) {
        Meteor.call("validateUser");
        //TODO-KC: Delete the tracking data
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
            addTrackingForPaathLog(paathLog, paathLogId);
            updatePaathStats();
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
                removeTrackingForPaathLog(paathLogId);
                addTrackingForPaathLog(paathLog, paathLogId);
                updatePaathStats();
            });
    }
    
    function removeTrackingForPaathLog(paathLogId) {
        PaathTracking.update(
            {
                $or: [{ done: { $in: [paathLogId] } }, { inProgress: { $in: [paathLogId] } }]
            },
            {
                $pull: { done: paathLogId, inProgress: paathLogId }
            },
            { multi: true }
            );
    }
    
    function addTrackingForPaathLog(paathLog, paathLogId) {
        var logInProgress = paathLog.status !== PaathLogStatuses.done.title,
            addToSetCommand;

        if (logInProgress) {
            addToSetCommand = { inProgress: paathLogId };
        }
        else {
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
    }
    
    function updatePaathStats(paathId){
        var totalAngsdone = PaathTracking.count({paathId: paathId, 'done.0': {$exists: true}});
        var totalAngsInProgress = PaathTracking.count({paathId: paathId, 'inProgress.0': {$exists: true}});
        
        var latestAng = PaathTracking
                            .find({paathId: paathId, $or: [{ 'inProgress.0': {$exists: true}}, { 'done.0': {$exists: true}}]})
                            .sort({ang: -1})
                            .limit(1)
                            .fetch();
        
        var nextAvailableAng = 1;
        
        if(latestAng.length > 0){
            nextAvailableAng = latestAng[0].ang + 1;
        }
        
        // - Missing Angs
        //To be quereied
        //Probably need to think about it bit more as some tracking pages may be missing.
        //var missingAngs = {paathId: paathId, $or: [{ 'inProgress': {$exists: false}}, { 'done': {$exists: true}}]};
        
        //psuedo code
        //find all the angs up until the latest ang.
        //find any angs that either don't exist at all or the ones that have in progress or done list size of zero 
        var missingAngs = PaathTracking
                               .find( { paathId: paathId,
                                        $or: [  {'inProgress':{ $exists:false } },
    		                                    {'inProgress.0':{ $exists:false }}
    	                                     ],
                                        $or: [ {'done':{ $exists:false }},
    		                                   {'done.0': { $exists:false }}
    	                                     ]
                                        },
                                        ang: { $lt: nextAvailableAng }
                                      { ang: 1, _id: 0});
                               
                               
                            
        
    }
})();