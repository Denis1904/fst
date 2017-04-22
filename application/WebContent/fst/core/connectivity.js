(function() {
	"use strict";
	
	jQuery.sap.declare("fst.core.connectivity");
	
	fst.core.connectivity = function() {
	
	};
	
	fst.core.connectivity.prototype.__oModel = undefined;
	
	fst.core.connectivity.prototype.__prepareModel = function(sUrl, oOptions) {
		const sType = oOptions.sType || "GET";
		const oBody = oOptions.oBody || null;
		
		return new Promise((fnResolve, fnReject) => {
			this.__BusyDialog = new sap.m.BusyDialog({
				title: "Daten werden geladen",
				text: "bla..."
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
			this.__oModel.loadData(sUrl, oBody, false, sType, false, false);
		});
	};
	
	fst.core.connectivity.prototype.getTest = function() {
		return this.__prepareModel("http://localhost:3000/sayHello?name=TestParam", { sType: "POST", oBody: { hallo: "Welt" } });
	};
	
})();