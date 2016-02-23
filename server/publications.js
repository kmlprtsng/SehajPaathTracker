Meteor.publish('users', function () {
    return Meteor.users.find({}, { fields: { profile: 1, emails: 1 } });
});

Meteor.publishComposite('paaths', function () {
    if (!this.userId) {
        return this.ready();
    }
    
    return {
        find: function () {
            return Paaths.find({ 'users': this.userId });
        },
        children: [
            {
                find: function (paath) {
                    return PaathLogs.find({ paathId: paath._id });
                }
            }
        ]
    };
});