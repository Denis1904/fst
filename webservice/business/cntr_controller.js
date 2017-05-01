(function() {
	"use strict";
	
	class ContractController {
		constructor() {
			this.Contract = require("./cntr");
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
			return queries.updateContract(oContract);
		}
		
		changeContractStatus(sContractId, sNewStatus) {
			return new Promise(fnResolve => {
				
				this.getContract(sContractId).then(oContract => {
					
					const aReturn = [];
					
					if (oContract.getStatus().toString() === sNewStatus) {
						let sDescr = __getText("contract.statusChangeNotAllowed.Descr", { oldStatus: oContract.getStatus(), newStatus: sNewStatus });
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
		
	}
	
	module.exports = ContractController;
	
})();