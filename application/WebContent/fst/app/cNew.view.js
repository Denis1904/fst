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

			return new sap.m.Page({
				showNavButton: true,
				navButtonPress: oController.handleButtonPress,
				title: "Vertrag anlegen",
				enableScrolling: false,
				content: []
				
			});
		}
	});
})();
