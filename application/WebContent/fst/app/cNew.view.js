<<<<<<< HEAD
/**
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.jsview("fst.app.cNew", {

		getControllerName: function () {
			return "fst.app.cNew";
		},

		createContent: function (oController) {

			//Back button
			let oBackButton = new sap.m.Button({
				text: "Zurück",
				icon: "sap-icon://arrow-left",
				press: oController.handleButtonPress
			});

			//Spacer
			let oSpacer = sap.m.ToolbarSeparator();

			//Input List for new contract
			let oValidFrom = new sap.m.DatePicker({
				id: "validfrom",
				displayFormat: "short",
				valueFormat: "dd-mm-yyyy"
			});

			let oValidFromLabel = new sap.m.Label({
				text: "Vertrag gültig von:",
				labelFor: "validfrom"
			});

			let oValidTo = new sap.m.DatePicker({
				id: "validto",
				displayFormat: "short",
				valueFormat: "dd-mm-yyyy"
			});

			let oValidToLabel = new sap.m.Label({
				text: "Vertrag gültig bis:",
				labelFor: "validfto"
			});

			let oPayAgreement = new sap.m.Input({
				id: "payAgreement",
				showValueHelp: true,
				showSuggestion: true
			});

			let oPayAgreementLabel = new sap.m.Label({
				text: "Zahlungskondition",
				labelFor: "payAgreement"
			});

			let oShippAgreement = new sap.m.Input({
				id: "shippAgreement",
				showValueHelp: true,
				showSuggestion: true
			});

			let oShipAgreementLabel = new sap.m.Label({
				text: "Lieferkondition",
				labelFor: "shippAgreement"
			});

			let oPayGuarantee = sap.m.InputListItem({
				id: "payguarantee",
				content: new sap.m.Switch({})
			});

			let oPayGuaranteeLabel = new sap.m.Label({
				text: "Zahlungsgarantie",
				labelFor: "payguarantee"
			});

			let oContractStatus = new sap.m.Input({
				id: "status",
				showValueHelp: true,
				showSuggestion: true
			});

			let oStatusLabel = new sap.m.Label({
				text: "Vertragsstatus",
				labelFor: "status"
			});

			let oCreatedBy = new sap.m.Input({
				id: "createdby",
				showValueHelp: true,
				showSuggestion: true
			});

			let oCreatedLabel = new sap.m.Label({
				text: "Angelegt von",
				labelFor: "createdby"
			});

			let oReleasedBy = new sap.m.Input({
				id: "releasedby",
				showValueHelp: true,
				showSuggestion: true
			});

			let oReleasedLabel = new sap.m.Label({
				text: "Freigegeben von",
				labelFor: "releasedby"
			});

			/*
			 let oInputList = sap.m.InputListItem({
			 id: "id",
			 label: "Vertrag gültig von",
			 content: new sap.m.Input({})
			 });
			 */


			let page = new sap.m.Page({

				title: "Vertrag anlegen",
				enableScrolling: false,
				content: [oBackButton, oSpacer, oValidFromLabel, oValidFrom,
					oValidToLabel, oValidTo, oPayAgreementLabel, oPayAgreement,
					oShipAgreementLabel, oShippAgreement, oPayGuaranteeLabel, oPayGuarantee,
					oStatusLabel, oContractStatus, oCreatedLabel, oCreatedBy,
					oReleasedLabel, oReleasedBy]

			});

			return page;
		}
	});
})();
=======
/**
 * Created by Denis on 21.04.2017.
 */
(function () {
	"use strict";

	sap.ui.jsview("fst.app.cNew", {

		getControllerName: function () {
			return "fst.app.cNew";
		},

		createContent: function (oController) {

			return new sap.m.Page({
				showNavButton: true,
				navButtonPress: oController.handleBackBtnPress,
				title: "Vertrag anlegen",
				enableScrolling: false,
				content: []
				
			});
		}
	});
})();
>>>>>>> origin/master
