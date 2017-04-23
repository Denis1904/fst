/*
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.jsview("fst.app.cNew", {

		getControllerName: function () {
			return "fst.app.cNew";
		},

		createContent: function (oController) {

			this.setModel(new sap.ui.model.json.JSONModel());

			//New contract button
			let oSaveButton = new sap.m.Button({
				text: "Vertrag speichern",
				icon: "sap-icon://save",
				press: oController.saveButtonPress.bind(oController)
			});
			
			//Spacer
			let oSpacer2 = new sap.m.ToolbarSeparator();
			
			//Input List for new contract
			let oValidFrom = new sap.m.DatePicker({
				id: "validFrom",
				displayFormat: "short",
				valueFormat: "dd-mm-yyyy",
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
				valueFormat: "dd-mm-yyyy",
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
				valueLiveUpdate: true,
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
			
			let oPayGuarantee = sap.m.InputListItem({
				id: "priceGuarantee",
				content: new sap.m.Switch({}),
				value: "{/priceGuarantee}",
				valueLiveUpdate: true
			});
			
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
			
			let oCreatedBy = new sap.m.Input({
				id: "createdBy",
				showValueHelp: true,
				showSuggestion: true,
				value: "{/createdBy}",
				valueLiveUpdate: true
			});
			
			let oCreatedLabel = new sap.m.Label({
				text: "Angelegt von",
				labelFor: "createdBy"
			});
			
			let oReleasedBy = new sap.m.Input({
				id: "releasedBy",
				showValueHelp: true,
				showSuggestion: true,
				value: "{/releasedBy}",
				valueLiveUpdate: true
			});
			
			let oReleasedLabel = new sap.m.Label({
				text: "Freigegeben von",
				labelFor: "releasedBy"
			});
			
			return new sap.m.Page({
				showNavButton: true,
				navButtonPress: oController.handleBackBtnPress,
				title: "Vertrag anlegen",
				enableScrolling: true,
				content: [oSaveButton, oSpacer2, oValidFromLabel,
					oValidFrom, oValidToLabel, oValidTo, oPayAgreementLabel, oPayAgreement,
					oShipAgreementLabel, oShippAgreement, oPayGuaranteeLabel, oPayGuarantee, oStatusLabel,
					oContractStatus, oCreatedLabel, oCreatedBy, oReleasedLabel, oReleasedBy]

			});
		}
	});
})();