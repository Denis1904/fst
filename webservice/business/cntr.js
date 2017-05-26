(function() {
	"use strict";
	
	class Contract {
		constructor(oContract) {
			if (oContract) {
				this.validFrom = _.get(oContract, "validFrom");
				this.validTo = _.get(oContract, "validTo");
				this.title = _.get(oContract, "title");
				this.status = _.get(oContract, "status");
				this.id = _.get(oContract, "id");
				this.payguarantee = _.get(oContract, "payguarantee");
				this.shippagreement = _.get(oContract, "shippagreement");
				this.payagreement = _.get(oContract, "payagreement");
				this.shippagreement_txt = _.get(oContract, "shippagreement_txt");
				this.payagreement_txt = _.get(oContract, "payagreement_txt");
				this.createdBy = _.get(oContract, "createdby");
				this.releasedBy = _.get(oContract, "releasedby");
				
			}
			
		}
		
		getTitle() {
			return this.title;
		}
		
		setTitle(sTitle) {
			this.title = sTitle;
		}
		
		setStatus(sStatus) {
			this.status = sStatus;
		}
		
		getStatus() {
			return this.status;
		}
		
		validate() {
			const aReturn = [];
			if (!(this.validFrom && Object.prototype.toString.call(this.validFrom) === "[object Date]")) {
				aReturn.push({
					title: "Gültig von wurde nicht geplfegt.",
					description: "Lorem ipsum dolor",
					type: "E"
				});
			}
			
			return aReturn;
		}
		
	}
	
	module.exports = Contract;
	
})();