Meteor.startup(function () {
	if (Paaths.find().count() === 0) {
		var paaths = [
			{
				title: "Family Sehaj Paath"
			},
			{
				title: "Friends Sehaj Paath"
			},
			{
				title: "Birthday Sehaj Paath"
			}
		];

		paaths.forEach(paath => {
			Paaths.insert(paath)
		});
	}
});