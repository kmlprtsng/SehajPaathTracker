Meteor.startup(function () {
	WebApp.connectHandlers.use(function (req, res, next) {
        res.setHeader('access-control-allow-origin', '*');
        return next();
      });
});