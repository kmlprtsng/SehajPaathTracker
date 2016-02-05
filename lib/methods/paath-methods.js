(function () {
    Meteor.methods({
        addUserToPaath: addUserToPaath,
        createPaath: createPaath,
        deletePaath: deletePaath,
        updatePaathTitle: updatePaathTitle
    });

    function addUserToPaath(paathId, userId) {
        Meteor.call("validateUser");
        
        var countQuery = Paaths.find({_id: paathId, users: userId}).count();
        
        if(countQuery > 0){
            return;
        }
       
        Paaths.update(
            { _id: paathId },
            { $push: { users: userId } }
            );
    }

    function createPaath(paath) {
        Meteor.call("validateUser");

        paath.userIds.push(this.userId);
        paath.userIds = _.uniq(paath.userIds);

        var numUsersFoundWithUserIds = Meteor.users.find({ _id: { $in: paath.userIds } }).count();

        if (numUsersFoundWithUserIds !== paath.userIds.length) {
            throw new Meteor.Error('users-not-found',
                'One or more users with the user ids were not found in the database');
        }

        var paathObj = {
            title: paath.title,
            createdAt: new Date(),
            users: paath.userIds,
            adminId: this.userId,
            nextAvailableAng : 1,
            totalAngsDone : 0,
            totalAngsInProgress : 0,
            missingAngs : []
        };

        var paathId = Paaths.insert(paathObj);
        return paathId;
    }

    function deletePaath(paathId) {
        Meteor.call("validateUser");

        return Paaths.remove({ _id: paathId });
    }

    function updatePaathTitle(paathId, newTitle) {
        Meteor.call("validateUser");

        Paaths.update(
            { _id: paathId },
            { $set: { title: newTitle } });
    }
})();