/**
 * Created by Denis on 27.05.2017.
 */

(function () {

	"use strict";

	let ContractController = require("../business/cntr_controller");

	let sRoute = "/getHelpData";
	app.post(sRoute, bJson, function (req, res, next) {
		logger.info("Hit route /getHelpData Mode: POST");
		res.set("Content-Type", "application/javascript");
		const oSearchHelp = req.body;

		const oCntr = new ContractController();


		if (oSearchHelp.id == "status") {
			res.send(oCntr.getAllowedStatus("").map(e => {
				return {
					key: e.status,
					value: e.text
				};
			}));
		}
		else if (oSearchHelp.id == "payAgreement") {
			oCntr.getPayAgreements().then(aData => {
				res.send(aData.rows.map(e => {
					return {
						key: e.id,
						value: e.name
					};
				}));
			});
		}
		else if (oSearchHelp.id == "shippAgreement") {
			oCntr.getShipAgreements().then(aData => {
				res.send(aData.rows.map(e => {
					return {
						key: e.id,
						value: e.name
					};
				}));
			});
		}
	});
})
();
