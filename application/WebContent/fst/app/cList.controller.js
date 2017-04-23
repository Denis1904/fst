/*
 * Created by Denis on 16.04.2017.
 */

(function() {
	"use strict";
	
	sap.ui.controller("fst.app.cList", {
		onInit: function() {
			oRouter.attachRouteMatchedWithData("cList", () => {
				Connectivity.getContracts().then(
					aResponse => {
						this.getView().setModel(
							new sap.ui.model.json.JSONModel(aResponse)
						);
						
					});
			});
			
		},
		handleBackBtnPress: function() {
			oRouter.navTo("home");
		},
		addNewButtonPress: function() {
			oRouter.navTo("cNew");
		}
	});
})();

