(function() {
	"use strict";
	
	const Queries = {};
	
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
			db.queryBuilder().select(
				"contract.id",
				"contract.title",
				"contract.validFrom",
				"contract.validTo",
				"contract.status",
				"contractstatus.value as contractStatus",
				"contract.createdby",
				"createdBy.firstname as createdFirstname",
				"createdBy.lastname as createdLastname",
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
				.leftJoin("contract", "contractstatus", "contractstatus", "contract.status = contractstatus.id")
				.leftJoin("contract", "person", "createdBy", "contract.createdby = createdBy.id")
				.leftJoin("contract", "person", "releasedBy", "contract.releasedby = releasedBy.id")
				.leftJoin("contract", "shippagreement", "shippagreement", "contract.shippagreement = shippagreement.id")
				.leftJoin("contract", "payagreement", "payagreement", "contract.payagreement = payagreement.id")
				.leftJoin("contract", "vendor", "vendor", "contract.vendor = vendor.id")
				.where("contract.id = :contractId")
				.setParameter(":contractId", sContractId)
				.execute()
				.then(oContract => {
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
		
		const oValues = new Map();
		oValues.set("validFrom", ":validFrom");
		oValues.set("validTo", ":validTo");
		oValues.set("payagreement", ":payagreement");
		oValues.set("shippagreement", ":shippagreement");
		oValues.set("payguarantee", ":payguarantee");
		oValues.set("status", ":status");
		oValues.set("createdby", ":createdby");
		oValues.set("releasedby", ":releasedby");
		
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
			.setParameter(":title", oContract.title)
			.setParameter(":status", 1)
			.setParameter(":validFrom", oContract.validFrom)
			.setParameter(":validTo", oContract.validTo)
			.setParameter(":payagreement", oContract.payagreement)
			.setParameter(":shippagreement", oContract.shippagreement)
			.setParameter(":payguarantee", oContract.payguarantee)
			.setParameter(":createdby", oContract.createdBy)
			.setParameter(":releasedby", oContract.releasedBy)
			.execute();
		
	};
	
	Queries.updateContract = function(oContract) {
		return db.queryBuilder()
			.update("contract")
			.set("title", ":title")
			.set("status", ":status")
			.set("validFrom", ":validFrom")
			.set("validTo", ":validTo")
			.set("payagreement", ":payagreement")
			.set("shippagreement", ":shippagreement")
			.set("payguarantee", ":payguarantee")
			.set("createdby", ":createdby")
			.set("releasedby", ":releasedby")
			.where("contract.id = :contractId")
			.setParameter(":title", oContract.title)
			.setParameter(":status", oContract.status)
			.setParameter(":validFrom", oContract.validFrom)
			.setParameter(":validTo", oContract.validTo)
			.setParameter(":payagreement", oContract.payagreement)
			.setParameter(":shippagreement", oContract.shippagreement)
			.setParameter(":payguarantee", oContract.payguarantee)
			.setParameter(":createdby", oContract.createdBy)
			.setParameter(":releasedby", oContract.releasedBy)
			.setParameter(":contractId", oContract.id)
			.execute();
	};
	
	module.exports = Queries;
})();


