(function () {
	"use strict";

	class Contract {
		constructor(oContract) {
			if (oContract) {
				if (oContract.validFrom) {
					this.validFrom = oContract.validFrom;
				}
				if (oContract.validTo) {
					this.validTo = oContract.validTo;
				}
				if (oContract.title) {
					this.title = oContract.title;
				}
				if (oContract.status) {
					this.status = oContract.status;
				}
			}

		}

		getTitle() {
			return this.title;
		}

		setTitle(sTitle) {
			this.title = sTitle;
		}
		
		setStatus(sStatus) {
			this.status = sStatus;
		}
		
		getStatus() {
			return this.status;
		}
		
		validate() {
			const aReturn = [];
			if (!(this.validFrom && Object.prototype.toString.call(this.validFrom) === "[object Date]")) {
				aReturn.push({ title: "Gültig von wurde nicht geplfegt.", description: "Lorem ipsum dolor", type: "E" });
			}

			return aReturn;
		}

	}

	module.exports = Contract;

})();