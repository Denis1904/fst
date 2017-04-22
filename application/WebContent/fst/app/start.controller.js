(function() {
	"use strict";
	
	sap.ui.controller("fst.app.start", {
		
		handleContractMaintenancePress: function() {
			oRouter.navTo("cList");
		},
		
		
		handleCompareContractPress: function() {
			oRouter.navTo("test");
		}
	});
})();