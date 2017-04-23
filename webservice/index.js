/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *	Definition of global variables
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const express = require("express");
const argv = require("optimist").argv;

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

const bParser = require("body-parser");
/** @global */
bJson = bParser.json();
app.use(bParser.urlencoded({ extended: true }));

/** @global */
db = require("./db/connection");

/** @global */
queries = require("./db/queries");

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *	Global access control header
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.use((req, res, next) => {
	"use strict";
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *	Definition of routes
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
require("./routes/index");
require("./routes/sayHello");
require("./routes/404"); // should be always at the end of routes require block


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *	Fire up server
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.set("port", argv.port || 3000);
const server = app.listen(app.get("port"), function() {
	"use strict";
	
	logger.info("Server listening on port " + server.address().port);
	
});
