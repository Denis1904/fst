(function() {
	"use strict";
	
	sap.ui.controller("fst.app.cCompare", {
		
		onInit: function() {
			oRouter.attachRouteMatchedWithData("cCompare", {}, () => {
				Connectivity.getContracts().then(aResponse => {
					this.getView().setModel(new sap.ui.model.json.JSONModel({ data: aResponse }), "contracts");
					
					this.prepareStatusModel(aResponse);
					this.prepareVendorModel(aResponse);
					this.preparePayagreement(aResponse);
					this.prepareShippAgreement(aResponse);
					
				});
			});
		},
		
		preparePayagreement: function(aResponse) {
			let oPayagreement = {};
			aResponse.forEach(e => {
				
				if (oPayagreement[e.payagreement_txt]) {
					if (oPayagreement[e.payagreement_txt][e.vendorName]) {
						oPayagreement[e.payagreement_txt][e.vendorName] =
							_.get(oPayagreement, e.payagreement_txt + "." + e.vendorName, 0) + 1;
					}
					else {
						oPayagreement[e.payagreement_txt][e.vendorName] = 1;
					}
				}
				else {
					oPayagreement[e.payagreement_txt] = {};
					oPayagreement[e.payagreement_txt][e.vendorName] = 1;
				}
				
				
			});
			
			const oDataPayagreement = { data: [] };
			_.forIn(oPayagreement, (oValue, SKey) => {
				
				_.forIn(oValue, (iValueInner, sKeyInner) => {
					oDataPayagreement.data.push({
						payAgreement: SKey,
						vendor: sKeyInner,
						value: iValueInner
					});
				});
				
			});
			
			this.getView().setModel(new sap.ui.model.json.JSONModel(oDataPayagreement), "payagreement");
		},
		
		prepareShippAgreement: function(aResponse) {
			let oShippAgreement = {};
			aResponse.forEach(e => {
				
				if (oShippAgreement[e.shippagreement_txt]) {
					if (oShippAgreement[e.shippagreement_txt][e.vendorName]) {
						oShippAgreement[e.shippagreement_txt][e.vendorName] =
							_.get(oShippAgreement, e.shippagreement_txt + "." + e.vendorName, 0) + 1;
					}
					else {
						oShippAgreement[e.shippagreement_txt][e.vendorName] = 1;
					}
				}
				else {
					oShippAgreement[e.shippagreement_txt] = {};
					oShippAgreement[e.shippagreement_txt][e.vendorName] = 1;
				}
				
				
			});
			
			const oDataShippAgreement = { data: [] };
			_.forIn(oShippAgreement, (oValue, SKey) => {
				
				_.forIn(oValue, (iValueInner, sKeyInner) => {
					oDataShippAgreement.data.push({
						shippAgreement: SKey,
						vendor: sKeyInner,
						value: iValueInner
					});
				});
				
			});
			
			this.getView().setModel(new sap.ui.model.json.JSONModel(oDataShippAgreement), "shippagreement");
		},
		
		prepareStatusModel: function(aResponse) {
			let oStatus = {};
			aResponse.forEach(e => {
				oStatus[e.contractStatus] = _.get(oStatus, e.contractStatus, 0) + 1;
			});
			
			const oDataStatus = { data: [] };
			_.forIn(oStatus, (value, key) => {
				oDataStatus.data.push({
					title: key,
					value: value
				});
			});
			
			this.getView().setModel(new sap.ui.model.json.JSONModel(oDataStatus), "status");
		},
		
		prepareVendorModel: function(aResponse) {
			let oStatus = {};
			aResponse.forEach(e => {
				oStatus[e.vendorName] = _.get(oStatus, e.vendorName, 0) + 1;
			});
			
			const oDataStatus = { data: [] };
			_.forIn(oStatus, (value, key) => {
				oDataStatus.data.push({
					title: key,
					value: value
				});
			});
			
			this.getView().setModel(new sap.ui.model.json.JSONModel(oDataStatus), "vendor");
		},
		
		handleBackBtnPress: function() {
			oRouter.navTo("home");
		}
		
	});
	
})();