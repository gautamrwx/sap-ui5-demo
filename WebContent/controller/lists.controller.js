sap.ui.define([ "sap/ui/core/mvc/Controller", "sap/m/MessageToast",
		"sap/ui/core/routing/History" ], function(Controller, MessageToast,
		History) {
	"use strict";

	return Controller.extend("gautam.app.controller.lists", {

		onInit : function() {
		},

		fOnBack : function(oEvent) {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("home");
			}
		}
	});

});