Meteor.methods({
    validateUser: validateUser
});

function validateUser() {
    if (!this.userId) {
        throw new Meteor.Error('not-logged-in',
            'Must be logged to create a paath.');
    }
}