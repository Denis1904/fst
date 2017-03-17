(function() {
	"use strict";
	
	const sRoute = "/sayHello";
	app.get(sRoute, function(req, res, next) {
		logger.info("Hit route " + sRoute);
		res.set("Content-Type", "application/javascript");
		
		
		queries.getTest().then(oResp => {
				res.send(oResp);
			}
		);
		
		
	});
})();