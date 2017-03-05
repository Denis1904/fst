(function() {
	"use strict";

	sap.ui.getCore().attachInit(function () {

		sap.ui.localResources("fst");

		const oApp = new sap.m.App("fst.app");

		new sap.m.Shell({
			showLogout: false,
			app: oApp
		}).placeAt("content");

		/**
		 * Router for easy view handling and creation of urls for views
		 */
		jQuery.sap.require("fst.core.Routing");

		window.oRouter = new sap.m.routing.Router(
			/* global fst */
			fst.core.Routing.routes,
			{
				viewType: "JS",
				controlId: "fst.app",
				controlAggregation: "pages"
			},
			null,
			fst.core.Routing.targets
		);

		jQuery.sap.require("sap.ui.thirdparty.hasher");
		hasher.prependHash = "";

		oRouter.initialize();

	});

})();
