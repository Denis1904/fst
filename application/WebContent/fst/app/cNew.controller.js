/*
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

		saveButtonPress: function () {

			const oContract = this.getView().getModel().getData();

			Connectivity.addContract(oContract).then(
				aResponse => {
					console.log(aResponse);

				}
			);
		}

	});
})();
