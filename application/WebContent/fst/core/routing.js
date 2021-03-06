sap.ui.define([], function () {
	"use strict";

	jQuery.sap.declare("fst.core.Routing");

	fst.core.Routing = {

		routes: {
			"login": {
				pattern: "",
				target: "login"
			},
			"home": {
				pattern: "home",
				target: "home",
				parent: "login"
			},
			"cCompare": {
				pattern: "cCompare",
				target: "cCompare",
				parent: "home"
			},
			"cList": {
				pattern: "cList",
				target: "cList",
				parent: "home"
			},
			"cEdit": {
				pattern: "cEdit",
				target: "cEdit",
				parent: "home"
			},
		},

		targets: {
			"login": {
				viewName: "fst.app.login",
				viewLevel: 0
			},
			"home": {
				viewName: "fst.app.start",
				viewLevel: 1
			},
			"cCompare": {
				viewName: "fst.app.cCompare",
				viewLevel: 2
			},
			"cList": {
				viewName: "fst.app.cList",
				viewLevel: 2
			},
			"cEdit": {
				viewName: "fst.app.cEdit",
				viewLevel: 3
			}
		}
	};

	return fst.core.Routing;
});