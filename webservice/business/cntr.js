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
			}

		}

		getTitle() {
			return this.title;
		}

		setTitle(sTitle) {
			this.title = sTitle;
		}

		validate() {
			const aReturn = [];
			if (!(this.validFrom && Object.prototype.toString.call(this.validFrom) === "[object Date]")) {
				aReturn.push("Gültig von wurde nicht geplfegt.");
			}

			return aReturn;
		}

	}

	module.exports = Contract;

})();