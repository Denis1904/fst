(function () {
	"use strict";

	sap.ui.jsview("fst.app.start", {

		getControllerName: function () {
			return "fst.app.start";
		},

		createContent: function (oController) {

			var tileContainer = new sap.m.TileContainer({
				height: "50%",
				tiles: [
					new sap.m.StandardTile({
						icon: "sap-icon://customer-and-supplier",
						title: "Vertragspflege",
						press: oController.handleButtonPress
					}), new sap.m.StandardTile({
						icon: "sap-icon://request",
						title: "Vertragsvergleich",
						press: oController.handleButtonPress
					})]
			});

			var page = new sap.m.Page({

				title: "Vendor Management Contract",
				enableScrolling: false,
				content: [tileContainer]

			});

			return page;
		}
	});
})();