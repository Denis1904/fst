/**
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.controller("fst.app.cNew", {
		onInit: function () {
			
			Connectivity.getTest().then(
				aResponse => {
					console.log(aResponse);
				}
			);
			
			
		},
		handleBackBtnPress: function () {
			oRouter.navTo("cList");
		},
		saveButtonPress: function () {
			oRouter.navTo("start");
		}
	});
})();
