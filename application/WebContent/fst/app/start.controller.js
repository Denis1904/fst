(function() {
	"use strict";
	
	sap.ui.controller("fst.app.start", {
		
		handleContractMaintenancePress: function() {
			oRouter.navTo("cList", { my: "data object passed into a route" });
		},
		
		
		handleCompareContractPress: function() {
			oRouter.navTo("test");
		}
	});
})();