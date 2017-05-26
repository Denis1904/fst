(function () {
	"use strict";

	sap.ui.jsview("fst.app.start", {

		getControllerName: function () {
			return "fst.app.start";
		},

		createContent: function (oController) {

			const oTileContainer = new sap.m.TileContainer({
				height: "50%",
				tiles: [
					new sap.m.StandardTile({
						icon: "sap-icon://customer-and-supplier",
						title: oBundle.getText("contract.maintenance"),
						press: oController.handleContractMaintenancePress
					}), new sap.m.StandardTile({
						icon: "sap-icon://request",
						title: oBundle.getText("contract.compare"),
						press: oController.handleCompareContractPress
					})]
			});

			const oPage = new sap.m.Page({
				enableScrolling: false,
				content: [oTileContainer],
				customHeader: new sap.m.OverflowToolbar({
					content: [
						new sap.m.ToolbarSpacer(),
						new sap.m.ToolbarSpacer(),
						new sap.m.Label({
							text: oBundle.getText("std.app.title")
						}),
						new sap.m.ToolbarSpacer(),
						new sap.m.Button({
							icon: "sap-icon://log",
							text: "{user>/firstname} {user>/lastname} " + oBundle.getText("std.logout"),
							press: oController.handleLogout.bind(oController)
						})
					]
				})
			});

			return oPage;
		}
	});
})();