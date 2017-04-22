/**
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.controller("fst.app.cNew", {
		onInit: function () {

		},
		handleBackBtnPress: function () {
			oRouter.navTo("cList");
		},
		addNewButtonPress: function () {
			oRouter.navTo("start");
		}
	});
})();
