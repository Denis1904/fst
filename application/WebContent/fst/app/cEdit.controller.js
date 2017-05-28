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

		handleValueHelp: function (oEvent) {

			const oInput = oEvent.getSource();

			Connectivity.getHelpData("status").then(aResponse => {

				new sap.m.Dialog({
					title: "hallo",
					rightButton: new sap.m.Button({
						text: "Close",
						press: this.exitHelp
					}),
					content: [
						new sap.m.List({
							mode: sap.m.ListMode.SingleSelectMaster,
							selectionChange: function (oEvent) {
								this.handleNewStatusSelected(oEvent, oInput);
							}.bind(this)
						}).bindItems({
							path: "/",
							template: new sap.m.StandardListItem({
								title: "{text}",
								description: "{status}"
							})
						})
					]
				}).setModel(new sap.ui.model.json.JSONModel(aResponse)).open();
			});
		},

		exitHelp: function (oEvent) {
			oEvent.getSource().getParent().close();
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
