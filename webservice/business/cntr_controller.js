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
					text: "Neu"
				},
				{
					status: "2",
					text: "In Prüfung"
				},
				{
					status: "3",
					text: "Aktiv"
				},
				{
					status: "4",
					text: "Gekündigt"
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
						let sDescr = "Der Statuswechel vom Status " + oContract.getStatus() + " in den Status " + sNewStatus +
									 " ist nicht erlaubt!";
						aReturn.push({
							title: "Der Statuswechsel ist nicht erlaubt!",
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