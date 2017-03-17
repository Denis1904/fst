(function() {
	"use strict";
	
	const Queries = {};
	
	Queries.getTest = function() {
		return db.execQuery("select * from test");
	};
	
	
	module.exports = Queries;
})();