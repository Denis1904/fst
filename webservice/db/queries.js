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
			db.queryBuilder().select("contract.id", "contract.title", "contract.validFrom", "contract.validTo", "contract.status",
				"contract.payguarantee", "contractstatus.value as contractStatus", "createdBy.lastname as createdLastname",
				"releasedBy.lastname as releasedLastname",
				"shippagreement.name as shippagreement", "payagreement.name as payagreement")
				.from("contract")
				.leftJoin("contract", "contractstatus", "contractstatus", "contract.status = contractstatus.id")
				.leftJoin("contract", "person", "createdBy", "contract.createdby = createdBy.id")
				.leftJoin("contract", "person", "releasedBy", "contract.releasedby = releasedBy.id")
				.leftJoin("contract", "shippagreement", "shippagreement", "contract.shippagreement = shippagreement.id")
				.leftJoin("contract", "payagreement", "payagreement", "contract.payagreement = payagreement.id")
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
			.select("contract.id", "contract.status", "contract.title", "contract.validFrom", "contract.validTo",
				"contract.payguarantee", "contractstatus.value as contractStatus", "createdBy.lastname as createdLastname",
				"releasedBy.lastname as releasedLastname",
				"shippagreement.name as shippagreement", "payagreement.name as payagreement")
			.from("contract")
			.leftJoin("contract", "contractstatus", "contractstatus", "contract.status = contractstatus.id")
			.leftJoin("contract", "person", "createdBy", "contract.createdby = createdBy.id")
			.leftJoin("contract", "person", "releasedBy", "contract.releasedby = releasedBy.id")
			.leftJoin("contract", "shippagreement", "shippagreement", "contract.shippagreement = shippagreement.id")
			.leftJoin("contract", "payagreement", "payagreement", "contract.payagreement = payagreement.id")
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
				.setParameter(":payguarantee", oContract.paygurantee)
				.setParameter(":createdby", oContract.createdBy)
				.setParameter(":releasedby", oContract.releasedBy)
			.execute();
		
	};
	
	Queries.updateContract = function(oContract) {
		/* TODO implement */
	};
	
	module.exports = Queries;
})();


