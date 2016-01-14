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
        Meteor.call("validateUser");
        
        let paathFromDb = Paaths.findOne({_id: paathId });        
        paathLog.updatedDate = new Date();

        if (paathLog._id) {
            var paathLogFromDb = _.findWhere(paathFromDb.logs, {_id : paathLog._id }); 
            
            if(paathLogFromDb.userId !== this.userId){
                throw new Meteor.Error('not-authorised',
                    "Cannot update another user's log " + paathLog.userId);
            }
            
            udpatePaathLog(paathId, paathLog)
        }
        else {
            if(doesUserHasOngoingPaath(paathFromDb.logs, this.userId)){
                throw new Meteor.Error('already-ongoing-paath',
                    "User already has ongoing paath");
            }
            
            paathLog.userId = this.userId;
            paathLog.createdDate = new Date();
            addPaathLog(paathId, paathLog);
        }
    }

    function udpatePaathLog(paathId, paathLog) {
        //get previous start and finish angs and add and remove angs as necessary.
        //also remove all the old angs and add the new ones.
        // var oldPaathLog = Paaths.findOne({_id: paathId, "logs._id": paathLog._id}, {});

        //$pull: {"tracking.angsDone" : generateTrackingData(paathLog.startAng, paathLog.finishAng)},
        //$pushAll: {"tracking.angsDone" : generateTrackingData(paathLog.startAng, paathLog.finishAng)},
        return Paaths.update(
            { _id: paathId, "logs._id": paathLog._id },
            { $set: { 
                    "logs.$.startAng": paathLog.startAng,
                    "logs.$.finishAng": paathLog.finishAng,
                    "logs.$.nextPankti": paathLog.nextPankti,
                    "logs.$.status": paathLog.status,
                    "logs.$.updatedDate": paathLog.updatedDate
                } 
            });
    }

    function addPaathLog(paathId, paathLog) {
        var newId = new Mongo.ObjectID;

        paathLog._id = newId._str;

        var trackingData = generateTrackingData(paathLog.startAng, paathLog.finishAng);

        return Paaths.update(paathId,
            {
                $pushAll: { "tracking.angsDone": generateTrackingData(paathLog.startAng, paathLog.finishAng) },
                $push: { logs: paathLog }
            }
            );
    }

    //////////////// HELPERS
    function doesUserHasOngoingPaath(paathLogs, loggedInUserId){
        var userLogs = _.where(paathLogs, {userId: loggedInUserId});
        var ongoingLog = _.find(userLogs, function(log){
            return log.status !== PaathLogStatuses.done.title;  
        });
        
        return !!ongoingLog;
    }
    
    function generateTrackingData(newStartAng, newEndAng) {
        if (!newEndAng) {
            return [newStartAng];
        }

        var trackingData = [];

        for (var i = newStartAng; i <= newEndAng; i++) {
            trackingData.push(i);
        }

        return trackingData;
    }
})();