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
			
			this.oTable = new sap.m.Table({
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
				selectionChange: oController.checkEnabledButtons.bind(oController)
			});
			
			//Columns
			let col01 = new sap.m.Column("col01", {
				header: new sap.m.Label({
					text: "Vertragsnummer"
				})
			});
			this.oTable.addColumn(col01);
			
			let col02 = new sap.m.Column("col02", {
				header: new sap.m.Label({
					text: "Gültig von"
				})
			});
			this.oTable.addColumn(col02);
			
			let col03 = new sap.m.Column("col03", {
				header: new sap.m.Label({
					text: "Gültig bis"
				})
			});
			this.oTable.addColumn(col03);
			
			let col04 = new sap.m.Column("col04", {
				header: new sap.m.Label({
					text: "Zahlungskondition"
				})
			});
			this.oTable.addColumn(col04);
			
			let col05 = new sap.m.Column("col05", {
				header: new sap.m.Label({
					text: "Lieferkondition"
				})
			});
			this.oTable.addColumn(col05);
			
			let col06 = new sap.m.Column("col06", {
				header: new sap.m.Label({
					text: "Zahlungsgarantie"
				})
			});
			this.oTable.addColumn(col06);
			
			let col07 = new sap.m.Column("col07", {
				header: new sap.m.Label({
					text: "Status"
				})
			});
			this.oTable.addColumn(col07);
			
			let col08 = new sap.m.Column("col08", {
				header: new sap.m.Label({
					text: "Angelegt von"
				})
			});
			this.oTable.addColumn(col08);
			
			let col09 = new sap.m.Column("col09", {
				header: new sap.m.Label({
					text: "Freigegeben von"
				})
			});
			this.oTable.addColumn(col09);
			
			let colItems = new sap.m.ColumnListItem("colItems", {
				type: "Active"
			});
			this.oTable.bindAggregation("items", "/", colItems);
			
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
			
			this.oBtnChangeStatus = new sap.m.Button({
				text: "Status ändern",
				icon: "sap-icon://journey-change",
				visible: false,
				press: oController.handleStatusChange.bind(oController)
			});
			
			this.oBtnEdit = new sap.m.Button({
				text: "Bearbeiten",
				icon: "sap-icon://edit",
				visible: false
			});
			
			 this.oBtnNew = new sap.m.Button({
				text: "Hinzufügen",
				icon: "sap-icon://add-document",
				press: oController.addNewButtonPress
			});
			
			return new sap.m.Page({
				showNavButton: true,
				navButtonPress: oController.handleBackBtnPress,
				title: "Vertragspflege",
				enableScrolling: true,
				content: this.oTable,
				footer: new sap.m.OverflowToolbar({
					content: [
						this.oBtnChangeStatus,
						new sap.m.ToolbarSpacer(),
						this.oBtnNew,
						this.oBtnEdit,
						new sap.m.ToolbarSpacer()
					]
				})
				
			});
		}
	});
})();
