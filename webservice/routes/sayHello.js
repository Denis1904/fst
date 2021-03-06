(function() {
	"use strict";
	
	const sRoute = "/sayHello";
	
	app.post(sRoute, function(req, res, next) {
		res.send(__getText("std.test"));
	});
	
	app.get(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route " + sRoute + " Mode: POST");
		res.set("Content-Type", "application/javascript");
		
		const sGetParam = req.query.name;
		const oRequestBody = req.body;
		logger.info("Body data: " + oRequestBody.hallo);
		logger.info(JSON.stringify(oRequestBody, null, 2, 2) + sGetParam);
		
		queries.getTest().then(oResp => {
				res.send({
					[sGetParam]: oResp,
					"postData": oRequestBody
				});
			}
		);
		
	});
})();