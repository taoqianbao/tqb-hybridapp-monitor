(function($) {
	'use strict';

	// charts default option
	var chartDefOption = window.myapp.chartDefOption;


	//近24小时来电原因占比TOP8(%)
	function render_Bar(ec, defaultTheme, chartid, onSuccessCallback) {
		// 基于准备好的dom，初始化echarts图表
		var _myChart = ec.init(document.getElementById(chartid), defaultTheme);

		var option = chartDefOption.barOption;

		_myChart.setOption(option, true);

		if (onSuccessCallback != null) {
			onSuccessCallback(_myChart);
		}

		return _myChart;
	}

	//近24小时来电原因占比TOP8(%)
	function refresh_Bar(myChart) {

		var option = myChart.getOption();
		window.myapp.service.ivrnode(function(result){
			var arrxAxis = [];
			var arrValue = [];			
			if(result!=null){
				for(var i=0; i< result.length; i++){
					arrxAxis.push(result[i]['memo4']);
					arrValue.push(toDecimal(result[i]['percent'] * 100 ));
				}
			}			
			option.xAxis[0].data = arrxAxis;//['账务', '额度', '开卡', '申办', '分期', '用卡咨询', '修改资料', '挂失'];
			option.series[0].data = arrValue;//[0, 0, 0, 10, 30, 40, 60, 70];
			// 为echarts对象加载数据 
			myChart.setOption(option, true);			
		});		
	}


	//仪表盘 - 接通率 66%
	function render_GaugeChart(ec, defaultTheme, chartid, onSuccessCallback,isMin) {

		// 基于准备好的dom，初始化echarts图表
		var _myChart = ec.init(document.getElementById(chartid), defaultTheme);

		var option = chartDefOption.guageOption;
		
		if(isMin){
			option = $.extend(true, option, {
				series: [{
					axisLine:{
						lineStyle:{
							width:8
						}
					}
				}]
			});
		}
		
		option.series[0].data[0].value = 0;

		_myChart.setOption(option, true);

		if (onSuccessCallback != null) {
			onSuccessCallback(_myChart);
		}

		return _myChart;

		//clearInterval(timeTicket);
		//timeTicket = setInterval(function (){
		//    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
		//    _myChart.setOption(option,true);
		//},2000)

	}

	//仪表盘 - 接通率 66%
	function refresh_GaugeChart(myChart, value) {

		var option = myChart.getOption();

		option.series[0].data[0].value = value;

		// 为echarts对象加载数据 
		myChart.setOption(option, true);
	}

	//仪表盘 - 服务级别 44%
	function render_GaugeChart2(ec, defaultTheme, chartid, onSuccessCallback, isMin) {

		// 基于准备好的dom，初始化echarts图表
		var _myChart = ec.init(document.getElementById(chartid), defaultTheme);

		var option = chartDefOption.gaugeservice;
		
		if(isMin){
			option = $.extend(true, option, {
				series: [{
					axisLine:{
						lineStyle:{
							width:8
						}
					}
				}]
			});
		}
		
		option.series[0].data[0].value = 0;
		_myChart.setOption(option, true);
		if (onSuccessCallback != null) {
			onSuccessCallback(_myChart);
		}
		return _myChart;
	}
	//仪表盘 - 服务级别 66%
	function refresh_GaugeChart2(myChart, value) {

		var option = myChart.getOption();

		option.series[0].data[0].value = value;

		// 为echarts对象加载数据 
		myChart.setOption(option, true);
	}

	//初始化中国地图
	function render_ChinaMap(ec, theme, mapdomid, onSuccessCallback, opts) {

		var $_mapid = $("#" + mapdomid);

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init($_mapid[0], theme);

		var option = chartDefOption.chinamap;

		if (opts != null) {
			option = $.extend(true, option, opts);
		}

		myChart.setOption(option, true);

		if (onSuccessCallback != null) {
			onSuccessCallback(myChart);
		}
	}

	//更新数据 - 中国地图
	function refresh_ChinaMap(myChart, onSuccessCallback) {

		var option = myChart.getOption();

		window.myapp.service.mapdata(function(result) {
			
			var keyName = 'myapp-chinamap-ds';
			sessionStorage.setItem(keyName, JSON.stringify(result));
			
			var jsond = window.myapp.service.mapdataFormat(result);
			
			var seriesdata1 = jsond['seriesdata1'];
			var seriesdata2 = jsond['seriesdata2'];

			option.series[0].data = seriesdata1;
			option.series[1].data = seriesdata2;

			// 为echarts对象加载数据 
			myChart.setOption(option, true);
			
			
			var datalist = [];
			for (var i = 0; i < seriesdata1.length; i++) {
				datalist.push({
					name: seriesdata1[i]['name'],
					a: toDecimal(seriesdata1[i]['value']),
					b: toDecimal(seriesdata1[i]['valueb'])
				});
			}
			var keyName = 'myapp-chinamap-datalist';
			sessionStorage.setItem(keyName, JSON.stringify(datalist));
			
			if (onSuccessCallback != null) {

				var strTop5acd = [];
				var strTop5callback = [];
				for (var i = 0; i < 5; i++) {
					strTop5acd.push(seriesdata1[i]['name']);
				}
				for (var i = 0; i < 5; i++) {
					strTop5callback.push(seriesdata2[i]['name']);
				}

				onSuccessCallback({
					'strTop5acd': strTop5acd.join(','),
					'strTop5callback': strTop5callback.join(',')
				});
			}

		});
	}

	//Bar图和line图
	function render_LineBar(ec, theme, domid, cityname) {

		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById(domid), theme);

		myChart.showLoading({
			text: "图表数据正在努力加载...",
			effect: 'whirling', //'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble'  
			textStyle: {
				fontSize: 20
			}
		});

		var option = chartDefOption.barline;

		// 为echarts对象加载数据 
		myChart.setOption(option, true);

		setTimeout(function() {
			myChart.hideLoading();
		}, 1000 * Math.random(2000, 3000));

		return myChart;
	}

	function refresh_LineBar(cityname, myChart) {

		if (myChart == null) return;

		if (cityname == null) {
			cityname = 'all';
		}

		window.myapp.service.linebar(cityname, function(d) {

			if (d == null) {
				myChart.hideLoading();
				return;
			}

			var option = myChart.getOption();
			if (option.series == null) {
				return;
			}

			var keyName = 'myapp-linebar-' + cityname;

			var old = sessionStorage.getItem(keyName);
			var strNew = JSON.stringify(d);
			if (old != strNew) {

				sessionStorage.setItem(keyName, strNew);

				option.series[0].data = d["series_d1"];
				option.series[1].data = d["series_d2"];
				option.series[2].data = d["series_d3"];
				option.series[3].data = d["series_d4"];

				myChart.showLoading({
					text: "图表数据正在努力加载...",
					effect: 'whirling',
					textStyle: {
						fontSize: 20
					}
				});

				myChart.setOption(option, true);

				//console.log('new update chart');
			}

			setTimeout(function() {
				myChart.hideLoading();
			}, 1000 * Math.random(2000, 3000));
		});
	}




	var chartlibs = {};

	chartlibs.drawChinaMap = render_ChinaMap;
	chartlibs.drawBar = render_Bar;
	chartlibs.drawGaugeChart = render_GaugeChart;
	chartlibs.drawGaugeChart2 = render_GaugeChart2;
	chartlibs.drawLineBar = render_LineBar;

	chartlibs.refreshChinaMap = refresh_ChinaMap;
	chartlibs.refreshBar = refresh_Bar;
	chartlibs.refreshGaugeChart = refresh_GaugeChart;
	chartlibs.refreshGaugeChart2 = refresh_GaugeChart2;
	chartlibs.refreshLineBar = refresh_LineBar;

	if (myapp == null || typeof myapp === "undefined") {
		window.myapp = {};
	}

	window.myapp.chartlibs = chartlibs;

})(jQuery);