(function () {
	"use strict";

	sap.ui.controller("fst.app.start", {
		onInit: function () {

		},
		handleButtonPress: function () {
			if (this.sId === "__tile0") {
				oRouter.navTo("cList");
			} else if (this.sId === "__tile1") {
				oRouter.navTo("test");
			}

		}
	});
})();