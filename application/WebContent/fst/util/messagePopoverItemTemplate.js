sap.ui.define(["sap/m/MessagePopoverItem"], function(MessagePopoverItem) {
	"use strict";
	jQuery.sap.declare("fst.util.MessagePopoverItemTemplate");
	
	fst.util.MessagePopoverItemTemplate = new MessagePopoverItem({
		type: {
			parts: [
				{ path: "type" }
			],
			formatter: function(sType) {
				let sReturnType;
				switch (sType) {
					
					case "W":
						sReturnType = sap.ui.core.MessageType.Warning;
						break;
					
					case "S":
						sReturnType = sap.ui.core.MessageType.Success;
						break;
					
					case "A":
					case "E":
						sReturnType = sap.ui.core.MessageType.Error;
						break;
					
					case "I":
					default:
						sReturnType = sap.ui.core.MessageType.Information;
						break;
				}
				return sReturnType;
			}
		},
		title: "{title}",
		subtitle: "{description}",
		description: "{description}"
	});
	
	return fst.util.MessagePopoverItemTemplate;
	
});