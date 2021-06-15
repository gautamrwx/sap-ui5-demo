jQuery.sap.declare("gautam.app.util.formatter");

gautam.app.util.formatter = {
		
		dateToYear : function(dateStr){
			
			var date = new Date(dateStr);
			const date2 = new Date();

			const y1 = date.getFullYear();
			const y2 = date2.getFullYear();

			return y2-y1+' Years Old';
		}
}