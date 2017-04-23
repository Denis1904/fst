/*
 * Created by Denis on 22.04.2017.
 */
(function() {
	"use strict";

	let sRoute = "/contracts";

	app.get(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route " + sRoute + " Mode: GET");
		res.set("Content-Type", "application/javascript");

		queries.getContracts().then(oResp => {
				res.send(oResp);
			}
		);

	});

	sRoute = "/addContract";

	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route " + sRoute + " Mode: POST");
		res.set("Content-Type", "application/javascript");

		queries.getContracts().then(oResp => {
				res.send(oResp);
			}
		);

	});

})();
