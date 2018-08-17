var maintable;

$(function(){
	// 加载国际化提示信息
	loadBundles();
  
	// 分页查询表格初始化
	initGrid();
//	$.imps_showLoading("");
	maintable.bindData();
	
	$('#accumulateStatus').unbind('change').bind('change',function(){
		//console.info($(this).val());
		$('#mileage-details').html('');
		$('#mileage-details').find('.data_nt').remove();
		initGrid();
		maintable.bindData();
	});
});

function loadBundles() {
	// 2014-3-12 huzheyi
	var lang = null;
	if (langJsp != null) {
		lang = langJsp;
	} else {
		lang = Common.Cookie.get('language');
	}
	jQuery.i18n.properties({
		name : 'common',// 资源文件名称
		path : $ECS_PATH + 'messages/',// 资源文件所在目录路径
		mode : 'map',// 模式：变量或 Map
		language : lang,// Common.Cookie.get('language'),// 从cookie获取语言
		cache : true,
		encoding : 'UTF-8',
		callback : function() {
			// 加载完回调
		}
	});
	// 2014-3-12 huzheyi
}
function initGrid() {
	maintable = new ECSGrid({
		url : $ECS_PATH + "mileage/myMileageDetailList.do",
		searchform : "mileageDetailState",// 查询条件,
		renderTo : "mileage-details",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		oddClass : "gray",
		evenClass : "lightblue",
		pageSize : 10,
//		complete : "searchComplete",
		columns : [ {
			headerText : $.i18n.prop("mileage.ticketNum+couponNum"),
			dataField : "ticketNo.couponno",
			width : 120
		}, {
			headerText : $.i18n.prop("mileage.flightNo"),
			dataField : "flightNo",
			width : 120
		}, {
			headerText : $.i18n.prop("mileage.cabin"),
			dataField : "cabin",
			width : 120
		}, {
			headerText : $.i18n.prop("mileage.departureDate"),
			dataField : "carrageDate",
			width : 90
		}, {
			headerText : $.i18n.prop("mileage.inputDate"),
			dataField : "recordTime",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.cumulativeDate"),
			dataField : "accumulateTime",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.cumulativeType"),//"累计方式",
			dataField : "addWay",
			handler: "addWayShow",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.status"),
			dataField : "accumulateStatus",
			handler: "accumulateStatusShow",
			width : 90
		},{
			headerText : $.i18n.prop("mileage.easymiles"),
			dataField : "rewardMileage",
			width : 120,
			isNumber : true
		}]
	});
}
//累计方式展示
function addWayShow(row,col){
	var oldDate = row[col.dataField];
	if(oldDate == "R"){
		return $.i18n.prop("mileage.board");//"补登";
	}else if(oldDate == "A"){
		return $.i18n.prop("mileage.auto");//"自动";
	}else if(oldDate == "补登"){
		return $.i18n.prop("mileage.board");//"补登";
	}else{
		return oldDate;
	}
	
}
//累计状态展示
function accumulateStatusShow(row,col){
	var oldDate = row[col.dataField];
	if(oldDate=='已累计'){
		return $.i18n.prop("mileageBoard.accumulated");
	}else if(oldDate=='未累计'){
		return $.i18n.prop("mileageBoard.notAccumulated");
	}else{
		return oldDate;
	}
}

//检测是否IE
function IETester(userAgent){
    var UA =  userAgent || navigator.userAgent;
    if(/msie/i.test(UA)){
        return UA.match(/msie (\d+\.\d+)/i)[1];
    }else if(~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')){
        return UA.match(/rv:(\d+\.\d+)/)[1];
    }
    return false;
}
//如果IE，则删除select背景图片
$(function(){
	if(console){
		console.log(IETester());
	}
	if(IETester()){
		console.log("ie");
		$("select").css("background","none");
	}
})