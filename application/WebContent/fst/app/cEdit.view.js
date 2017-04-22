<<<<<<< HEAD
(function () {
	"use strict";

	sap.ui.jsview("fst.app.cEdit", {

		getControllerName: function () {
			return "fst.app.cEdit";
		},

		createContent: function (oController) {

			//Back button
			let oBackButton = new sap.m.Button({
				text: "Zurück",
				icon: "sap-icon://arrow-left",
				press: oController.handleBackBtnPress
			});


			let page = new sap.m.Page({

				title: "Vertragspflege",
				enableScrolling: false,
				content: [oBackButton]

			});

			return page;
		}
	});
=======
(function () {
	"use strict";

	sap.ui.jsview("fst.app.cEdit", {

		getControllerName: function () {
			return "fst.app.cEdit";
		},

		createContent: function (oController) {

			//Back button
			var oBackButton = new sap.m.Button({
				text: "Zurück",
				icon: "sap-icon://arrow-left",
				press: oController.handleBackBtnPress
			});


			var page = new sap.m.Page({

				title: "Vertragspflege",
				enableScrolling: false,
				content: [oBackButton]

			});

			return page;
		}
	});
>>>>>>> origin/master
})();