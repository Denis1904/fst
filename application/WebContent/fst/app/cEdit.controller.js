/*
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.controller("fst.app.cEdit", {
		onInit: function () {
			oRouter.attachRouteMatchedWithData("cEdit", (oEvent) => {
				
				this.getView().getModel().setData({
					title: undefined,
					status_txt: "Neu",
					status: 1
				});
				this.bUpdate = false;
				
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

		handleNewStatusSelected: function (oEvent, oInput) {
			const obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
			oInput.setValue(obj.text);
			oInput.setSelectedKey(obj.status);
			oEvent.getSource().getParent().close();
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
