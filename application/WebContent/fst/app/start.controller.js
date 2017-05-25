(function() {
	"use strict";
	
	sap.ui.controller("fst.app.start", {
		
		onInit: function() {
			oRouter.attachRouteMatchedWithData("home", () => {
				const oModel = sap.ui.getCore().getModel("user");
				if (!(oModel && oModel.getData())) {
					Connectivity.getUser(sessionStorage.getItem("USER")).then((oUser) => {
						sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(oUser), "user");
						oRouter.navTo("home");
					});
				}
				
			});
		},
		
		handleContractMaintenancePress: function() {
			oRouter.navTo("cList", { my: "data object passed into a route" });
		},
		
		handleCompareContractPress: function() {
			oRouter.navTo("test");
		},
		
		handleLogout: function() {
			oRouter.navTo("login");
		}
		
	});
})();