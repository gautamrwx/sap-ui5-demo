sap.ui.define([ "sap/ui/core/mvc/Controller", "sap/m/MessageToast",
		"../util/formatter", "sap/m/MessageBox" ], function(Controller,
		MessageToast, formatter, MessageBox) {
	"use strict";

	return Controller.extend("gautam.app.controller.home", {

		// initialize formatter
		formatter : formatter,

		onInit : function() {

		},

		onBeforeRendering : function() {
		},

		onAfterRendering : function() {
			// set data model
			var oData = {
				formData : {
					fname : "",
					lname : "",
					dob : "",
					gender : "male", // Keeping Default as male
					number : "",
					mobile : "",
				},
				Table : [ {
					fname : "Gautam",
					lname : "Kumar",
					dob : "1999-03-09",
					gender : "male",
					number : "123",
					mobile : "88888888",
				}, {
					fname : "ABC",
					lname : "Kumar",
					dob : "1994-03-09",
					gender : "male",
					number : "123",
					mobile : "88888888",
				}, {
					fname : "XYZ",
					lname : "Kumar",
					dob : "1996-03-09",
					gender : "female",
					number : "123",
					mobile : "88888888",
				} ]
			};

			var oModel = new sap.ui.model.json.JSONModel(oData);
			this.getView().setModel(oModel, "viewModel");

			// this.getView().byId("id-simple-form").bindElement("");

		},

		onExit : function() {

		},

		funcListBtn : function(oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo('listPage');
		},

		fOnclick : function(oEvent) {
			var oViewModel = this.getView().getModel("viewModel");
			var vFormData = oViewModel.getProperty("/formData");

			// Form Validation at backend

			// if form is empty

			if (vFormData.fname === '' || vFormData.lname === ''
					|| vFormData.number === '' || vFormData.mobile === ''
					|| vFormData.dob === '') {

				MessageBox.alert("You Haven't Filled Proper Data", {
					title : "Alert", // default
					onClose : null, // default
				});

				// submit data into Viewmodel

			} else {
				var vFormData1 = JSON.parse(JSON.stringify(vFormData));
				oViewModel.getProperty("/Table").push(vFormData1);
				oViewModel.setProperty("/formData/fname", "");
				oViewModel.setProperty("/formData/lname", "");
				oViewModel.setProperty("/formData/number", "");
				oViewModel.setProperty("/formData/mobile", "");
				oViewModel.refresh(true);

			}

		},

		onTblRowClick : function(oEvent) {
			var sPath = oEvent.getSource().getBindingContextPath();
			// console.log(sPath);
		},

		onSelectRad : function(oEvent) {
			// Create array of gender
			var arr = [ 'male', 'female', 'other' ];
			var oIndex = oEvent.getParameter("selectedIndex");

			// Set data from array to form data
			var oViewModel = this.getView().getModel("viewModel");
			oViewModel.setProperty("/formData/gender", arr[oIndex]);
			oViewModel.refresh(true);

		},

		// Check date is less than today
		handleChange : function(oEvent) {

			var dob = oEvent.getParameter("value");

			// Compare date
			const d1 = new Date(dob);
			const d2 = new Date();

			const y1 = d1.getFullYear();
			const y2 = d2.getFullYear();

			console.log(y2 - y1);

			if (y2 - y1 < 0) {
				alert('Wrong date Input');
				// Reset DOB input
				var oViewModel = this.getView().getModel("viewModel");
				oViewModel.setProperty("/formData/dob", "");
			} 

		},

		fClearData : function(oEvent) {

			if (!this._cDialog) {
				this._cDialog = sap.ui.xmlfragment(
						"gautam.app.view.fragments.confirmPopup", this)
			}

			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(),
					this._cDialog);
			this._cDialog.open();

		},

		onPopupNo : function() {
			this._cDialog.close();
		},

		onPopupYes : function() {
			this._cDialog.close();

			var oViewModel = this.getView().getModel("viewModel");
			oViewModel.setProperty("/formData/fname", "");
			oViewModel.setProperty("/formData/lname", "");
			oViewModel.setProperty("/formData/number", "");
			oViewModel.setProperty("/formData/mobile", "");
			oViewModel.refresh(true);
		},

		onTblRowClick : function(oEvent) {
			var sPath = oEvent.getSource().getBindingContextPath();
			var name = this.getView().getModel("viewModel").getProperty(
					sPath + '/fname');

			// var oRouter = this.getOwnerComponent().getRouter();
			// oRouter.navTo('nameList', {
			// name : name
			// });

			console.log(name);
		}
	});

});