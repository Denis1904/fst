/**
 * Created by Denis on 16.04.2017.
 */

(function () {
	"use strict";

	sap.ui.controller("fst.app.cList", {
		onInit: function () {

		},
		handleBackBtnPress: function () {
			oRouter.navTo("start");
		},
		addNewButtonPress: function () {
			oRouter.navTo("cNew");
		}
	});
})();

