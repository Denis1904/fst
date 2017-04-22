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
			"cList": {
				pattern: "cList",
				target: "cList",
				parent: "home"
			},
			"cNew": {
				pattern: "cNew",
				target: "cNew",
				parent: "home"
			},
			"cEdit": {
				pattern: "cEdit",
				target: "cEdit",
				parent: "home"
			},
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
			"cList": {
				viewName: "fst.app.cList",
				viewLevel: 1
			},
			"cNew": {
				viewName: "fst.app.cNew",
				viewLevel: 2
			},
			"cEdit": {
				viewName: "fst.app.cEdit",
				viewLevel: 1
			}
		}
	};

	return fst.core.Routing;
});