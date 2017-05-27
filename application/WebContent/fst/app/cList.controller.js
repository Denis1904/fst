/*
 * Created by Denis on 16.04.2017.
 */

(function () {
	"use strict";

	sap.ui.controller("fst.app.cList", {
		onInit: function () {
			oRouter.attachRouteMatchedWithData("cList", () => {
				this.loadContract();
			});
		},

		loadContract: function () {
			Connectivity.getContracts().then(aResponse => {
				this.getView().getModel().setData(aResponse);
			});
		},

		handleBackBtnPress: function () {
			oRouter.navTo("home");
		},

		addNewButtonPress: function () {
			oRouter.navTo("cEdit");
		},

		editButtonPress: function () {
			oRouter.navTo("cEdit", this.getSelectedContractObject(this).id);
		},

		handleDeletePress: function () {
			const oContractObject = this.getSelectedContractObject(this);
			Connectivity.deleteContract(oContractObject.id).then(oResp => {
				if (oResp) {
					this.loadContract();
				} else {
					sap.m.MessageToast.show(oBundle.getText("contract.notDelete"));
				}
			});
		},

		getSelectedContractObject: function (oController) {
			const oView = oController.getView();
			const oSelection = oView.oTable.getSelectedItem();
			return oSelection.getBindingContext().getObject();
		},

		checkEnabledButtons: function () {
			const oView = this.getView();
			const oContractObject = this.getSelectedContractObject(this);

			oView.oBtnChangeStatus.setVisible(!!oContractObject);
			[oView.oBtnEdit, oView.oBtnDelete].forEach(e => {
				e.setVisible(!!oContractObject && oContractObject.status === 1);
			});

		},

		handleStatusChange: function (oEvent) {
			const oBtn = oEvent.getSource();
			const oContractObject = this.getSelectedContractObject(this);

			if (oContractObject) {
				Connectivity.getAllowedStatus(oContractObject.id).then(e => {
					this.getView().oStatusPopover.openBy(oBtn)
						.setModel(new sap.ui.model.json.JSONModel(e));
				});
			}

		},

		handleNewStatusSelected: function (oEvent) {
			const oList = oEvent.getSource();
			const sNewStatus = oList.getSelectedItem().getDescription();
			const oContractObject = this.getSelectedContractObject(this);

			oList.removeSelections();
			oList.getParent().close(); // close popover

			Connectivity.changeContractStatus(oContractObject.id, sNewStatus).then(aReturn => {

				if (!_.isEmpty(aReturn)) {
					jQuery.sap.require("fst.util.messagePopoverItemTemplate");
					const oMP = new sap.m.MessagePopover({
						items: {
							path: "/",
							template: fst.util.MessagePopoverItemTemplate
						}
					});
					oMP.setModel(new sap.ui.model.json.JSONModel(aReturn));
					oMP.openBy(this.getView().oBtnChangeStatus);
				}
				else {
					this.getView().oTable.removeSelections();
					this.loadContract();
				}
			});
		}

	});
})();

