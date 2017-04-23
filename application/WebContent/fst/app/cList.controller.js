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
		}
	});
})();

