/*
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.controller("fst.app.cEdit", {
		onInit: function () {
			oRouter.attachRouteMatchedWithData("cEdit", (oEvent) => {
				let sId = oEvent.getParameter("data");
				if (sId) {
					this.bUpdate = true;
					this.loadContract(sId);
				}
			});
		},

		loadContract: function (sId) {
			Connectivity.getContract(sId).then(aResponse => {
				this.getView().getModel().setData(aResponse);
			});
		},

		handleBackBtnPress: function () {
			oRouter.navTo("cList");
		},

		saveButtonPress: function () {

			const oContract = this.getView().getModel().getData();

			if (_.get(this, "bUpdate")) {
				Connectivity.editContract(oContract).then(
					aResponse => {
						console.log(aResponse);

					}
				);
			} else {
				Connectivity.addContract(oContract).then(
					aResponse => {
						console.log(aResponse);

					}
				);
			}
		}

	});
})();
