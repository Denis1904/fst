(function() {
	"use strict";
	
	jQuery.sap.declare("fst.core.connectivity");
	
	fst.core.connectivity = function() {};
	
	fst.core.connectivity.prototype.__btoa = undefined;
	
	fst.core.connectivity.prototype.__oModel = undefined;
	
	fst.core.connectivity.prototype.__serviceUrl = "/proxy/";
	
	fst.core.connectivity.prototype.__loadData = function(sUrl, sLoadingText, oOptions) {
		const sType = _.get(oOptions, "sType", "GET");
		const oBody = _.get(oOptions, "oBody", null);
		const sBtoa = _.get(this, "__btoa", sessionStorage.getItem("HASH"));
		return new Promise((fnResolve, fnReject) => {
			this.__BusyDialog = new sap.m.BusyDialog({
				title: oBundle.getText("std.isLoading"),
				text: sLoadingText || oBundle.getText("std.pleaseWait")
			});
			
			const oHeaders = sBtoa ? { Authorization: "Basic " + sBtoa } : {};
			jQuery.ajax({
				type: sType,
				contentType: "application/json",
				url: _.join([this.__serviceUrl, sUrl], ""),
				headers: oHeaders,
				dataType: "json",
				data: JSON.stringify(oBody),
				beforeSend: oJqXHR => {
					this.__BusyDialog.open();
				},
				success: (oData, sTextStatus, oJqXHR) => {
					this.__BusyDialog.close();
					fnResolve(oData);
				},
				error: (oJqXHR, sTextStatus, oErrorThrown) => {
					this.__BusyDialog.close();
					fnReject(oJqXHR);
				}
			});
			
		});
	};
	
	fst.core.connectivity.prototype.getUser = function(sUser) {
		return this.__loadData("getUser", oBundle.getText("contract.loading.multiple"), {
			sType: "POST",
			oBody: {
				sUser: sUser
			}
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
	
	fst.core.connectivity.prototype.getAllowedStatus = function(sContractId) {
		return this.__loadData("getAllowedStatus", oBundle.getText("contract.loading.multiple"), {
			sType: "POST",
			oBody: { id: sContractId }
		});
	};
	
	fst.core.connectivity.prototype.changeContractStatus = function(sContractId, sNewStatus) {
		return this.__loadData("changeContractStatus", oBundle.getText("contract.loading.multiple"), {
			sType: "POST",
			oBody: {
				id: sContractId,
				status: sNewStatus
			}
		});
	};
	
	
})();