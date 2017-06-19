(function() {
	"use strict";
	
	const Queries = {};
	
	Queries.getDate = function() {
		const oDate = new Date();
		
		const sMonth = oDate.getMonth() + 1;
		return oDate.getFullYear() + "-" + sMonth + "-" + oDate.getDate();
	};
	
	Queries.getTest = function() {
		return db.queryBuilder().select("id", "name").from("test").execute();
	};
	
	Queries.login = function(sUser, sHash) {
		return new Promise((fnResolve, fnReject) => {
			db.queryBuilder().select("u.id", "u.firstname", "u.lastname", "u.role")
				.from("person as u")
				.where("u.uid = :uid")
				.andWhere("u.passwd = :hash")
				.setParameter(":uid", sUser)
				.setParameter(":hash", sHash)
				.execute()
				.then(aUser => {
					if (aUser.rows.length === 1) {
						fnResolve(aUser.rows[0]);
					} else {
						fnReject();
					}
					
				});
		});
	};
	
	Queries.getUser = function(sUser) {
		return new Promise((fnResolve, fnReject) => {
			db.queryBuilder().select("u.id", "u.firstname", "u.lastname", "u.role")
				.from("person as u")
				.where("u.uid = :uid")
				.setParameter(":uid", sUser)
				.execute()
				.then(aUser => {
					if (aUser.rows.length === 1) {
						fnResolve(aUser.rows[0]);
					} else {
						fnReject();
					}
					
				});
		});
	};
	
	Queries.getVendor = function() {
		return db.queryBuilder()
			.select(
				"id",
				"name"
			)
			.from("vendor")
			.execute();
	};
	
	Queries.deleteContract = function(sContractId) {
		return db.queryBuilder()
			.delete("contract")
				.where("contract.id = :id")
				.setParameter(":id", sContractId)
			.execute();
	};
	
	Queries.getContract = function(sContractId) {
		return new Promise((fnResolve, fnReject) => {
			if (!sContractId) {
				fnReject();
			}
			
			const fnFormatDate = function(oObj) {
				if (typeof oObj === "object") {
					return oObj.toJSON().substring(0, 10);
				}
				else {
					return "";
				}
			};
			
			db.queryBuilder().select(
				"contract.id",
				"contract.title",
				"contract.validFrom",
				"contract.validTo",
				"contract.status",
				"contract.vendor",
				"vendorName.name as vendor_txt",
				"contract.createdon",
				"contract.changedon",
				"contract.releasedon",
				"contractstatus.value as contractStatus",
				"contract.createdby",
				"createdBy.firstname as createdFirstname",
				"createdBy.lastname as createdLastname",
				"contract.changedby",
				"changedBy.firstname as changedFirstname",
				"changedBy.lastname as changedLastname",
				"contract.releasedby",
				"releasedBy.firstname as releasedFirstname",
				"releasedBy.lastname as releasedLastname",
				"contract.payguarantee",
				"contract.shippagreement",
				"contract.payagreement",
				"shippagreement.name as shippagreement_txt",
				"payagreement.name as payagreement_txt",
				"vendor.name as vendorName")
				.from("contract")
				.leftJoin("contract", "vendor", "vendorName", "contract.vendor = vendorName.id")
				.leftJoin("contract", "contractstatus", "contractstatus", "contract.status = contractstatus.id")
				.leftJoin("contract", "person", "createdBy", "contract.createdby = createdBy.id")
				.leftJoin("contract", "person", "changedBy", "contract.changedby = changedBy.id")
				.leftJoin("contract", "person", "releasedBy", "contract.releasedby = releasedBy.id")
				.leftJoin("contract", "shippagreement", "shippagreement", "contract.shippagreement = shippagreement.id")
				.leftJoin("contract", "payagreement", "payagreement", "contract.payagreement = payagreement.id")
				.leftJoin("contract", "vendor", "vendor", "contract.vendor = vendor.id")
				.where("contract.id = :contractId")
				.setParameter(":contractId", sContractId)
				.execute()
				.then(oContract => {
					
					oContract.rows[0].validFrom = fnFormatDate(oContract.rows[0].validFrom);
					oContract.rows[0].validTo = fnFormatDate(oContract.rows[0].validTo);
					oContract.rows[0].changedon = fnFormatDate(oContract.rows[0].changedon);
					oContract.rows[0].createdon = fnFormatDate(oContract.rows[0].createdon);
					
					oContract.rows[0].payguarantee = oContract.rows[0].payguarantee === "1";
					
					fnResolve(oContract.rows[0]);
				});
			
		});
		
	};
	
	Queries.getContracts = function() {
		return db.queryBuilder()
			.select(
				"contract.id",
				"contract.status",
				"contract.title",
				"contract.validFrom",
				"contract.validTo",
				"contractstatus.value as contractStatus",
				"createdBy.firstname as createdFirstname",
				"createdBy.lastname as createdLastname",
				"releasedBy.firstname as releasedFirstname",
				"releasedBy.lastname as releasedLastname",
				"contract.payguarantee",
				"contract.shippagreement",
				"contract.payagreement",
				"shippagreement.name as shippagreement_txt",
				"payagreement.name as payagreement_txt",
				"vendor.name as vendorName")
			.from("contract")
			.leftJoin("contract", "contractstatus", "contractstatus", "contract.status = contractstatus.id")
			.leftJoin("contract", "person", "createdBy", "contract.createdby = createdBy.id")
			.leftJoin("contract", "person", "releasedBy", "contract.releasedby = releasedBy.id")
			.leftJoin("contract", "shippagreement", "shippagreement", "contract.shippagreement = shippagreement.id")
			.leftJoin("contract", "payagreement", "payagreement", "contract.payagreement = payagreement.id")
			.leftJoin("contract", "vendor", "vendor", "contract.vendor = vendor.id")
			.execute();
	};
	
	Queries.addContract = function(oContract) {
		
		
		return db.queryBuilder()
			.insert("contract")
			.setValue("title", ":title")
			.setValue("status", ":status")
			.setValue("validFrom", ":validFrom")
			.setValue("validTo", ":validTo")
			.setValue("payagreement", ":payagreement")
			.setValue("shippagreement", ":shippagreement")
			.setValue("payguarantee", ":payguarantee")
			.setValue("createdby", ":createdby")
			.setValue("releasedby", ":releasedby")
			.setValue("createdon", ":createdon")
			.setValue("changedby", ":changedby")
			.setValue("changedon", ":changedon")
			.setValue("vendor", ":vendor")
			.setParameter(":title", oContract.title)
			.setParameter(":status", 1)
			.setParameter(":vendor", oContract.vendor)
			.setParameter(":validFrom", oContract.validFrom)
			.setParameter(":validTo", oContract.validTo)
			.setParameter(":payagreement", oContract.payagreement)
			.setParameter(":shippagreement", oContract.shippagreement)
			.setParameter(":payguarantee", oContract.payguarantee)
			.setParameter(":createdby", oContract.createdBy)
			.setParameter(":createdon", this.getDate())
			.setParameter(":releasedby", oContract.releasedBy)
			.setParameter(":changedby", uid)
			.setParameter(":changedon", this.getDate())
			.execute();
		
	};
	
	Queries.updateContract = function(oContract) {
		return db.queryBuilder()
			.update("contract")
			.set("title", ":title")
			.set("status", ":status")
			.set("validFrom", ":validFrom")
			.set("validTo", ":validTo")
			.set("vendor", ":vendor")
			.set("payagreement", ":payagreement")
			.set("shippagreement", ":shippagreement")
			.set("payguarantee", ":payguarantee")
			.set("createdby", ":createdby")
			.set("releasedby", ":releasedby")
			.set("changedby", ":changedby")
			.set("changedon", ":changedon")
			.where("contract.id = :contractId")
			.setParameter(":title", oContract.title)
			.setParameter(":vendor", oContract.vendor)
			.setParameter(":status", oContract.status)
			.setParameter(":validFrom", oContract.validFrom)
			.setParameter(":validTo", oContract.validTo)
			.setParameter(":payagreement", oContract.payagreement)
			.setParameter(":shippagreement", oContract.shippagreement)
			.setParameter(":payguarantee", oContract.payguarantee)
			.setParameter(":createdby", oContract.createdBy)
			.setParameter(":releasedby", oContract.releasedBy)
			.setParameter(":changedby", uid)
			.setParameter(":changedon", this.getDate())
			.setParameter(":contractId", oContract.id)
			.execute();
	};
	
	Queries.getPayAgreements = function() {
		return db.queryBuilder()
			.select(
				"id",
				"name")
			.from("payagreement")
			.execute();
	};
	
	Queries.getShipAgreements = function() {
		return db.queryBuilder()
			.select(
				"id",
				"name")
			.from("shippagreement")
			.execute();
	}
	
	module.exports = Queries;
})();


