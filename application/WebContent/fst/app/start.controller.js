(function() {
	"use strict";
	
	sap.ui.controller("fst.app.start", {
		
		onInit: function() {
			oRouter.attachRouteMatchedWithData("home", () => {
				const oModel = sap.ui.getCore().getModel("user");
				if (!(_.isObject(oModel) && _.isObject(oModel.getData()))) {
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
			oRouter.navTo("cCompare");
		},
		
		handleLogout: function() {
			sessionStorage.removeItem("USER");
			sessionStorage.removeItem("HASH");
			Connectivity.__btoa = null;
			const oModel = sap.ui.getCore().getModel("user");
			if (_.isObject(oModel)) {
				oModel.setData();
			}
			oRouter.navTo("login");
		}
		
	});
})();