(function() {
	"use strict";
	
	app.get("/", function(req, res, next) {
		res.set("Content-Type", "text/html");
		res.send(
			"<html>" +
			"<head>" +
			"<style> body{ font-family: Arial; background-color: #f0f0f0} </style>" +
			"</head>" +
			"<h1>FST API - Welcome</h1> " +
			"<ul><li><a href='/sayHello'>sayHello</a></li></ul>" +
			"</html>"
		);
	});
	
})();