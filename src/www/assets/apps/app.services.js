(function($) {
	'use strict';	
	
	(function($,win){
			
		var services = {};
		
		function service_detail(cityname, successCallback,onErrorCallback) {
			//{"name":"苏州","throughrate":98.8228,"servicelevel":88.1936,"totalincallnum":19896,"totalcustomer":311,"totalonduty":29,"quenewaitnum":7,"maxwaittime":33}
			$.ajax({
				type: "GET",
				crossDomain: true,
				url: CONST_URLS_REPORTS_DETAIL + cityname,
				dataType: "json",
				success: successCallback,
				error: onErrorCallback
			});
		}

		function service_linebar(cityname, successCallback,onErrorCallback) {

			if (cityname == null) {
				cityname = 'all';
			}

			$.ajax({
				type: "GET",
				crossDomain: true,
				url: CONST_URLS_REPORTS_LINEBAR + cityname,
				dataType: "json",
				success: successCallback,
				error: onErrorCallback
			});

		}

		function service_highloss(successCallback,onErrorCallback) {

			$.ajax({
				type: "GET",
				crossDomain: true,
				url: CONST_URLS_REPORTS_HIGHLOSS,
				dataType: "json",
				success: successCallback,
				error: onErrorCallback
			});
		}

		/*china map data*/
		function service_mapdata(successCallback,onErrorCallback) {
			$.ajax({
				type: "GET",
				crossDomain: true,
				url: CONST_URLS_REPORTS_MAPDATA,
				dataType: "json",
				success: successCallback,
				error: onErrorCallback
			});
		}
		
//		function service_mapdataSeries(successCallback,onErrorCallback){
//		
//			service_mapdata(function(result){
//				
//				return service_mapdataFormat(result);
//				
//			}, onErrorCallback);
//		
//		}
		

		function service_mapdataFormat(rows) {

			var seriesdata1 = [],
				seriesdata2 = [];

			if (rows != null && rows.length > 0) {

				var len = rows.length;

				//用全部的进线量除以全部的发卡量得出平均值
				var avg = rows[0]['alltotalacd'] / rows[0]['allcardnum'];

				for (var i = 0; i < len; i++) {

					var row = rows[i];

					seriesdata1.push({
						name: row['provincename'],
						value: row['totalacd'] / row['alltotalacd'],
						valueb: row['totalacd'] / row['cardnum'] / avg
					});

					seriesdata2.push({
						name: row['provincename'],
						value: row['totalacd'] / row['cardnum'] / avg,
					});
				}
			}
			seriesdata1.sort(getSortFun('desc', 'value'));
			seriesdata2.sort(getSortFun('desc', 'value'));

			var mapModel = {
				'seriesdata1': seriesdata1,
				'seriesdata2': seriesdata2
			};

			return mapModel;
		}
								
		function service_ivrnode(successCallback,onErrorCallback) {

			$.ajax({
				type: "GET",
				crossDomain: true,
				url: CONST_URLS_REPORTS_IVRNODE,
				dataType: "json",
				success: successCallback,
				error: onErrorCallback
			});
		}				
				
		services.detail = service_detail;
		services.linebar = service_linebar;
		services.highloss = service_highloss;
		services.mapdata = service_mapdata;
		services.mapdataFormat = service_mapdataFormat;
		services.ivrnode = service_ivrnode;
		
		win.myapp.service = services;
		
	})(jQuery, window);
	
})(jQuery);