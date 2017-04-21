(function () {
	"use strict";

	sap.ui.jsview("fst.app.cEdit", {

		getControllerName: function () {
			return "fst.app.cEdit";
		},

		createContent: function (oController) {

			var oButton = new sap.m.Button({
				text: "Zurück",
				icon: "sap-icon://arrow-left",
				press: oController.handleButtonPress
			});

			var oTable = sap.m.Table({
				insert: true,
				headerText: "Vertragsliste",
				headerDesign: sap.m.ListHeaderDesign.Standard,
				mode: sap.m.ListMode.None,
				includeItemInSelection: false
			});

			var col1 = new sap.m.Column("col1", {
				header: new sap.m.Label({
					text: "Vertragsnummer"
				})
			});
			oTable.addColumn(col1);

			var col2 = new sap.m.Column("col2", {
				header: new sap.m.Label({
					text: "Beschreibung"
				})
			});
			oTable.addColumn(col2);

			var col3 = new sap.m.Column("col3", {
				header: new sap.m.Label({
					text: "Test"
				})
			});
			oTable.addColumn(col3);

			var page = new sap.m.Page({

				title: "Vertragspflege",
				enableScrolling: false,
				content: [oButton, oTable]

			});

			return page;
		}
	});
})();