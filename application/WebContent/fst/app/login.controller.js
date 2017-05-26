(function() {
	"use strict";
	
	sap.ui.controller("fst.app.login", {
		onInit: function() {
		
		},
		
		handleLogin: function() {
			const oView = this.getView();
			Connectivity.__btoa = "";
			const sUser = oView.ipUser.getValue();
			Connectivity.__btoa = btoa(sUser + ":" + oView.ipPass.getValue());
			sessionStorage.setItem("USER", sUser);
			sessionStorage.setItem("HASH", Connectivity.__btoa);
			Connectivity.getUser(sUser).then((oUser) => {
				sap.ui.getCore().setModel(new sap.ui.model.json.JSONModel(oUser), "user");
				oRouter.navTo("home");
			}).catch(e => {
				if (e.status === 401) {
					jQuery.sap.require("sap.m.MessageBox");
					sap.m.MessageBox.show(
						"Benutzername oder Passwort sind falsch!", {
							icon: sap.m.MessageBox.Icon.ERROR,
							title: "Login Fehlgeschlagen",
							actions: [sap.m.MessageBox.Action.OK],
							onClose: function() {
								this.getParent().close();
							}
						}
					);
				}
			});
		}
	});
	
})();