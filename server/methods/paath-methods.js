(function () {
  Meteor.methods({
    createPaath: createPaath,
    deletePaath: deletePaath
  });

  function createPaath(paath) {
    paath.timestamp = new Date();
    paath.logs = [];
    paath.tracking = [];

    var paathId = Paaths.insert(paath);
    return paathId;
  }

  function deletePaath(paathId) {
    return Paaths.remove({ _id: paathId });
  }
})();