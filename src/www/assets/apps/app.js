(function($) {
	'use strict';
	
	var CONST_VERSION = 100; 	//版本号
	
	//刷新服务器数据间隔
	var CONST_RefreshInfoTime = 60000; 		//1000 * 60 * 1
	//监控报表刷新频率:图表数据为15分钟刷新一次
	var CONST_RefreshChartTime = 900000;	//1000 * 60 * 15
	
	//var CONST_URLS_REPORTS_DOMAIN = 'http://localhost:3000/';
	//var CONST_URLS_REPORTS_DETAIL = 'http://localhost:3000/reports/detail/';
	//var CONST_URLS_REPORTS_LINEBAR = 'http://localhost:3000/reports/linebar/';
	//var CONST_URLS_REPORTS_HIGHLOSS = 'http://localhost:3000/reports/highloss';
	//var CONST_URLS_REPORTS_MAPDATA = 'http://localhost:3000/reports/mapdata';		
	//
	
	var CONST_URLS_REPORTS_DOMAIN = 'http://218.97.6.225:4992/';
	var CONST_URLS_REPORTS_DETAIL = 'http://218.97.6.225:4992/reports/detail/';
	var CONST_URLS_REPORTS_LINEBAR = 'http://218.97.6.225:4992/reports/linebar/';
	var CONST_URLS_REPORTS_HIGHLOSS = 'http://218.97.6.225:4992/reports/highloss';
	var CONST_URLS_REPORTS_MAPDATA = 'http://218.97.6.225:4992/reports/mapdata';
	
	function toDecimal(x) {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return;
		}
		f = Math.round(x * 100) / 100;
		return f;
	}

	function getSortFun(order, sortBy) {
		var ordAlpah = (order == 'asc') ? '>' : '<';
		var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
		return sortFun;
	}
	
	(function($,win){
		
		var myapp = {};
		
		myapp.chartDefOption = {};		
		
		myapp.chartDefOption.barline = {
			tooltip: {
				show: true
			},
			grid: {
				x: 50,
				y: 10,
				x2: 30,
				y2: 80
			},
			legend: {
				y: 'bottom',
				data: ['人工呼入', '人工挂起', '服务级别', '接通率']
			},
			xAxis: [{
				type: 'category',
				data: ["00：00", "07：00", "09：00", "11：00", "13：00", "15：00", "17：00", "19：00", "21：00", "24：00"]
			}],
			yAxis: [{
				type: 'value',
				name: '数量'
			}, {
				type: 'value',
				name: '百分比'
			}],
			series: [{
				"name": "人工呼入",
				"type": "bar",
				"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}, {
				"name": "人工挂起",
				"type": "bar",
				"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}, {
				"name": "服务级别",
				"type": "line",
				yAxisIndex: 1,
				"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}, {
				"name": "接通率",
				"type": "line",
				yAxisIndex: 1,
				"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}]
		};

		myapp.chartDefOption.chinamap = {
			title: {
				show: false
			},
			tooltip: {
				show: true,
				trigger: 'item',
				backgroundColor: '#fffbd6',
				textStyle: {
					color: '#c7943c',
					align: 'center'
				},
				borderColor: '#dacf9d',
				borderWidth: 2,
				padding: 5,
				position: function() {
					var $_mapid = $("#chartChinaMap");
					var newx = $_mapid.width();
					var newy = $_mapid.height() / 2;
					return [newx, newy];
				},
				formatter: function(o) {
					var x = 0;
					var y = 0;
					if (o["data"] != null) {

						if (o["data"].valueMap != null) {
							x = o["data"].valueMap[0];
						}
						if (o["data"].valueMap != null) {
							y = o["data"].valueMap[1];
						}
					}

					return o[1] + "<br>" + "省份进线量占比：" + toDecimal(x) + "%<br>" + "每百万回拨量占比：" + toDecimal(y) + "%"
				}
			},
			legend: {
				show: false,
				orient: 'vertical',
				x: 'left',
				data: ['进线量', '回拨量']
			},
			series: [{
				name: '进线量',
				type: 'map',
				mapType: 'china',
				selectedMode: 'single',
				hoverable: false,
				itemStyle: {
					normal: {
						label: {
							show: false
						},
						borderWidth: 1,
						borderColor: '#fff',
						color: '#39c2f4'
					},
					emphasis: {
						label: {
							show: true
						}
					}
				},
				data: []
					//				,
					//				markPoint : {
					//	                symbol:'circle',
					//	                symbolSize : function (v){
					//	                    return 10 + v/10
					//	                },
					//	                effect : {
					//	                    show: true,
					//	                    shadowBlur : 0,
					//	                    color :'#ff0000'
					//	                },
					//	                itemStyle:{
					//	                    normal:{
					//	                        label:{show:false}
					//	                    }
					//	                },
					//	                /*上海、苏州、天津、南宁、兰州*/
					//	                data : [
					//	                    {name:'上海'},
					//	                    {name:'苏州'},
					//	                    {name:'天津'},
					//	                    {name:'南宁'}
					//	                    //,{name:'兰州'}
					//	                ]
					//	                
					//	            }
			}, {
				name: '回拨量',
				type: 'map',
				mapType: 'china',
				itemStyle: {
					normal: {
						label: {
							show: true
						}
					},
					emphasis: {
						label: {
							show: true
						}
					}
				},
				data: []
					//				
					//				,markPoint : {
					//	                symbol:'circle',
					//	                symbolSize : function (v){
					//	                    return 10 + v/10
					//	                },
					//	                effect : {
					//	                    show: true,
					//	                    shadowBlur : 0,
					//	                    color :'#00ff00'
					//	                },
					//	                itemStyle:{
					//	                    normal:{
					//	                        label:{show:false}
					//	                    }
					//	                },
					//	                data : [
					//	                    {name:'兰州'}
					//	                ]
					//	                
					//	            }
			}]
		};

		myapp.chartDefOption.gauge = {
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%"
			},
			series: [{
				name: '业务指标',
				type: 'gauge',
				splitNumber: 5, // 分割段数，默认为5
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: [
							[0.2, '#228b22'],
							[0.8, '#48b'],
							[1, '#ff4500']
						],
						width: 8
					}
				},
				axisTick: { // 坐标轴小标记
					splitNumber: 5, // 每份split细分多少段
					length: 12, // 属性length控制线长
					lineStyle: { // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
					textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color: 'auto'
					}
				},
				splitLine: { // 分隔线
					show: true, // 默认显示，属性show控制显示与否
					length: 30, // 属性length控制线长
					lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},
				pointer: {
					width: 5
				},
				title: {
					show: true,
					offsetCenter: [0, '90%'], // x, y，单位px
					textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder'
					}
				},
				detail: {
					formatter: '{value}%',
					textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color: 'auto',
						fontWeight: 'bolder'
					}
				},
				data: [{
					value: 50,
					name: '接通率'
				}]
			}]
		};

		myapp.chartDefOption.gaugeservice = {
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%"
			},
			series: [{
				name: '业务指标',
				type: 'gauge',
				splitNumber: 5, // 分割段数，默认为5
				startAngle: 180,
				endAngle: 0,
				axisLine: { // 坐标轴线
					lineStyle: { // 属性lineStyle控制线条样式
						color: [
							[0, '#ff2d00'],
							[0.1, '#ff3f00'],
							[0.2, '#fb5500'],
							[0.3, '#ff7e00'],
							[0.4, '#ed9700'],
							[0.5, '#ffe100'],
							[0.6, '#dbef00'],
							[0.7, '#4ca900'],
							[0.8, '#109810'],
							[0.9, '#008600'],
							[1, '#008300']
						],
						width: 8
					}
				},
				axisTick: { // 坐标轴小标记
					splitNumber: 5, // 每份split细分多少段
					length: 12, // 属性length控制线长
					lineStyle: { // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
					textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color: 'auto'
					}
				},
				splitLine: { // 分隔线
					show: true, // 默认显示，属性show控制显示与否
					length: 30, // 属性length控制线长
					lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},
				pointer: {
					width: 5
				},
				title: {
					show: false
				},
				detail: {
					show: true,
					backgroundColor: 'rgba(2,112,200,10)', //rgba(0,0,0,0)
					borderWidth: 0,
					width: 100,
					height: 22,
					offsetCenter: [0, 10], // x, y，单位px
					formatter: '服务级别 {value}%',
					textStyle: {
						color: '#fff',
						fontSize: 12
					}
				},
				data: [{
					value: 30,
					name: '服务级别'
				}]
			}]
		};

		myapp.chartDefOption.guageOption = {
			tooltip: {
				formatter: "{a} <br/>{b} : {c}%"
			},
			toolbox: {
				show: false
			},
			series: [{
				name: '接通率',
				type: 'gauge',
				center: ['50%', '50%'], // 默认全局居中
				radius: [0, '75%'],
				startAngle: 180,
				endAngle: 0,
				min: 0, // 最小值
				max: 100, // 最大值
				precision: 0, // 小数精度，默认为0，无小数点
				splitNumber: 5, // 分割段数，默认为5
				axisLine: { // 坐标轴线
					show: true, // 默认显示，属性show控制显示与否
					lineStyle: { // 属性lineStyle控制线条样式
						color: [
							[0, '#ff2d00'],
							[0.1, '#ff3f00'],
							[0.2, '#fb5500'],
							[0.3, '#ff7e00'],
							[0.4, '#ed9700'],
							[0.5, '#ffe100'],
							[0.6, '#dbef00'],
							[0.7, '#4ca900'],
							[0.8, '#109810'],
							[0.9, '#008600'],
							[1, '#008300']
						],
						width: 20
					}
				},
				axisTick: { // 坐标轴小标记
					show: true, // 属性show控制显示与否，默认不显示
					splitNumber: 5, // 每份split细分多少段
					length: 8, // 属性length控制线长
					lineStyle: { // 属性lineStyle控制线条样式
						color: '#eee',
						width: 1,
						type: 'solid'
					}
				},
				axisLabel: { // 坐标轴文本标签，详见axis.axisLabel
					show: true,
					interval: 'auto',
					margin: 24,
					textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						color: '#333'
					}
				},
				splitLine: { // 分隔线
					show: true, // 默认显示，属性show控制显示与否
					length: 20, // 属性length控制线长
					lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto',
						width: 2,
						type: 'solid'
					}
				},
				pointer: {
					length: '80%',
					width: 5,
					color: 'auto'
				},
				title: {
					show: false
				},
				detail: {
					show: true,
					backgroundColor: 'rgba(2,112,200,10)', //rgba(0,0,0,0)
					borderWidth: 0,
					width: 100,
					height: 22,
					offsetCenter: [0, 10], // x, y，单位px
					formatter: '接通率{value}%',
					textStyle: {
						color: '#fff',
						fontSize: 12
					}
				},
				data: [{
					value: 50,
					name: '接通率'
				}]
			}]
		};
		
		win.myapp = myapp;
		
	})(jQuery, window);
	
	$(document).ready(function() {
		
		sessionStorage.clear();

		if (typeof ko === "undefined") {
			throw "knockoutjs not loaded ok.";
		}

		var isFullscreen = function() {
			return $("#myapp").hasClass("fullscreen");
		}

		var myViewModel = {
			screen1: {
				content: ko.observable({
					strTop5acd: 'loading...',
					strTop5callback: 'loading...',
					datalist: [{
						name: 'loading...',
						a: 0,
						b: 0
					}, {
						name: 'loading...',
						a: 0,
						b: 0
					}, {
						name: 'loading...',
						a: 0,
						b: 0
					}, {
						name: 'loading...',
						a: 0,
						b: 0
					}, {
						name: 'loading...',
						a: 0,
						b: 0
					}]
				})
			},
			screen2: {
				content: ko.observable({
					maxwaittime: 0,
					name: "all",
					quenewaitnum: 0,
					servicelevel: 0,
					throughrate: 0,
					totalcustomer: 0,
					totalincallnum: 0,
					totalonduty: 0
				}),
				data: []
			},
			screen3: {
				content: ko.observable({
					throughrate_high: 0,
					servicelevel_high: 0,
					throughrate_loss: 0,
					servicelevel_loss: 0
				}),
				data: []
			},
			screen4: {
				content: ko.observable({
					maxwaittime: 0,
					name: "all",
					quenewaitnum: 0,
					servicelevel: 0,
					throughrate: 0,
					totalcustomer: 0,
					totalincallnum: 0,
					totalonduty: 0
				}),
				data: []
			},
			screen5: {
				content: ko.observable({
					maxwaittime: 0,
					name: "all",
					quenewaitnum: 0,
					servicelevel: 0,
					throughrate: 0,
					totalcustomer: 0,
					totalincallnum: 0,
					totalonduty: 0
				}),
				data: []
			},
			screen6: {
				content: ko.observable({
					maxwaittime: 0,
					name: "all",
					quenewaitnum: 0,
					servicelevel: 0,
					throughrate: 0,
					totalcustomer: 0,
					totalincallnum: 0,
					totalonduty: 0
				}),
				data: []
			},
			screen7: {
				content: ko.observable({
					maxwaittime: 0,
					name: "all",
					quenewaitnum: 0,
					servicelevel: 0,
					throughrate: 0,
					totalcustomer: 0,
					totalincallnum: 0,
					totalonduty: 0
				}),
				data: []
			}
		};

		ko.applyBindings(myViewModel, $("#myapp")[0]);

		$("#btnRefreshData").bind('click', function(e) {
			Charts_UpdateData();
		});

		$("a.map-fs-exit").bind("click", onEvent_mapExistFullScreen);
		$("div.mapmodule").on("click", onEvent_mapModule);
		
		function onEvent_mapExistFullScreen(e){
			
			var mapmodule = $(this).parent(".mapmodule");
			$("div.monitorapp").removeClass("fullscreen");
			$(mapmodule).removeClass("mapfullscreen");
			var chartName = $(this).data("mapid");
			if (chartListInstance.hasOwnProperty(chartName)) {

				if (chartName == "chartChinaMap") {
					var chartChinaMap = chartListInstance["chartChinaMap"];
					chartChinaMap.setOption({
						series: [{
							itemStyle: {
								normal: {
									label: {
										show: false
									}
								}
							}
						}]
					});
					chartChinaMap.refresh();
				}


				if (chartName == "chartChinaMap") {
					onResize_Screen1();
				}
				chartListInstance[chartName].resize();

				if (chartName == "chartGauge") {

					var chartG1 = chartListInstance["chartGauge1"];
					gaugeResize(chartG1);

					var chartG2 = chartListInstance["chartGauge2"];
					gaugeResize(chartG2);

				}
			}

			e.preventDefault();
			e.stopPropagation();
		}
		
		function onEvent_mapModule(e){
			e.preventDefault();
			e.stopPropagation();

			var chartName = $(this).data("mapid");

			if (!$("div.monitorapp").hasClass("fullscreen")) {

				$("div.monitorapp").addClass("fullscreen");

				$(this).addClass("mapfullscreen");

			} else {
				return;
				//$("div.monitorapp").removeClass("fullscreen");
				//$(this).removeClass("mapfullscreen");
				//
			}

			if (chartListInstance.hasOwnProperty(chartName)) {

				if (chartName == "chartChinaMap") {
					onResize_Screen1();
				}

				chartListInstance[chartName].resize();

				if (chartName == "chartGauge") {

					var chartG1 = chartListInstance["chartGauge1"];
					gaugeResize(chartG1);

					var chartG2 = chartListInstance["chartGauge2"];
					gaugeResize(chartG2);

				}
			}
		}

		function onResize_Screen1() {

			var chartChinaMap = chartListInstance["chartChinaMap"];

			if ($("#myapp").hasClass("fullscreen")) {

				if (!Modernizr.csscalc) {
					var _h = $(window).height() - $('#screen1 .tableone').height();
					$("#chartChinaMap").height(_h);
				}

				chartChinaMap.setOption({
					series: [{
						itemStyle: {
							normal: {
								label: {
									show: true
								}
							}
						}
					}]
				});

			} else {
				if (!Modernizr.csscalc) {

					var _h = $('#screen1').height() - $('#screen1 .tableone').height() * 2;
					$("#chartChinaMap").height(_h);
				}

				chartChinaMap.setOption({
					series: [{
						itemStyle: {
							normal: {
								label: {
									show: false
								}
							}
						}
					}]
				});
			}
			chartChinaMap.refresh();
		}

		function gaugeResize(chartObj) {

			if (chartObj == null) {
				return;
			}

			if (isFullscreen()) {
				chartObj.setOption({
					series: [{
						detail: {
							width: 140,
							height: 30,
							textStyle: {
								fontSize: 18
							}
						}
					}]
				});

			} else {
				chartObj.setOption({
					series: [{
						detail: {
							width: 100,
							height: 22,
							textStyle: {
								fontSize: 12
							}
						}
					}]
				});
			}
			chartObj.resize();
		}

		//global map
		var chartListInstance = {};

		// charts default option
		var chartDefOption = window.myapp.chartDefOption;
		
		// 路径配置
		require.config({
			paths: {
				echarts: './assets/js/echarts/dist'
			}
		});

		require(
			[
				'echarts',
				'echarts/theme/shine',
				'echarts/chart/line',
				'echarts/chart/bar',
				//'echarts/chart/scatter',
				//'echarts/chart/k',
				//'echarts/chart/pie',
				//'echarts/chart/radar',
				//'echarts/chart/force',
				//'echarts/chart/chord',
				'echarts/chart/gauge',
				//'echarts/chart/funnel',
				//'echarts/chart/eventRiver',
				//'echarts/chart/venn',
				//'echarts/chart/treemap',
				//'echarts/chart/tree',
				//'echarts/chart/wordCloud',
				//'echarts/chart/heatmap',
				'echarts/chart/map'
			],
			requireCallback
		);

		function Charts_init(ec, defaultTheme) {
			
			//screen1 
			render_ChinaMap(ec, defaultTheme, 'chartChinaMap', function(chartObj) {
				chartListInstance['chartChinaMap'] = chartObj;
			});

			//screen2
			render_GaugeChart(ec, defaultTheme, "chartGauge1", function(chartObj) {
				chartListInstance['chartGauge1'] = chartObj;
			});
			render_GaugeChart2(ec, defaultTheme, "chartGauge2", function(chartObj) {
				chartListInstance['chartGauge2'] = chartObj;
			});
			chartListInstance['chartGauge'] = render_LineBar(ec, defaultTheme, "chartGauge", 'all');

			//screen3
			
			//screen4,5,6,7
			chartListInstance['chartAreaSH'] = render_LineBar(ec, defaultTheme, "chartAreaSH", '上海');
			chartListInstance['chartAreaSZ'] = render_LineBar(ec, defaultTheme, "chartAreaSZ", '苏州');
			chartListInstance['chartAreaNN'] = render_LineBar(ec, defaultTheme, "chartAreaNN", '南宁');
			chartListInstance['chartAreaTJ'] = render_LineBar(ec, defaultTheme, "chartAreaTJ", '天津');
		}
		
		//监控报表刷新频率:服务级别、接通率、当日累计人工呼入量、客服工作人数、当前值班人数、队列等候通数及最长等候时间数据为1分钟刷新一次
		function Charts_UpdateData_OneMins() {
						
			//screen3
			refresh_Screen3('screen3');
			
			//screen2
			refresh_DetailInfo('all', 'screen2', function(){
				refresh_GaugeChart(chartListInstance['chartGauge1']);
				refresh_GaugeChart2(chartListInstance['chartGauge2']);
			});
			
			refresh_DetailInfo('上海', 'screen4');
			refresh_DetailInfo('苏州', 'screen5');
			refresh_DetailInfo('南宁', 'screen6');
			refresh_DetailInfo('天津', 'screen7');
			
		}
		
		//监控报表刷新频率:图表数据为15分钟刷新一次
		function Charts_UpdateData() {

			//screen1			
			refresh_ChinaMap(chartListInstance['chartChinaMap']);			

			//
			refresh_LineBar('all', chartListInstance['chartGauge']);
			refresh_LineBar('上海', chartListInstance['chartAreaSH']);
			refresh_LineBar('苏州', chartListInstance['chartAreaSZ']);
			refresh_LineBar('南宁', chartListInstance['chartAreaNN']);
			refresh_LineBar('天津', chartListInstance['chartAreaTJ']);

		}

		function requireCallback(ec, defaultTheme) {
						
			Charts_init(ec, defaultTheme);

			Charts_UpdateData();
			
			Charts_UpdateData_OneMins();
			
			setTimeout(function() {

				setInterval(function() {
					Charts_UpdateData();
				}, CONST_RefreshChartTime);

			}, 2000);
			
			setTimeout(function() {

				setInterval(function() {
					Charts_UpdateData_OneMins();
				}, CONST_RefreshInfoTime);

			}, 2000);
				
				
			
		}

		function onErrorCallback(e) {
			
			var strErrMsg = '服务器返回错误';

			if (e.readyState == 0) {
				strErrMsg = "网络连接错误，无法连接到数据服务器";
			}

			$("#alertMessage-text").text(strErrMsg);
			$("#alertMessage").show();

			//setTimeout(function() {
			//$("#alertMessage").hide();
			//}, 3000);
		}

		function service_detail(cityname, successCallback) {
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

		function service_linebar(cityname, successCallback) {

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

		function service_highloss(successCallback) {

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
		function service_mapdata(successCallback) {
			$.ajax({
				type: "GET",
				crossDomain: true,
				url: CONST_URLS_REPORTS_MAPDATA,
				dataType: "json",
				success: successCallback,
				error: onErrorCallback
			});
		}

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

		/*
		 * refresh_Screen3
		 */
		function refresh_Screen3(appid) {

			service_highloss(function(result) {

				//{"throughrate_high":99.46,"servicelevel_high":98.38,"throughrate_loss":99.24,"servicelevel_loss":98.28}
				myViewModel[appid].content(result);

			});

		}

		/*
		 * appid = #screen2, 4,5,6,7
		 * DETAILS
		 */
		function refresh_DetailInfo(cityname, appid, callback) {
			
			service_detail(cityname, function(result) {				
				
				var keyName = 'myapp-detailinfo-'+cityname;				
				var old = sessionStorage.getItem(keyName);
				var strNew = JSON.stringify(result); 
				
				if(old != strNew){					
					sessionStorage.setItem(keyName, strNew);					
					myViewModel[appid].content(result);					
				}
				
				if(callback!=null){
					callback();
				}
				
			});
		}

		function refresh_LineBar(cityname, myChart) {
			
			if(myChart==null) return;
			
			if (cityname == null) {
				cityname = 'all';
			}			

			service_linebar(cityname, function(d) {
				
				//console.log(cityname + 'refresh_LineBar data requrest ');
				
				if (d == null) {
					myChart.hideLoading();
					return;
				}

				var option = myChart.getOption();
				if (option.series == null) {
					return;
				}
				
				var keyName = 'myapp-linebar-'+cityname;
				
				var old = sessionStorage.getItem(keyName);
				var strNew = JSON.stringify(d); 
				if(old != strNew){
					
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

		//Bar图和line图
		function render_LineBar(ec, defaultTheme, chartid, cityname) {

			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(chartid), defaultTheme);

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

		//更新数据 - 中国地图
		function refresh_ChinaMap(myChart) {

			var option = myChart.getOption();

			service_mapdata(function(result) {

				var jsond = service_mapdataFormat(result);
				var seriesdata1 = jsond['seriesdata1'];
				var seriesdata2 = jsond['seriesdata2'];

				option.series[0].data = seriesdata1;
				option.series[1].data = seriesdata2;

				// 为echarts对象加载数据 
				myChart.setOption(option, true);


				var strTop5acd = [];
				var strTop5callback = [];
				var datalist = [];

				for (var i = 0; i < 5; i++) {
					strTop5acd.push(seriesdata1[i]['name']);
					datalist.push({
						name: seriesdata1[i]['name'],
						a: toDecimal(seriesdata1[i]['value']),
						b: toDecimal(seriesdata1[i]['valueb'])
					});
				}
				for (var i = 0; i < 5; i++) {
					strTop5callback.push(seriesdata2[i]['name']);
				}

				myViewModel['screen1'].content({
					'strTop5acd': strTop5acd.join(','),
					'strTop5callback': strTop5callback.join(','),
					'datalist': datalist
				});


			});

		}

		//初始化中国地图
		function render_ChinaMap(ec, defaultTheme, mapid, onSuccessCallback) {
			var $_mapid = $("#" + mapid);
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init($_mapid[0], defaultTheme);
			var option = chartDefOption.chinamap;
			myChart.setOption(option, true);
			
//			var ecConfig = require('echarts/config');
//			
//			myChart.on(ecConfig.EVENT.PIE_SELECTED, function (param, echart) {
//				console.log("PIE_SELECTED");
//				console.log(param.data);
//				console.log(myChart === echart);
//			});
//			
//			myChart.on(ecConfig.EVENT.CLICK, function (param, echart) {								
//				console.log("CLICK");
//				console.log(param.data);
//				console.log(myChart === echart);
//				
//			});			
			
			if (onSuccessCallback != null) {
				onSuccessCallback(myChart);
			}
		}

		//定时刷新中国地图 - 依次选中某省 (TOOLTIP有问题，暂时未实现)
		function setIntervalForChinaMap(myChart) {
			if (window.ChinaInterval != null) {
				window.clearInterval(window.ChinaInterval);
				window.ChinaInterval = null;
			}

			window.ChinaInterval = setInterval(function() {

				var option = myChart.getOption();
				var datas = option.series[0].data;

				for (var i = 0; i < datas.length; i++) {
					datas[i].selected = false;
				}

				if (window.ChinaMapdataIndex >= datas.length) {
					window.ChinaMapdataIndex = 0;
				}


				option.series[0].data[window.ChinaMapdataIndex++].selected = true;
				option.tooltip.show = true;


				myChart.setOption(option, true);

			}, 1000 * 10);
		}

		//仪表盘 - 接通率 66%
		function refresh_GaugeChart(myChart) {

			var option = myChart.getOption();

			option.series[0].data[0].value = $("#chartGauge1").data("value");

			// 为echarts对象加载数据 
			myChart.setOption(option, true);
		}

		//仪表盘 - 接通率 66%
		function render_GaugeChart(ec, defaultTheme, chartid, onSuccessCallback) {

			// 基于准备好的dom，初始化echarts图表
			var _myChart = ec.init(document.getElementById(chartid), defaultTheme);

			var option = chartDefOption.guageOption;

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

		//仪表盘 - 服务级别 66%
		function refresh_GaugeChart2(myChart) {

			var option = myChart.getOption();

			option.series[0].data[0].value = $("#chartGauge2").data("value");

			// 为echarts对象加载数据 
			myChart.setOption(option, true);
		}

		//仪表盘 - 服务级别 44%
		function render_GaugeChart2(ec, defaultTheme, chartid, onSuccessCallback) {

			// 基于准备好的dom，初始化echarts图表
			var _myChart = ec.init(document.getElementById(chartid), defaultTheme);

			var option = chartDefOption.gaugeservice;
			option.series[0].data[0].value = 0;
			_myChart.setOption(option, true);
			if (onSuccessCallback != null) {
				onSuccessCallback(_myChart);
			}
			return _myChart;

		}

	});

})(jQuery);