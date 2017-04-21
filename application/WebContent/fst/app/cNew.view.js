/**
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.jsview("fst.app.cNew", {

		getControllerName: function () {
			return "fst.app.cNew";
		},

		createContent: function (oController) {

			//Back button
			var oBackButton = new sap.m.Button({
				text: "Zurück",
				icon: "sap-icon://arrow-left",
				press: oController.handleButtonPress
			});

			var page = new sap.m.Page({

				title: "Vertrag anlegen",
				enableScrolling: false,
				content: [oBackButton]

			});

			return page;
		}
	});
})();
