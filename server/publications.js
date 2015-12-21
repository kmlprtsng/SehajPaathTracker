Meteor.publish('users', function () {
  return Meteor.users.find({}, { fields: { profile: 1, emails: 1 } });
});

Meteor.publish('paaths', function () {
	if (! this.userId) return;
  	
	return Paaths.find({ 'users' : this.userId});
});