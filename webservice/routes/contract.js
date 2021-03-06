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
				res.send(oResp.rows);
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
	
	sRoute = "/deleteContract";
	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route /deleteContract Mode: POST");
		res.set("Content-Type", "application/javascript");
		const oContract = req.body;
		
		const oCntr = new ContractController();
		oCntr.deleteContract(oContract.id).then(oResp => {
				res.send(oResp);
		});
	});
	
	sRoute = "/addContract";
	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route /addContract Mode: POST");
		res.set("Content-Type", "application/javascript");
		const oContract = req.body;
		
		const oCntr = new ContractController();
		oCntr.addContract(oContract).then(oResp => {
				res.send(oResp);
			}
		);
		
	});

	sRoute = "/editContract";
	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route /editContract Mode: POST");
		res.set("Content-Type", "application/javascript");
		const oContract = req.body;

		const oCntr = new ContractController();
		oCntr.updateContract(oContract).then(oResp => {
				res.send(oResp);
			}
		);

	});

	sRoute = "/getContract";
	app.post(sRoute, bJson, function(req, res, next) {
		logger.info("Hit route /getContract Mode: POST");
		res.set("Content-Type", "application/javascript");
		const oContract = req.body;

		const oCntr = new ContractController();
		oCntr.getContract(oContract.id).then(oResp => {
				res.send(oResp);
			}
		);

	});
	
})();
