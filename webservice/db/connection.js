(function() {
	"use strict";
	
	/**
	 *    Nodetrine DBAL
	 *    Database abstraction layer
	 *    @see Documentation: http://nodetrine.github.io/dbal/latest/index.html
	 *    @see Repository: https://github.com/nodetrine/dbal
	 */
	
	const dbal = require("nodetrine-dbal");
	const DriverManager = dbal.DriverManager;
	
	const credentials = require("./credentials.js");
	const connection = DriverManager.getConnection(credentials);
	
	const fnGetConnection = function() {
		return DriverManager.getConnection(credentials);
	};
	
	const fnGetQB = function() {
		const oQueryBuilder = new dbal.QueryBuilder.QueryBuilder(fnGetConnection());
		/*
		 * 	Overwriting the execute function here to automatically close the used connection after the db operation was executed
		 */
		const fnExec = oQueryBuilder.execute;
		oQueryBuilder.execute = function(bAutoRelease) {
			if (!_.isBoolean(bAutoRelease)) {
				bAutoRelease = true; // if undefined set to true
			}
			return new Promise((fnResolve, fnReject) => {
				fnExec.call(this).then(oQueryResult => {
					if (bAutoRelease) {
						this.connection.release();
						logger.info("Connection released");
					}
					fnResolve(oQueryResult);
				}).catch(oErr => {
					fnReject(oErr);
				});
			});
		}.bind(oQueryBuilder);
		return oQueryBuilder;
	};
	
	module.exports.dbal = dbal;
	module.exports.connection = connection;
	module.exports.queryBuilder = fnGetQB;
})();