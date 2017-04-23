(function() {
	"use strict";
	
	let pool = null;
	try {
		const credentials = require("./credentials.js");
		pool = mysql.createPool(credentials);
	}
	catch (oErr) {
		logger.error("Failed to create database connection");
	}
	
	const fnExecQuery = function(sQuery) {
		
		return new Promise((resolve, reject) => {
			
			db.pool.getConnection((err, connection) => {
				
				if (!err) {
					connection.query(sQuery, function(error, results, fields) {
						if (error) {
							logger.error(error);
							logger.error("select failed");
							reject();
						}
						resolve(results);
						
					});
					connection.release();
				}
				else {
					logger.error("Error");
					logger.error(err);
				}
			});
			
		});
		
	};
	
	module.exports.pool = pool;
	module.exports.execQuery = fnExecQuery;
	
})();