(function() {
	"use strict";
	
	sap.ui.jsview("fst.app.login", {
		
		getControllerName: function() {
			return "fst.app.login";
		},
		
		createContent: function(oController) {
			
			this.ipUser = new sap.m.Input({
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
					
				})
			});
			this.ipPass = new sap.m.Input({
				type: "Password",
				layoutData: new sap.ui.layout.GridData({
					span: "L12 M12 S12"
					
				})
			});
			return new sap.m.Page({
				title: "Vendor Management Contract",
				content: [
					new sap.ui.layout.Grid({
						content: [
							new sap.ui.layout.VerticalLayout({
								width: "100%",
								layoutData: new sap.ui.layout.GridData({
									span: "L4 M3 S12"
								})
							}),
							new sap.ui.layout.VerticalLayout({
								width: "100%",
								layoutData: new sap.ui.layout.GridData({
									span: "L4 M6 S12"
								}),
								content: [
									new sap.m.Label({ text: "Benutzername:" }),
									this.ipUser,
									new sap.m.Label({ text: "Passwort:" }).addStyleClass("sapUiSmallMarginTop"),
									this.ipPass,
									new sap.m.Button({
										text: "Login",
										press: oController.handleLogin.bind(oController),
										width: "100%",
										layoutData: new sap.ui.layout.GridData({
											span: "L12 M12 S12"
											
										})
									}).addStyleClass("sapUiTinyMarginTop")
								]
							}),
							new sap.ui.layout.VerticalLayout({
								width: "100%",
								layoutData: new sap.ui.layout.GridData({
									span: "L4 M3 S12"
								})
							})
						
						]
					}).addStyleClass("sapUiLargeMarginTop")
				
				]
			});
			
		}
		
	});
	
})();