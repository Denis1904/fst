(function() {
	"use strict";
	
	sap.ui.getCore().attachInit(function() {
		
		sap.ui.localResources("fst");
		
		jQuery.sap.registerResourcePath("libs", "/fst/libs");
		jQuery.sap.require("libs.lodash");
		
		window.oBundle = new sap.ui.model.resource.ResourceModel({
			// bundleLocale: "EN",
			bundleName: "fst.i18n.i18n"
		}).getResourceBundle();
		
		window.dateFormatter = sap.ui.core.format.DateFormat.getDateTimeInstance({
			pattern: "dd.MM.yyyy" //"yyyy-MM-dd"
		});
		
		const oApp = new sap.m.App("fst.app");
		
		new sap.m.Shell({
			showLogout: false,
			app: oApp
		}).placeAt("content");
		
		jQuery.sap.require("fst.core.connectivity");
		window.Connectivity = new fst.core.connectivity();
		
		/**
		 * Router for easy view handling and creation of urls for views
		 */
		jQuery.sap.require("fst.core.Routing");
		jQuery.sap.require("fst.core.Router");
		
		window.oRouter = new fst.core.Router(
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
