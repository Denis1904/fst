(function () {
	"use strict";

	const Queries = {};

	Queries.getTest = function () {
		return db.execQuery("select * from test");
	};

	Queries.getContracts = function () {
		return db.execQuery("select contract.id, contract.validFrom,contract.validTo," +
			"contract.payguarantee, contractstatus.value as contractStatus," +
			"createdby.lastname as createdLastname,releasedby.lastname as releasedLastname," +
			"shippagreement.name as shippagreement, payagreement.name as payagreement " +
			"from contract " +
			"left outer join contractstatus on contract.status = contractstatus.id " +
			"left outer join person as createdby on contract.createdby = createdby.id " +
			"left outer	join person as releasedby on contract.releasedby = releasedby.id " +
			"left outer	join shippagreement	on 	contract.shippagreement = shippagreement.id " +
			"left outer	join payagreement on contract.payagreement = payagreement.id");
	};

	module.exports = Queries;
})();