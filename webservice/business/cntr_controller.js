(function () {
	"use strict";

	class ContractController {
		constructor() {
			this.Contract = require("./cntr");
		}

		getContract(sContractId) {
			const oContract = queries.getContract(sContractId);
			if (oContract) {
				return new this.Contract(oContract);
			} else {
				return null;
			}
		}
		
		getAllowedStatus(sContractId) {
			return [
				{
					status: "1",
					text: "Neu"
				},
				{
					status: "2",
					text: "In Vorbereitung"
				}
			];
		}


	}

	module.exports = ContractController;

})();