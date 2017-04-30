/*
 * Created by Denis on 21.04.2017.
 */
(function() {
	"use strict";
	
	sap.ui.jsview("fst.app.cList", {
		
		getControllerName: function() {
			return "fst.app.cList";
		},
		
		createContent: function(oController) {
			this.setModel(new sap.ui.model.json.JSONModel());
			
			//Back button
			let oBackButton = new sap.m.Button({
				text: "Zurück",
				icon: "sap-icon://arrow-left",
				press: oController.handleBackBtnPress
			});
			
			//New contract button
			let oNewButton = new sap.m.Button({
				text: "Hinzufügen",
				icon: "sap-icon://add-document",
				press: oController.addNewButtonPress
			});
			
			//Table body
			let oTable = new sap.m.Table({
				insert: true,
				headerToolbar: new sap.m.OverflowToolbar({
					content: [
						new sap.m.Title({ text: "Vertragsliste" }),
						new sap.m.ToolbarSpacer(),
						new sap.m.Button({
							text: "Aktualisieren",
							icon: "sap-icon://refresh",
							press: oController.loadContracts.bind(oController)
						})
					]
				}),
				mode: sap.m.ListMode.SingleSelectMaster,
				includeItemInSelection: false
			});
			
			//Columns
			let col01 = new sap.m.Column("col01", {
				header: new sap.m.Label({
					text: "Vertragsnummer"
				})
			});
			oTable.addColumn(col01);
			
			let col02 = new sap.m.Column("col02", {
				header: new sap.m.Label({
					text: "Gültig von"
				})
			});
			oTable.addColumn(col02);
			
			let col03 = new sap.m.Column("col03", {
				header: new sap.m.Label({
					text: "Gültig bis"
				})
			});
			oTable.addColumn(col03);
			
			let col04 = new sap.m.Column("col04", {
				header: new sap.m.Label({
					text: "Zahlungskondition"
				})
			});
			oTable.addColumn(col04);
			
			let col05 = new sap.m.Column("col05", {
				header: new sap.m.Label({
					text: "Lieferkondition"
				})
			});
			oTable.addColumn(col05);
			
			let col06 = new sap.m.Column("col06", {
				header: new sap.m.Label({
					text: "Zahlungsgarantie"
				})
			});
			oTable.addColumn(col06);
			
			let col07 = new sap.m.Column("col07", {
				header: new sap.m.Label({
					text: "Status"
				})
			});
			oTable.addColumn(col07);
			
			let col08 = new sap.m.Column("col08", {
				header: new sap.m.Label({
					text: "Angelegt von"
				})
			});
			oTable.addColumn(col08);
			
			let col09 = new sap.m.Column("col09", {
				header: new sap.m.Label({
					text: "Freigegeben von"
				})
			});
			oTable.addColumn(col09);
			
			let colItems = new sap.m.ColumnListItem("colItems", {
				type: "Active"
			});
			oTable.bindAggregation("items", "/", colItems);
			
			let txtNAME = new sap.m.Text("txtNAME", {
				text: "{id}"
			});
			colItems.addCell(txtNAME);
			
			let txtNAME2 = new sap.m.Text("txtNAME2", {
				text: "{validFrom}"
			});
			colItems.addCell(txtNAME2);
			
			let txtNAME3 = new sap.m.Text("txtNAME3", {
				text: "{validTo}"
			});
			colItems.addCell(txtNAME3);
			
			let txtNAME4 = new sap.m.Text("txtNAME4", {
				text: "{payagreement}"
			});
			colItems.addCell(txtNAME4);
			
			let txtNAME5 = new sap.m.Text("txtNAME5", {
				text: "{shippagreement}"
			});
			colItems.addCell(txtNAME5);
			
			let txtNAME6 = new sap.m.Text("txtNAME6", {
				text: "{payguarantee}"
			});
			colItems.addCell(txtNAME6);
			
			let txtNAME7 = new sap.m.Text("txtNAME7", {
				text: "{contractStatus}"
			});
			colItems.addCell(txtNAME7);
			
			let txtNAME8 = new sap.m.Text("txtNAME8", {
				text: "{createdLastname}"
			});
			colItems.addCell(txtNAME8);
			
			let txtNAME9 = new sap.m.Text("txtNAME9", {
				text: "{releasedLastname}"
			});
			colItems.addCell(txtNAME9);

			return new sap.m.Page({
				showNavButton: true,
				navButtonPress: oController.handleBackBtnPress,
				title: "Vertragspflege",
				enableScrolling: true,
				content: oTable,
				footer: new sap.m.OverflowToolbar({
					content: [
						new sap.m.Button({
							text: "Status ändern",
							icon: "sap-icon://journey-change"
						}),
						new sap.m.ToolbarSpacer(),
						oNewButton,
						new sap.m.Button({
							text: "Bearbeiten",
							icon: "sap-icon://edit"
						}),
						new sap.m.ToolbarSpacer()
					]
				})
				
			});
		}
	});
})();
