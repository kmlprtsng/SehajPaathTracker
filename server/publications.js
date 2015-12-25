Meteor.publish('users', function () {
    return Meteor.users.find({}, { fields: { profile: 1, emails: 1 } });
});

Meteor.publish('paaths', function () {
    if (!this.userId) return;

    return Paaths.find({ 'users': this.userId });
});

// Meteor.publishComposite('paaths', function () {
//     //validateUser();
//     if (!this.userId) return;
    
//     return {
//         find: function () {
//             return Paaths.find({ 'users': this.userId });
//         },
//         children: [
//             {
//                 find: function (paath) {
//                     return Meteor.users.find({ _id: { $in: paath.users } });
//                 }
//             }
//         ]
//     };
// });