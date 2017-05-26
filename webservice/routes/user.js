(function() {
	"use strict";
	
	let sRoute = "/getUser";
	app.post(sRoute, bJson, function(req, res) {
		logger.info("Hit route /getUser Mode: POST");
		res.set("Content-Type", "application/javascript");
		
		const oData = req.body;
		
		queries.getUser(oData.sUser).then(oResp => {
				res.send(oResp);
			}
		).catch(() => {
			res.send({});
		});
		
	});
	
})();