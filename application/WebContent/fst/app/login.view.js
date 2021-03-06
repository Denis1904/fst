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
									new sap.m.Title({
										text: oBundle.getText("std.login")
									}).addStyleClass("fontSizeLarger"),
									new sap.m.Label({ text: oBundle.getText("std.user") + ":" }).addStyleClass("sapUiSmallMarginTop"),
									this.ipUser,
									new sap.m.Label({ text: oBundle.getText("std.pass") + ":" }).addStyleClass("sapUiSmallMarginTop"),
									this.ipPass,
									new sap.m.Button({
										text: oBundle.getText("std.login"),
										press: oController.handleLogin.bind(oController),
										width: "100%",
										layoutData: new sap.ui.layout.GridData({
											span: "L12 M12 S12"
											
										})
									}).addStyleClass("sapUiTinyMarginTop sapUiTinyMarginBottom")
								]
							}).addStyleClass("sapUiContentPadding sapUiMediumMarginTop sapUiMediumMarginBottom maxWidth350 sapUiShd"),
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