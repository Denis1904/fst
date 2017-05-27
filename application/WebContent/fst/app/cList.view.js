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
			
			this.oStatusPopover = new sap.m.Popover({
				title: oBundle.getText("contract.changeStatus"),
				placement: sap.m.PlacementType.Top,
				contentMinWidth: "300px",
				content: new sap.m.List({
					mode: sap.m.ListMode.SingleSelectMaster,
					selectionChange: oController.handleNewStatusSelected.bind(oController)
				}).bindItems({
					path: "/",
					template: new sap.m.StandardListItem({
						title: "{text}",
						description: "{status}"
					})
				})
			});
			
			this.oTable = new sap.m.Table({
				headerToolbar: new sap.m.OverflowToolbar({
					content: [
						new sap.m.Title({ text: oBundle.getText("contract.list") }),
						new sap.m.ToolbarSpacer(),
						new sap.m.Button({
							text: oBundle.getText("std.refresh"),
							icon: "sap-icon://refresh",
							press: oController.loadContract.bind(oController)
						})
					]
				}),
				mode: sap.m.ListMode.SingleSelectMaster,
				selectionChange: oController.checkEnabledButtons.bind(oController)
			});
			
			//Columns
			let col01 = new sap.m.Column("col01", {
				width: "2.5rem",
				header: new sap.m.Label({
					text: oBundle.getText("contract.id")
				})
			});
			this.oTable.addColumn(col01);
			
			let colTitle = new sap.m.Column({
				header: new sap.m.Label({
					text: oBundle.getText("contract.title")
				})
			});
			this.oTable.addColumn(colTitle);
			
			let col02 = new sap.m.Column("col02", {
				width: "5rem",
				header: new sap.m.Label({
					text: oBundle.getText("std.validFrom")
				})
			});
			this.oTable.addColumn(col02);
			
			let col03 = new sap.m.Column("col03", {
				width: "5rem",
				header: new sap.m.Label({
					text: oBundle.getText("std.validTo")
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
				width: "5rem",
				header: new sap.m.Label({
					text: oBundle.getText("contract.Status")
				})
			});
			this.oTable.addColumn(col07);
			
			let col08 = new sap.m.Column("col08", {
				header: new sap.m.Label({
					text: oBundle.getText("std.createdBy")
				})
			});
			this.oTable.addColumn(col08);
			
			let col09 = new sap.m.Column("col09", {
				header: new sap.m.Label({
					text: oBundle.getText("std.releasedBy")
				})
			});
			this.oTable.addColumn(col09);

			let col10 = new sap.m.Column("col10", {
				header: new sap.m.Label({
					text: oBundle.getText("std.vendor")
				})
			});
			this.oTable.addColumn(col10);
			
			let colItems = new sap.m.ColumnListItem("colItems", {
				type: "Active"
			});
			this.oTable.bindAggregation("items", "/", colItems);
			
			let txtNAME01 = new sap.m.Text("txtNAME01", {
				text: "{id}"
			});
			colItems.addCell(txtNAME01);
			
			let title = new sap.m.Text({
				text: "{title}"
			});
			colItems.addCell(title);
			
			let txtNAME02 = new sap.m.Text("txtNAME02", {
				text: { path: "validFrom", formatter: sDate => {
					return dateFormatter.format(new Date(sDate));
				} }
			});
			colItems.addCell(txtNAME02);
			
			let txtNAME03 = new sap.m.Text("txtNAME03", {
				text: { path: "validTo", formatter: sDate => {
					return dateFormatter.format(new Date(sDate));
				} }
			});
			colItems.addCell(txtNAME03);
			
			let txtNAME04 = new sap.m.Text("txtNAME04", {
				text: "{payagreement_txt}"
			});
			colItems.addCell(txtNAME04);
			
			let txtNAME05 = new sap.m.Text("txtNAME05", {
				text: "{shippagreement_txt}"
			});
			colItems.addCell(txtNAME05);
			
			let txtNAME06 = new sap.m.Switch("txtNAME06", {
				state: {
					parts: [{
						path: "payguarantee"
					}],
					formatter: function(sGurantee) {
						return sGurantee === "1";
					}
				},
				customTextOn: oBundle.getText("std.yes"),
				customTextOff: oBundle.getText("std.no"),
				enabled: false
			});
			colItems.addCell(txtNAME06);
			
			let txtNAME07 = new sap.m.Text("txtNAME07", {
				text: "{contractStatus}"
			});
			colItems.addCell(txtNAME07);
			
			let txtNAME08 = new sap.m.Text("txtNAME08", {
				text: "{createdFirstname} {createdLastname}"
			});
			colItems.addCell(txtNAME08);
			
			let txtNAME09 = new sap.m.Text("txtNAME09", {
				text: "{releasedFirstname} {releasedLastname}"
			});
			colItems.addCell(txtNAME09);

			let txtNAME10 = new sap.m.Text("txtNAME10", {
				text: "{vendorName}"
			});
			colItems.addCell(txtNAME10);
			
			this.oBtnChangeStatus = new sap.m.Button({
				text: oBundle.getText("contract.changeStatus"),
				icon: "sap-icon://journey-change",
				visible: false,
				press: oController.handleStatusChange.bind(oController)
			});
			
			this.oBtnEdit = new sap.m.Button({
				text: oBundle.getText("std.edit"),
				icon: "sap-icon://edit",
				press: oController.editButtonPress.bind(oController),
				visible: false
			});
			
			this.oBtnDelete = new sap.m.Button({
				text: oBundle.getText("std.delete"),
				icon: "sap-icon://delete",
				press: oController.handleDeletePress.bind(oController),
				visible: false
			});
			
			this.oBtnNew = new sap.m.Button({
				text: oBundle.getText("std.new"),
				icon: "sap-icon://add-document",
				press: oController.addNewButtonPress
			});
			
			return new sap.m.Page({
				showNavButton: true,
				navButtonPress: oController.handleBackBtnPress,
				title: oBundle.getText("contract.maintenance"),
				enableScrolling: true,
				content: this.oTable,
				footer: new sap.m.OverflowToolbar({
					content: [
						this.oBtnChangeStatus,
						new sap.m.ToolbarSpacer(),
						this.oBtnNew,
						this.oBtnEdit,
						this.oBtnDelete,
						new sap.m.ToolbarSpacer()
					]
				})
				
			});
		}
	});
})();
