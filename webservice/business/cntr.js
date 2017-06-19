(function() {
	"use strict";
	
	class Contract {
		constructor(oContract) {
			
			let ContractController = require("../business/cntr_controller");
			
			if (oContract) {
				
				const cntr_controller = new ContractController();
				const oStatusObj = cntr_controller.getAllowedStatus().filter(e => e.status === _.get(oContract, "status").toString())[0];
				this.vendor = _.get(oContract, "vendor");
				this.vendor_txt = _.get(oContract, "vendor_txt");
				this.validFrom = _.get(oContract, "validFrom");
				this.validTo = _.get(oContract, "validTo");
				this.title = _.get(oContract, "title");
				this.status = _.get(oContract, "status");
				this.status_txt = _.get(oStatusObj, "text");
				this.id = _.get(oContract, "id");
				this.payguarantee = _.get(oContract, "payguarantee");
				this.shippagreement = _.get(oContract, "shippagreement");
				this.payagreement = _.get(oContract, "payagreement");
				this.shippagreement_txt = _.get(oContract, "shippagreement_txt");
				this.payagreement_txt = _.get(oContract, "payagreement_txt");
				this.createdBy = _.get(oContract, "createdby");
				this.releasedBy = _.get(oContract, "releasedby");
				this.changedBy = _.get(oContract, "changedby");
				this.createdOn = _.get(oContract, "createdon");
				this.releasedOn = _.get(oContract, "releasedon");
				this.changedOn = _.get(oContract, "changedon");
				this.changedFirstname = _.get(oContract, "changedFirstname");
				this.changedLastname = _.get(oContract, "changedLastname");
				this.createdFirstname = _.get(oContract, "createdFirstname");
				this.createdLastname = _.get(oContract, "createdLastname");
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