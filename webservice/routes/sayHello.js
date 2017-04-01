(function() {
	"use strict";
	
	const sRoute = "/sayHello";
	
	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route " + sRoute + " Mode: POST");
		res.set("Content-Type", "application/javascript");
		
		const sGetParam = req.query.name;
		const oRequestBody = req.body;
		logger.info(JSON.stringify(oRequestBody, null, 2, 2) + sGetParam);
		
		queries.getTest().then(oResp => {
				res.send({ [sGetParam]: oResp });
			}
		);
		
	});
})();