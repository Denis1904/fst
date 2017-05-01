/*
 * Created by Denis on 16.04.2017.
 */

(function() {
	"use strict";
	
	sap.ui.controller("fst.app.cList", {
		onInit: function() {
			oRouter.attachRouteMatchedWithData("cList", () => {
				this.loadContracts();
			});
		},
		
		loadContracts: function() {
			Connectivity.getContracts().then(aResponse => {
				this.getView().getModel().setData(aResponse);
			});
		},
		
		handleBackBtnPress: function() {
			oRouter.navTo("home");
		},
		
		addNewButtonPress: function() {
			oRouter.navTo("cNew");
		},
		
		getSelectedContractObject: function(oController) {
			const oView = oController.getView();
			const oSelection = oView.oTable.getSelectedItem();
			return oSelection.getBindingContext().getObject();
		},
		
		checkEnabledButtons: function() {
			const oView = this.getView();
			const oContractObject = this.getSelectedContractObject(this);
			
			[oView.oBtnChangeStatus, oView.oBtnEdit].forEach(e => e.setVisible(!!oContractObject));
			
		},
		
		handleStatusChange: function(oEvent) {
			const oBtn = oEvent.getSource();
			const oContractObject = this.getSelectedContractObject(this);
			
			if (oContractObject) {
				Connectivity.getAllowedStatus(oContractObject.id).then(e => {
					this.getView().oStatusPopover.openBy(oBtn)
						.setModel(new sap.ui.model.json.JSONModel(e));
				});
			}
			
		},
		
		handleNewStatusSelected: function(oEvent) {
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
			});
		}
		
	});
})();

