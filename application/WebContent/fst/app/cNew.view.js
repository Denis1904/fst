/*
 * Created by Denis on 21.04.2017.
 */
(function() {
	"use strict";
	
	sap.ui.jsview("fst.app.cNew", {
		
		getControllerName: function() {
			return "fst.app.cNew";
		},
		
		createContent: function(oController) {
			
			this.setModel(new sap.ui.model.json.JSONModel());
			
			//New contract button
			let oSaveButton = new sap.m.Button({
				text: "Vertrag speichern",
				icon: "sap-icon://save",
				press: oController.saveButtonPress.bind(oController)
			});
			
			let oLableTitle = new sap.m.Label({
				text: "Titel:"
			});
			let oTitleContract = new sap.m.Input({
				value: "{/title}"
			});
			
			let oLabelCreatedBy = new sap.m.Label({
				text: "Angelegt von:"
			});
			let oCreatedBy = new sap.m.Input({
				value: "{createdBy}",
				enabled: false
			});
			
			let oLabelCreatedOn = new sap.m.Label({
				text: "Angelegt am:"
			});
			let oCreatedOn = new sap.m.DatePicker({
				displayFormat: "short",
				valueFormat: "yyyy-MM-dd",
				value: "{/createdOn}",
				enabled: false
			});
			
			
			let oLabelReleasedBy = new sap.m.Label({
				text: "Freigeben von:"
			});
			let oReleasedBy = new sap.m.Input({
				value: "{releasedBy}",
				enabled: false
			});
			
			let oLabelReleasedOn = new sap.m.Label({
				text: "Freigegeben am:"
			});
			let oReleasedOn = new sap.m.DatePicker({
				displayFormat: "short",
				valueFormat: "yyyy-MM-dd",
				value: "{/createdOn}",
				enabled: false
			});
			
			//Input List for new contract
			let oValidFrom = new sap.m.DatePicker({
				id: "validFrom",
				displayFormat: "short",
				valueFormat: "yyyy-MM-dd",
				value: "{/validFrom}",
				valueLiveUpdate: true
			});
			
			let oValidFromLabel = new sap.m.Label({
				text: "Vertrag gültig von:",
				labelFor: "validFrom"
			});
			
			let oValidTo = new sap.m.DatePicker({
				id: "validTo",
				displayFormat: "short",
				valueFormat: "yyyy-MM-dd",
				value: "{/validTo}",
				valueLiveUpdate: true
			});
			
			let oValidToLabel = new sap.m.Label({
				text: "Vertrag gültig bis:",
				labelFor: "validTo"
			});
			
			let oPayAgreement = new sap.m.Input({
				id: "payAgreement",
				showValueHelp: true,
				showSuggestion: true,
				value: "{/payAgreement}",
				valueLiveUpdate: true
				//valueHelpRequest: oController.handleValueHelp
			});
			
			let oPayAgreementLabel = new sap.m.Label({
				text: "Zahlungskondition",
				labelFor: "payAgreement"
			});
			
			let oShippAgreement = new sap.m.Input({
				id: "shippAgreement",
				showValueHelp: true,
				showSuggestion: true,
				value: "{/shippAgreement}",
				valueLiveUpdate: true
			});
			
			let oShipAgreementLabel = new sap.m.Label({
				text: "Lieferkondition",
				labelFor: "shippAgreement"
			});
			
			let oPayGuarantee = new sap.m.Switch({ state: "{/priceGuarantee}" });
			
			let oPayGuaranteeLabel = new sap.m.Label({
				text: "Preisgarantie",
				labelFor: "priceGuarantee"
			});
			
			let oContractStatus = new sap.m.Input({
				id: "status",
				showValueHelp: true,
				showSuggestion: true,
				value: "{/status}",
				valueLiveUpdate: true
			});
			
			let oStatusLabel = new sap.m.Label({
				text: "Vertragsstatus",
				labelFor: "status"
			});
			
			this.fnCreateBlockLayoutCell = function(aContent) {
				const aLayoutCell = [];
				
				aContent.forEach(a => {
					aLayoutCell.push(new sap.ui.layout.BlockLayoutCell({
						content: a
					}));
					
				});
				
				return aLayoutCell;
			};
			
			const oBlockLayout = new sap.ui.layout.BlockLayout({
				content: [
					new sap.ui.layout.BlockLayoutRow({
						content: this.fnCreateBlockLayoutCell([
							[
								oLableTitle,
								oTitleContract,
								oStatusLabel,
								oContractStatus
							],
							[
								oValidFromLabel,
								oValidFrom,
								oValidToLabel,
								oValidTo
							]
						])
					}),
					new sap.ui.layout.BlockLayoutRow({
						content: this.fnCreateBlockLayoutCell([
							[
								oLabelCreatedBy,
								oCreatedBy,
								oLabelCreatedOn,
								oCreatedOn
							],
							[
								oLabelReleasedBy,
								oReleasedBy,
								oLabelReleasedOn,
								oReleasedOn
							]
						])
					}),
					new sap.ui.layout.BlockLayoutRow({
						content: this.fnCreateBlockLayoutCell([
							[
								oPayAgreementLabel,
								oPayAgreement,
								oShipAgreementLabel,
								oShippAgreement,
								new sap.ui.layout.VerticalLayout({
									content: [
										oPayGuaranteeLabel,
										oPayGuarantee
									]
								})
							]
						])
					})
				]
			});
			
			return new sap.m.Page({
				showNavButton: true,
				navButtonPress: oController.handleBackBtnPress,
				title: "Vertrag anlegen",
				enableScrolling: true,
				content: oBlockLayout,
				footer: new sap.m.OverflowToolbar({ content: [
					new sap.m.ToolbarSpacer(), oSaveButton, new sap.m.ToolbarSpacer()
				] })
			});
		}
	});
})();