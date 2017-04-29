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


	}

	module.exports = ContractController;

})();