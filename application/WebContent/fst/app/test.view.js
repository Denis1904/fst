(function () {
	"use strict";

	sap.ui.jsview("fst.app.test", {

		getControllerName: function () {
			return "fst.app.test";
		},

		createContent: function (oController) {
			return new sap.m.Page({
				title: "Test",
				content: new sap.m.Button({
					icon: "sap-icon://arrow-left",
					text: "back",
					press: () => {
						oRouter.navTo("home");
					}
				})
			});
		}


	});
})();