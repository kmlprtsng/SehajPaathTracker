(function () {
  Meteor.methods({
    createPaath: createPaath,
    deletePaath: deletePaath
  });

  function createPaath(paath) {
    paath.timestamp = new Date();

    var paathId = Paaths.insert(paath);
    return paathId;
  }

  function deletePaath(paathId) {
    return Paaths.remove({ _id: paathId });
  }
})();