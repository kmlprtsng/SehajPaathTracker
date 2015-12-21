angular
    .module("sehajPaathTracker")
    .filter("name", nameFilter);
    
function nameFilter(){
    return function(user){
        if (!user) return;
        
        var loggedInUser = Meteor.user();
        
        if(user._id === loggedInUser._id){
            return "You";
        }
        
        let hasName = user && user.profile && user.profile.name;
        
        return hasName ? user.profile.name : user.emails[0].address;
    };
}