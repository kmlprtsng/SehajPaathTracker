angular
    .module("sehajPaathTracker")
    .filter("nameById", nameByIdFilter);
    
function nameByIdFilter(){
    return function(userId){
        if (!userId) return;
        
        var loggedInUserId = Meteor.userId();
        
        if(userId === loggedInUserId){
            return "You";
        }
        
        var user = Meteor.users.findOne(userId);
        
        var hasName = user && user.profile && user.profile.name;
        
        return hasName ? user.profile.name : user.emails[0].address;
    };
}