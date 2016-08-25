(function($) {
	'use strict';

	(function($, win) {

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
				y2: 60
			},
			legend: {
				y: 'bottom',
				data: ['人工呼入', '人工挂起', '服务级别', '接通率']
			},
			xAxis: [{
				show: false,
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
				show: false,
				trigger: 'item',
				backgroundColor: '#fffbd6',
				textStyle: {
					color: '#c7943c',
					align: 'center'
				},
				borderColor: '#dacf9d',
				borderWidth: 2,
				padding: 5,
				//				position: function() {
				//					var $_mapid = $("#chartChinaMap");
				//					var newx = $_mapid.width();
				//					var newy = $_mapid.height() / 2;
				//					return [newx, newy];
				//				},
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
			dataRange: {
				show: false,
				min: 0,
				max: 100,
				calculable: true
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
							show: true
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

		//仪表盘 - 服务级别 44%
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
						width: 20
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
		
		//仪表盘 - 接通率 66%
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

		myapp.chartDefOption.barOption = {
			title: {
				show: true,
				x: 'center',
				y: 'top',
				textStyle: {
					fontSize: 12,
					fontWeight: 'bolder'
				},
				text: '近24小时来电原因占比TOP8(%)'
			},
			grid: {
				x: 50,
				y: 50,
				x2: 20,
				y2: 50
			},
			tooltip: {
				show: true,
				trigger: 'axis'
			},
			legend: {
				show: false,
				data: ['百分比']
			},
			toolbox: {
				show: false
			},
			calculable: false,
			xAxis: [{
				type: 'category',
				data: ['Name1', 'Name2', 'Name3', 'Name4', 'Name5', 'Name6', 'Name7', 'Name8']
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: '百分比',
				type: 'bar',
				data: [0, 0, 0, 0, 0, 0, 0, 0],
				itemStyle: {
					normal: {
						label: {
							show: true
						}
					}
				}
			}]
		};

		win.myapp = myapp;

	})(jQuery, window);

})(jQuery);