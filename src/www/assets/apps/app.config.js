var CONST_VERSION = 100; //版本号

//刷新服务器数据间隔
var CONST_RefreshInfoTime = 60000; //1000 * 60 * 1
//监控报表刷新频率:图表数据为15分钟刷新一次
var CONST_RefreshChartTime = 900000; //1000 * 60 * 15
//中国地图刷新 TOOLTIP和右下角实际数据 每10秒更新一组
var CONST_RefreshMapTime = 10000;		

var CONST_URLS_REPORTS_DOMAIN = 'http://218.97.6.225:4992/';
var CONST_URLS_REPORTS_DETAIL = 'http://218.97.6.225:4992/reports/detail/';
var CONST_URLS_REPORTS_LINEBAR = 'http://218.97.6.225:4992/reports/linebar/';
var CONST_URLS_REPORTS_HIGHLOSS = 'http://218.97.6.225:4992/reports/highloss';
var CONST_URLS_REPORTS_MAPDATA = 'http://218.97.6.225:4992/reports/mapdata';
var CONST_URLS_REPORTS_IVRNODE = 'http://218.97.6.225:4992/reports/ivrnode';