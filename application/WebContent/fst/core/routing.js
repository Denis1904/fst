sap.ui.define([], function () {
	"use strict";

	jQuery.sap.declare("fst.core.Routing");

	fst.core.Routing = {

		routes: {
			"home": {
				pattern: "",
				target: "home"
			},
			"test": {
				pattern: "test",
				target: "test",
				parent: "home"
			},
			"cEdit": {
				pattern: "cEdit",
				target: "cEdit",
				parent: "home"
			}
		},

		targets: {
			"home": {
				viewName: "fst.app.start",
				viewLevel: 0
			},
			"test": {
				viewName: "fst.app.test",
				viewLevel: 1
			},
			"cEdit": {
				viewName: "fst.app.cEdit",
				viewLevel: 1
			}
		}
	};

	return fst.core.Routing;
});