(function () {
	"use strict";

	class ContractController {
		constructor() {
			this.Contract = require("./cntr");
		}

		addContract(oContract) {
			return new Promise(fnResolve => {
				oContract.createdBy = uid;
				queries.addContract(oContract).then(fnResolve);
			});
		}

		deleteContract(sContractId) {
			return new Promise(fnResolve => {

				this.getContract(sContractId).then(oContract => {

					if (oContract.status === 1) {
						queries.deleteContract(sContractId).then(oReturn => {
							fnResolve(true);
						});
					}
					else {
						fnResolve(false);
					}
				});
			});
		}

		getContract(sContractId) {
			return new Promise(fnResolve => {

				queries.getContract(sContractId).then(oContract => {

					if (oContract) {
						fnResolve(new this.Contract(oContract));
					} else {
						fnResolve(null);
					}
				});

			});


		}

		getAllowedStatus(sContractId) {
			return [
				{
					status: "1",
					text: __getText("contract.status.new")
				},
				{
					status: "2",
					text: __getText("contract.status.inValidation")
				},
				{
					status: "3",
					text: __getText("contract.status.active")
				},
				{
					status: "4",
					text: __getText("contract.status.terminated")
				}
			];
		}

		updateContract(oContract) {
			if (oContract.status === "3") { // contract active
				oContract.releasedBy = uid;
			} else if (["1", "2"].indexOf(oContract.status) !== -1) { // contract new or in approval
				oContract.releasedBy = null;
			}
			
			return queries.updateContract(oContract);
		}

		changeContractStatus(sContractId, sNewStatus) {
			return new Promise(fnResolve => {

				this.getContract(sContractId).then(oContract => {

					const aReturn = [];

					if (oContract.getStatus().toString() === sNewStatus) {
						let sDescr = __getText("contract.statusChangeNotAllowed.Descr", {
							oldStatus: oContract.getStatus(),
							newStatus: sNewStatus
						});
						aReturn.push({
							title: __getText("contract.statusChangeNotAllowed"),
							description: sDescr,
							type: "E"
						});
					}

					oContract.setStatus(sNewStatus);
					this.updateContract(oContract);

					fnResolve(aReturn);

				});
			});
		}

		getPayAgreements() {
			return queries.getPayAgreements();
		}

		getShipAgreements() {
			return queries.getShipAgreements();
		}

	}

	module.exports = ContractController;

})();