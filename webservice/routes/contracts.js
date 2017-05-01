/*
 * Created by Denis on 22.04.2017.
 */
(function() {
	"use strict";
	
	let ContractController = require("../business/cntr_controller");
	
	let sRoute = "/contracts";
	app.get(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route /contracts Mode: GET");
		res.set("Content-Type", "application/javascript");
		
		queries.getContracts().then(oResp => {
				res.send(oResp);
			}
		);
		
	});
	
	sRoute = "/getAllowedStatus";
	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route /getAllowedStatus Mode: POST");
		res.set("Content-Type", "application/javascript");
		
		const oContract = req.body;
		const oCntr = new ContractController();
		res.send(oCntr.getAllowedStatus(oContract.id));
	});
	
	sRoute = "/changeContractStatus";
	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route /changeContractStatus Mode: POST");
		res.set("Content-Type", "application/javascript");
		
		const oContract = req.body;
		const oCntr = new ContractController();
		oCntr.changeContractStatus(oContract.id, oContract.status).then(aReturn => res.send(aReturn));
		
	});
	
	sRoute = "/addContract";
	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route /addContract Mode: POST");
		res.set("Content-Type", "application/javascript");
		const oContract = req.body;
		
		queries.addContracts(oContract).then(oResp => {
				res.send(oResp);
			}
		);
		
	});
	
})();
