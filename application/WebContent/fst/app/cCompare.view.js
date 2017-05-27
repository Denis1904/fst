(function() {
	"use strict";
	
	sap.ui.jsview("fst.app.cCompare", {
		
		getControllerName: function() {
			return "fst.app.cCompare";
		},
		
		createStatusChart: function() {
			return this.createPieChart({
				type: "pie",
				title: oBundle.getText("contract.status.overview.title"),
				measureTxt: oBundle.getText("std.amount"),
				measureVal: "{value}",
				dimTxt: oBundle.getText("contract.Status"),
				dimVal: "{title}",
				data: "status>/data"
			});
		},
		
		createVendorChart: function() {
			return this.createPieChart({
				type: "donut",
				title: oBundle.getText("contract.overview.vendor.title"),
				measureTxt: oBundle.getText("std.amount"),
				measureVal: "{value}",
				dimTxt: oBundle.getText("std.vendor"),
				dimVal: "{title}",
				data: "vendor>/data"
			});
		},
		
		createPieChart: function(oDef) {
			return new sap.viz.ui5.controls.VizFrame({
				vizType: _.get(oDef, "type"),
				height: "100%",
				width: "100%",
				vizProperties: {
					title: {
						text: _.get(oDef, "title")
					},
					plotArea: {
						dataLabel: {
							visible: true,
							type: "value",
							formatString: "0 " + oBundle.getText("contract.plural"),
							style: {
								fontSize: "9px"
							}
						}
					}
				},
				feeds: [
					new sap.viz.ui5.controls.common.feeds.FeedItem({
						uid: "size",
						type: "Measure",
						values: [_.get(oDef, "measureTxt")]
					}),
					new sap.viz.ui5.controls.common.feeds.FeedItem({
						uid: "color",
						type: "Dimension",
						values: [_.get(oDef, "dimTxt")]
					})
				],
				dataset: new sap.viz.ui5.data.FlattenedDataset({
					data: {
						path: _.get(oDef, "data")
					},
					dimensions: [
						{
							name: _.get(oDef, "dimTxt"),
							value: _.get(oDef, "dimVal")
						}
					],
					measures: [
						{
							name: _.get(oDef, "measureTxt"),
							value: _.get(oDef, "measureVal")
						}
					]
				})
			});
		},
		
		createPayAgreementChart: function() {
			return this.createHeatMap({
				title: oBundle.getText("contract.payagreements"),
				dim1Txt: oBundle.getText("std.vendor"),
				dim2Txt: oBundle.getText("contract.payagreements"),
				dim1Val: "{vendor}",
				dim2Val: "{payAgreement}",
				measureTxt: oBundle.getText("contracts.amount"),
				measureVal: "{value}",
				data: "payagreement>/data"
			});
		},
		
		createShippAgreementChart: function() {
			return this.createHeatMap({
				title: oBundle.getText("contract.shippagreements"),
				dim1Txt: oBundle.getText("std.vendor"),
				dim2Txt: oBundle.getText("contract.shippagreements"),
				dim1Val: "{vendor}",
				dim2Val: "{shippAgreement}",
				measureTxt: oBundle.getText("contracts.amount"),
				measureVal: "{value}",
				data: "shippagreement>/data"
			});
		},
		
		createHeatMap: function(oDef) {
			return new sap.viz.ui5.controls.VizFrame({
				vizType: "heatmap",
				vizProperties: {
					title: {
						text: _.get(oDef, "title")
					},
					categoryAxis: {
						title: {
							visible: false
						}
					},
					categoryAxis2: {
						title: {
							visible: false
						}
					}
				},
				dataset: new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [
						{
							name: _.get(oDef, "dim1Txt"),
							value: _.get(oDef, "dim1Val")
						},
						{
							name: _.get(oDef, "dim2Txt"),
							value: _.get(oDef, "dim2Val")
						}
					],
					measures: [
						{
							name: _.get(oDef, "measureTxt"),
							value: _.get(oDef, "measureVal")
						}
					],
					data: {
						path: _.get(oDef, "data")
					}
				}),
				feeds: [
					new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "categoryAxis2",
						"type": "Dimension",
						"values": [_.get(oDef, "dim2Txt")]
					}),
					new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "categoryAxis",
						"type": "Dimension",
						"values": [_.get(oDef, "dim1Txt")]
					}),
					new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "color",
						"type": "Measure",
						"values": [_.get(oDef, "measureTxt")]
					})
				]
			});
		},
		
		createContent: function(oController) {
			
			this.oStatusChart = this.createStatusChart();
			this.oVendorChart = this.createVendorChart();
			this.oPayChart = this.createPayAgreementChart();
			this.oShippChart = this.createShippAgreementChart();
			
			
			return new sap.m.Page({
				showNavButton: true,
				navButtonPress: oController.handleBackBtnPress.bind(oController),
				title: oBundle.getText("contract.compare"),
				content: [
					new sap.ui.layout.BlockLayout({
						background: sap.ui.layout.BlockBackgroundType.Mixed,
						content: [
							new sap.ui.layout.BlockLayoutRow({
								content: [
									new sap.ui.layout.BlockLayoutCell({
										content: this.oStatusChart
										
									}),
									new sap.ui.layout.BlockLayoutCell({
										content: this.oPayChart
									})
								]
							}),
							new sap.ui.layout.BlockLayoutRow({
								content: [
									new sap.ui.layout.BlockLayoutCell({
										content: this.oShippChart
									}),
									new sap.ui.layout.BlockLayoutCell({
										content: this.oVendorChart
									})
								]
							})
						]
					})
				]
			});
		}
		
		
	});
})();