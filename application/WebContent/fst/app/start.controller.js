(function () {
	"use strict";

	sap.ui.controller("fst.app.start", {
		onInit: function () {

		},
		handleButtonPress: function () {
			oRouter.navTo("test");
		}
	});
})();