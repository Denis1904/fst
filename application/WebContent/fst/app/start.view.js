(function () {
	"use strict";

	sap.ui.jsview("fst.app.start", {

		getControllerName: function () {
			return "fst.app.start";
		},

		createContent: function (oController) {
			return new sap.m.Page({
				title: "Hallo",
				content: new sap.m.Button({
					icon: "sap-icon://nurse",
					text: "Button",
					press: oController.handleButtonPress
				})
			});
		}


	});
})();