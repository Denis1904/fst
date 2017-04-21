/**
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.jsview("fst.app.cList", {

		getControllerName: function () {
			return "fst.app.cList";
		},

		createContent: function (oController) {

			//Back button
			var oBackButton = new sap.m.Button({
				text: "Zurück",
				icon: "sap-icon://arrow-left",
				press: oController.handleButtonPress
			});

			//New contract button
			var oNewButton = new sap.m.Button({
				text: "Vertrag anlegen",
				icon: "sap-icon://add-document",
				press: oController.addNewButtonPress
			});

			//Spacer
			var oSpacer = sap.m.ToolbarSeparator();

			//Table body
			var oTable = sap.m.Table({
				insert: true,
				headerText: "Vertragsliste",
				headerDesign: sap.m.ListHeaderDesign.Standard,
				mode: sap.m.ListMode.None,
				includeItemInSelection: false
			});

			//Columns
			var col01 = new sap.m.Column("col01", {
				header: new sap.m.Label({
					text: "Vertragsnummer"
				})
			});
			oTable.addColumn(col01);

			var col02 = new sap.m.Column("col02", {
				header: new sap.m.Label({
					text: "Gültig von"
				})
			});
			oTable.addColumn(col02);

			var col03 = new sap.m.Column("col03", {
				header: new sap.m.Label({
					text: "Gültig bis"
				})
			});
			oTable.addColumn(col03);

			var col04 = new sap.m.Column("col04", {
				header: new sap.m.Label({
					text: "Zahlungskondition"
				})
			});
			oTable.addColumn(col04);

			var col05 = new sap.m.Column("col05", {
				header: new sap.m.Label({
					text: "Status"
				})
			});
			oTable.addColumn(col05);

			var col06 = new sap.m.Column("col06", {
				header: new sap.m.Label({
					text: "Angelegt von"
				})
			});
			oTable.addColumn(col06);

			var col07 = new sap.m.Column("col07", {
				header: new sap.m.Label({
					text: "Freigegeben von"
				})
			});
			oTable.addColumn(col07);

			var colItems = new sap.m.ColumnListItem("colItems", {
				type: "Active"
			});
			oTable.bindAggregation("items", "/value", colItems);

			var txtNAME = new sap.m.Text("txtNAME", {
				text: "{ProductID}"
			});
			colItems.addCell(txtNAME);

			var txtNAME2 = new sap.m.Text("txtNAME2", {
				text: "{ProductName}"
			});
			colItems.addCell(txtNAME2);

			var txtNAME3 = new sap.m.Text("txtNAME3", {
				text: "{UnitsInStock}"
			});
			colItems.addCell(txtNAME3);


			var page = new sap.m.Page({

				title: "Vertragspflege",
				enableScrolling: false,
				content: [oBackButton, oSpacer, oNewButton, oTable]

			});

			return page;
		}
	});
})();
