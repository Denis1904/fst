/**
 * Created by Denis on 28.05.2017.
 */

sap.ui.define(
	['sap/m/Input'],
	function (Control) {
		return Control.extend("fst.control.SearchHelp", {
			metadata: {
				properties: {
					searchHelpName: "String",
					key: "String"
				}
			},
			renderer: {
				// super renderer is called!
			},
			_alreadyRendered: false,
			_handleNewStatusSelected: function (oEvent, oInput) {
				const obj = oEvent.getSource().getSelectedItem().getBindingContext().getObject();
				oInput.setValue(obj.value);
				oInput.setKey(obj.key);
				oEvent.getSource().getParent().close();
			},
			onBeforeRendering: function () {
				if (!this._alreadyRendered) {
					this._alreadyRendered = true;
					this.setShowValueHelp(true);
					this.attachValueHelpRequest(oEvent => {

						const oInput = oEvent.getSource();

						Connectivity.getHelpData(this.getSearchHelpName()).then(aResponse => {

							new sap.m.Dialog({
								title: "Suchhilfe",
								rightButton: new sap.m.Button({
									text: "Close",
									press: oEvent => {
										oEvent.getSource().getParent().close();
									}
								}),
								content: [
									new sap.m.List({
										mode: sap.m.ListMode.SingleSelectMaster,
										selectionChange: function (oEvent) {
											this._handleNewStatusSelected(oEvent, oInput);
										}.bind(this)
									}).bindItems({
										path: "/",
										template: new sap.m.StandardListItem({
											title: "{key}",
											description: "{value}"
										})
									})
								]
							}).setModel(new sap.ui.model.json.JSONModel(aResponse)).open();
						});
					});
				}
			}
		});
	}
);
