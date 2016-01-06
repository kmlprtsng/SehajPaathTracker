angular
    .module("sehajPaathTracker")
    .controller("LatestPaathStatusCtrl", LatestPaathStatusController);

function LatestPaathStatusController(){
    var vm = this,
        userLogs = _.where(vm.paathLogs, {userId: vm.user._id});
    
    if(userLogs.length > 0){
        vm.latestLog = findInProgressLatestLog(userLogs);
        
        if(!vm.latestLog){
            vm.latestLog = findLastUpdatedLog(userLogs);
        }
    }
    
    /////////////////
    function findInProgressLatestLog(userLogs){
        return _.find(userLogs, function(log){
            return log.status === "In progress";
        });
    }
    
    function findLastUpdatedLog(userLogs){
        return _.max(userLogs, function(log){
            return log.updatedDate;
        });
    }
}