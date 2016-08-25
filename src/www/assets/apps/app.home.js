(function($) {
	'use strict';

	$(document).ready(function() {

		initPage();
		$(window).resize(onEvent_Resize);

		function initPage() {
			onEvent_Resize();
		}

		function onEvent_Resize() {
			var _h = $(window).height();
			$("div.monitorapp-2015").height(_h);
		}

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
					
				}),
				tooltip: ko.observable({
					name: 'loading...',
					x: '0',
					y: '0'
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

		$("div.mapmodule").on("click", onEvent_mapModule);

		function onEvent_mapModule(e) {
			e.preventDefault();
			e.stopPropagation();
			
			//如果屏幕太小（非IPAD），就不允许进入详细页面
			if ($(window).width() < 1000) {
				return;
			}
			
			var tabid = $(this).data("tabid");
			if (isNaN(tabid)) {
				tabid = 0;
			}
			location.href = "layout.html?tabid=" + tabid;
		}

		//global map
		var chartListInstance = {};

		// charts default option		
		var _chartlibs = window.myapp.chartlibs;

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
				'echarts/chart/gauge',
				'echarts/chart/map'
			],
			requireCallback
		);

		function Charts_init(ec, defaultTheme) {

			var minOpts = {
				series: [{
					itemStyle: {
						normal: {
							label: {
								show: false
							}
						}
					}
				}]
			};

			//screen1 
			_chartlibs.drawChinaMap(ec, defaultTheme, 'chartChinaMap', function(chartObj) {
				chartListInstance['chartChinaMap'] = chartObj;
			}, minOpts);

			//screen2
			_chartlibs.drawGaugeChart(ec, defaultTheme, "chartGauge1", function(chartObj) {
				chartListInstance['chartGauge1'] = chartObj;
			}, true);
			_chartlibs.drawGaugeChart2(ec, defaultTheme, "chartGauge2", function(chartObj) {
				chartListInstance['chartGauge2'] = chartObj;
			}, true);
			chartListInstance['chartGauge'] = _chartlibs.drawLineBar(ec, defaultTheme, "chartGauge", 'all');

			//screen3

			//screen4,5,6,7
			chartListInstance['chartAreaSH'] = _chartlibs.drawLineBar(ec, defaultTheme, "chartAreaSH", '上海');
			chartListInstance['chartAreaSZ'] = _chartlibs.drawLineBar(ec, defaultTheme, "chartAreaSZ", '苏州');
			chartListInstance['chartAreaNN'] = _chartlibs.drawLineBar(ec, defaultTheme, "chartAreaNN", '南宁');
			chartListInstance['chartAreaTJ'] = _chartlibs.drawLineBar(ec, defaultTheme, "chartAreaTJ", '天津');

			//screen8
			chartListInstance['chartTopEightReson'] = _chartlibs.drawBar(ec, defaultTheme, "chartTopEightReson");

		}

		//监控报表刷新频率:服务级别、接通率、当日累计人工呼入量、客服工作人数、当前值班人数、队列等候通数及最长等候时间数据为1分钟刷新一次
		function Charts_UpdateData_OneMins() {

			//screen3
			refresh_Screen3('screen3');

			//screen2
			refresh_DetailInfo('all', 'screen2', function() {
				_chartlibs.refreshGaugeChart(chartListInstance['chartGauge1'], $("#chartGauge1").data("value"));
				_chartlibs.refreshGaugeChart2(chartListInstance['chartGauge2'], $("#chartGauge2").data("value"));
			});

			refresh_DetailInfo('上海', 'screen4');
			refresh_DetailInfo('苏州', 'screen5');
			refresh_DetailInfo('南宁', 'screen6');
			refresh_DetailInfo('天津', 'screen7');
			
			_chartlibs.refreshBar(chartListInstance['chartTopEightReson']);

		}

		//监控报表刷新频率:图表数据为15分钟刷新一次
		function Charts_UpdateData() {

			//screen1			
			_chartlibs.refreshChinaMap(chartListInstance['chartChinaMap'], function(){
				
				_myappchinamapds = null;
				
			});

			//
			_chartlibs.refreshLineBar('all', chartListInstance['chartGauge']);
			_chartlibs.refreshLineBar('上海', chartListInstance['chartAreaSH']);
			_chartlibs.refreshLineBar('苏州', chartListInstance['chartAreaSZ']);
			_chartlibs.refreshLineBar('南宁', chartListInstance['chartAreaNN']);
			_chartlibs.refreshLineBar('天津', chartListInstance['chartAreaTJ']);

		}
		
		//监控报表刷新频率:10秒刷新
		function Charts_UpdateData_TenSeconds() {
			
			chinaMap_RefreshToolTip();
		}

		var _myappchinamapds = null;
		var _myappchinamapds_index = 0;
		function chinaMap_RefreshToolTip() {

			if (_myappchinamapds == null) {
				_myappchinamapds_index = 0;
				var keyName = 'myapp-chinamap-ds';
				var ds = sessionStorage.getItem(keyName);
				if (ds != null) {
					_myappchinamapds = JSON.parse(ds);
				} else {
					return false;
				}
			}

			var val = {
				name: 'loading...',
				x: '0',
				y: '0'
			};
			var count = _myappchinamapds.length;
			if (_myappchinamapds_index < count) {
				var item = _myappchinamapds[_myappchinamapds_index++];
				if (item != null) {
					val = getPercentProvince(item);
				}
			}

			myViewModel['screen1'].tooltip(val);
		}
		

		function requireCallback(ec, defaultTheme) {

			Charts_init(ec, defaultTheme);

			Charts_UpdateData();

			Charts_UpdateData_OneMins();

			setTimeout(function() {

				setInterval(function() {
					Charts_UpdateData();
				}, CONST_RefreshChartTime);

			}, 500);

			setTimeout(function() {

				setInterval(function() {
					Charts_UpdateData_OneMins();
				}, CONST_RefreshInfoTime);

			}, 1000);
			
			setTimeout(function() {

				setInterval(function() {
					Charts_UpdateData_TenSeconds();
				}, CONST_RefreshMapTime);

			}, 1500);
			
		}

		function onErrorCallback(e) {

			var strErrMsg = '服务器返回错误';
			if (e.readyState == 0) {
				strErrMsg = "网络连接错误，无法连接到数据服务器";
			}
			$("#alertMessage-text").text(strErrMsg);
			$("#alertMessage").show();
		}

		/*
		 * refresh_Screen3
		 */
		function refresh_Screen3(appid) {

			window.myapp.service.highloss(function(result) {
				//{"throughrate_high":99.46,"servicelevel_high":98.38,"throughrate_loss":99.24,"servicelevel_loss":98.28}
				myViewModel[appid].content(result);

			});

		}

		/*
		 * appid = #screen2, 4,5,6,7
		 * DETAILS
		 */
		function refresh_DetailInfo(cityname, appid, callback) {

			window.myapp.service.detail(cityname, function(result) {

				var keyName = 'myapp-detailinfo-' + cityname;
				var old = sessionStorage.getItem(keyName);
				var strNew = JSON.stringify(result);

				if (old != strNew) {
					sessionStorage.setItem(keyName, strNew);
					myViewModel[appid].content(result);
				}

				if (callback != null) {
					callback();
				}

			});
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
	});

})(jQuery);