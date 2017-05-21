(function() {
	"use strict";
	
	const Queries = {};
	
	Queries.getTest = function() {
		return db.queryBuilder().select("id", "name").from("test").execute();
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
			.select("contract.id", "contract.title", "contract.validFrom", "contract.validTo", "contract.payguarantee",
				"contractstatus.value as contractStatus", "createdBy.lastname as createdLastname",
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
	
	Queries.addContracts = function(oContract) {
		
		logger.info("Inhalt: " + oContract.validFrom + "\n " + oContract.validTo);
		
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
			.setValue("validFrom", ":validFrom")
			.setValue("validTo", ":validTo")
			.setValue("payagreement", ":payagreement")
			.setValue("shippagreement", ":shippagreement")
			.setValue("payguarantee", ":payguarantee")
			.setValue("status", ":status")
			.setValue("createdby", ":createdby")
			.setValue("releasedby", ":releasedby")
			.setParameter(":validFrom", oContract.validFrom)
			.setParameter(":validTo", oContract.validTo)
			.setParameter(":payagreement", 1)
			.setParameter(":shippagreement", 1)
			.setParameter(":payguarantee", 1)
			.setParameter(":status", 1)
			.setParameter(":createdby", 1)
			.setParameter(":releasedby", 1)
			.execute();
		
	};
	
	Queries.updateContract = function(oContract) {
		/* TODO implement */
	};
	
	module.exports = Queries;
})();


