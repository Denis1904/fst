(function() {
	"use strict";
	
	/**
	 * 	Nodetrine DBAL
	 * 	Database abstraction layer
	 * 	@see Documentation: http://nodetrine.github.io/dbal/latest/index.html
	 * 	@see Repository: https://github.com/nodetrine/dbal
	 */
	
	const dbal = require("nodetrine-dbal");
	const DriverManager = dbal.DriverManager;
	
	const credentials = require("./credentials.js");
	const connection = DriverManager.getConnection(credentials);
	
	const fnGetConnection = function() {
		return DriverManager.getConnection(credentials);
	};
	
	const fnGetQB = function() {
		return new dbal.QueryBuilder.QueryBuilder(fnGetConnection());
	};
	
	module.exports.dbal = dbal;
	module.exports.connection = connection;
	module.exports.queryBuilder = fnGetQB;
})();