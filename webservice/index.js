/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *	Definition of global variables
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const basicAuth = require("basic-auth-connect");
const express = require("express");
const argv = require("optimist").argv;
_ = require("lodash");

/** @global */
mysql = require("mysql");

//noinspection Eslint
/** @global */
logger = require("eazy-logger").Logger({
	prefix: "{blue:[}{magenta:FST_WS}{blue:] }",
	useLevelPrefixes: true
});

/** @global */
app = express();
const i18n = require("i18n");

const bParser = require("body-parser");
/** @global */
bJson = bParser.json();
app.use(bParser.urlencoded({ extended: true }));

/** @global */
db = require("./db/connection");

/** @global */
queries = require("./db/queries");

/** @global */
uid = undefined;
app.use(basicAuth(function(username, password, fn) {
	"use strict";
	logger.info("Check authorization");
	const sha1 = require("sha1");
	queries.login(username, sha1(password)).then(oUser => {
		uid = oUser.id;	// store user id globally
		fn(null, {});
	}).catch(() => {
		fn(new Error("Login error"), null);
	});
	
}));


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *	Default: using 'accept-language' header to guess language settings
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
i18n.configure({
	directory: "./webservice/i18n",
	register: global,
	defaultLocale: "en",
	api: {
		"__": "__getText"
	}
});
app.use(i18n.init);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *	Definition of routes
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
require("./routes/index");
require("./routes/sayHello");
require("./routes/user");
require("./routes/contract");
require("./routes/404"); // should be always at the end of routes require block


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *	Fire up server
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.set("port", argv.port || 3000);
const server = app.listen(app.get("port"), function() {
	"use strict";
	
	logger.info("Server listening on port " + server.address().port);
	
});
