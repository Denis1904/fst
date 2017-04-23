(function() {
	"use strict";
	
	sap.ui.define(["sap/m/routing/Router"], function(SapMRouter) {
		/**
		 * @class fst.core.Router
		 * @extends sap.m.Router
		 */
		const oRouter = {
			
			navTo: function(sName, oData, oParameters, bReplace) {
				jQuery.sap.require("fst.core.Routing");
				
				let oRoute = this.getRoute(sName);
				
				if (!oRoute) {
					throw new Error("Unknown route " + sName);
				}
				
				this.attachEventOnce("routePatternMatched", oData, function(oEvent, oData) {
					oRoute.fireEvent("afterMatched", {
						"data": oData,
						"arguments": oEvent.getParameter("arguments")
					});
				}, this);
				
				SapMRouter.prototype.navTo.call(this, sName, oParameters, bReplace);
			},
			
			
			attachRouteMatchedWithData: function(sRouteName, oData, fnFunction, oListener) {
				let oRoute = this.getRoute(sRouteName);
				
				if (!oRoute) {
					throw new Error("Unknown route " + sRouteName);
				}
				
				oRoute.attachEvent("afterMatched", oData, fnFunction, oListener);
				return this;
			},
			
			initialize: function() {
				
				this.attachEventOnce("routePatternMatched", function(oEvent) {
					let oArgs = oEvent.getParameter("arguments");
					
					this.getRoute(oEvent.getParameter("name")).fireEvent("afterMatched", {
						arguments: oArgs
					});
					
				}, this);
				
				SapMRouter.prototype.initialize.call(this);
			}
			
		};
		
		
		return SapMRouter.extend("fst.core.Router", oRouter);
	});
	
})();