/*
 * Created by Denis on 16.04.2017.
 */

(function() {
	"use strict";
	
	sap.ui.controller("fst.app.cList", {
		onInit: function() {
			oRouter.attachRouteMatchedWithData("cList", null, function(oEvent) {
				const oData = oEvent.getParameter("data");
				
			});
			
			//Create a JSON Model
			let oModel = new sap.ui.model.json.JSONModel({
				greetingText: "wat ist das?"
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

