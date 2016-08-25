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

function getQueryStringByName(name) {
	var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
}

//省进线量占比 / 每百万回拨量占比

function getPercentProvince(item) {
	if (item == null) {
		return {
			name: 'NULL',
			x: 0,
			y: 0
		}
	}
	//用全部的进线量除以全部的发卡量得出平均值
	var avg = item['alltotalacd'] / item['allcardnum'];
	return {
		name: item['provincename'],
		x: toDecimal(item['totalacd'] / item['alltotalacd']),
		y: toDecimal(item['totalacd'] / item['cardnum'] / avg)
	};

}