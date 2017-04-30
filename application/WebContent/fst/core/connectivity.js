(function() {
	"use strict";
	
	jQuery.sap.declare("fst.core.connectivity");
	
	fst.core.connectivity = function() {};
	
	fst.core.connectivity.prototype.__oModel = undefined;
	
	fst.core.connectivity.prototype.__serviceUrl = "http://localhost:3000/";
	
	fst.core.connectivity.prototype.__loadData = function(sUrl, sLoadingText, oOptions) {
		const sType = _.get(oOptions, "sType", "GET");
		const oBody = _.get(oOptions, "oBody", null);
		return new Promise((fnResolve, fnReject) => {
			this.__BusyDialog = new sap.m.BusyDialog({
				title: oBundle.getText("std.isLoading"),
				text: sLoadingText || oBundle.getText("std.pleaseWait")
			});
			this.__oModel = new sap.ui.model.json.JSONModel();
			this.__oModel.attachRequestSent(() => {
				this.__BusyDialog.open();
			});
			this.__oModel.attachRequestCompleted(null, (oRequestDetails) => {
				if (oRequestDetails.getParameter("success")) {
					this.__BusyDialog.close();
					fnResolve(this.__oModel.getData());
				}
			});
			this.__oModel.attachRequestFailed(null, (oData) => {
				this.__BusyDialog.close();
				fnReject(oData);
			});
			sUrl = _.join([this.__serviceUrl, sUrl], "");
			this.__oModel.loadData(sUrl, oBody, false, sType, false, false);
		});
	};
	
	fst.core.connectivity.prototype.getContracts = function() {
		return this.__loadData("contracts", oBundle.getText("contract.loading.multiple"));
	};
	
	fst.core.connectivity.prototype.addContract = function(oContract) {
		return this.__loadData("addContract", oBundle.getText("contract.saving"), {
			sType: "POST",
			oBody: oContract
		});
	};
	
	
})();