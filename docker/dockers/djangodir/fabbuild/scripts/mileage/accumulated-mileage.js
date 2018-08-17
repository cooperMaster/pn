var maintable;

var ticketIdArr = [];
$(function() {
	 
	var deletOff = 1;
	 
	//绑定事件
	$('#mileage-delet').unbind('click').bind('click', function(e) {
		if(deletOff){
			deletOff = 0;
			$('#mileage-delet').css("background","#ccc");
			tickAllArr = [];
			ticketIdArr= [];
			var n =0;
			$('input[name=checkbox]:checked').each(function(){
				console.info($(this).attr('data-id'));
				ticketIdArr.push($(this).attr('data-id'));
				tickAllArr.push($(this).attr('data-name'));
			});
			console.info('ticketIdArr: '+ticketIdArr.unique());
			console.info('tickAllArr: '+tickAllArr.unique());
			for(var i=0;i<tickAllArr.length;i++){
				if(tickAllArr[i]==1){
					n++;
				}else if(tickAllArr[i]==0){
					n--;
				}
			}
			if(n==tickAllArr.length){
				if(ticketIdArr.length>0){
					// 发送请求
					$.ajax({
						type : "POST",
						url : $ECS_PATH+"mileage/deleteMileage.do",
						data : JSON.stringify(ticketIdArr.unique()),
						contentType : "application/json",
						dataType : 'json',
						success : function(data) {
							deletOff = 1;
							$('#mileage-delet').css("background","#198BDF");
							if(data.msg==0){
								alert("删除成功");
								window.location.reload()
							}else if(data.msg==1){
								alert("删除失败");
								window.location.reload()
							}
							
						},
						error : function(data) {
							alert($.i18n.prop("mileage.requesterror"));
							deletOff = 1;
							$('#mileage-delet').css("background","#198BDF");
						}
					});
				}else{
					alert("请选择要删除的里程");
					deletOff = 1;
					$('#mileage-delet').css("background","#198BDF");
				}
			}else{
				alert("未累计的里程不能删除");
				deletOff = 1;
				$('#mileage-delet').css("background","#198BDF");
			}
		}
	});
	
	var submitOff = 1;
	
	//绑定事件
	$('#mileage-submit').unbind('click').bind('click', function(e) {
		if(submitOff){
			submitOff = 0;
			$('#mileage-submit').css("background","#ccc");
			ticketIdArr= [];
			$('input[name=checkbox]:checked').each(function(){
				console.info($(this).attr('data-id'));
				ticketIdArr.push($(this).attr('data-id'));
			});
			console.info('ticketIdArr: '+ticketIdArr.unique());
			if(ticketIdArr.length>0){
				// 发送请求
				$.ajax({
					type : "POST",
					url : $ECS_PATH+"mileage/accumulateMileage.do",
					data : JSON.stringify(ticketIdArr.unique()),
					contentType : "application/json",
					dataType : 'json',
					success : function(data) {
						submitOff = 1;
						$('#mileage-submit').css("background","#198BDF");
						if(data.code === "00"){
							if(data.toplimit == ""){
								$('#points').text("");
							}else {
								var points=$.i18n.prop("mileage.points");
								points=points.replace("{0}",data.toplimit);
								points=points.replace("{1}",data.recordMileage);
								$('#points').text(points);
							}
							window.location.href = 'submit-success.jsp';
						}else if(data.code === "01"){
							alert($.i18n.prop("mileage.noauthority"));
							window.location.reload()
						}else if(data.code === "02"){
//							alert($.i18n.prop("mileage.error"));
							alert($.i18n.prop("mileage.nopolicy"));
							window.location.reload()
						}else if(data.code === "04"){
							alert($.i18n.prop("mileage.overtime"));
							window.location.reload()
						}else if(data.code === "05"){
							if(data.toplimit == ""){
								$('#points').text("");
							}else {
								var points=$.i18n.prop("mileage.points");
								points=points.replace("{0}",data.toplimit);
								points=points.replace("{1}",data.recordMileage);
								$('#points').text(points);
							}
							alert($.i18n.prop("mileage.toplimit"));
							window.location.reload()
						}
						
						
					},
					error : function(data) {
						alert($.i18n.prop("mileage.requesterror"));
						submitOff = 1;
						$('#mileage-submit').css("background","#198BDF");
					}
				});
			}else{
				alert($.i18n.prop("mileage.selectMileage"));
				submitOff = 1;
				$('#mileage-submit').css("background","#198BDF");
			}
		}
		
	});
	// 加载国际化提示信息
	loadBundles();
	
	//查询本月最高里程和本月已累计里程
	queryToplimitAndRewardMileage();
	
	// 分页查询表格初始化
	initGrid();
	
//	$.imps_showLoading("");
	maintable.bindData();
});

//累计筛选
function myTicketTotalList(){
	var options=$("#screenAcc option:selected");
	var txt = $(options).attr("name");
	$("#accumulated-mileage").html("");
	if(txt==""){
		initGrid();
		maintable.bindData();
	}else if(txt=="0"){
		initGridL();
		maintableL.bindData();
	}else if(txt=="1"){
		initGridY();
		maintableY.bindData();
	}
}

function initGridL() {
	maintableL = new ECSGrid({
		url : $ECS_PATH+"mileage/myTicketTotalList.do?candelete=0",
//		searchform : "userInfoListForm",// 查找条件,
		renderTo : "accumulated-mileage",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		oddClass : "gray",
		evenClass : "lightblue",
		pageable : true,
		pageSize : 10,
		// complete : "searchComplete",
		columns : [ {
			headerText : $.i18n.prop("mileage.select"),
			dataField : "",
			handler:"checkbox",
			width : 90
		}, {
			headerText : $.i18n.prop("mileage.ticketNum+couponNum"),
			dataField : "ticketNo.couponno",
			width : 110
		}, {
			headerText : $.i18n.prop("mileage.psgName"),
			dataField : "psgName",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.departureDate"),
			dataField : "carrageDate",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.flightNo"),
			dataField : "flightNo",
			width : 90
		},{
			headerText : $.i18n.prop("mileage.cabin"),
			dataField : "cabin",
			width : 75
		},{
			headerText : $.i18n.prop("mileage.ticketOutCity"),
			dataField : "ticketIssueCity",
			width : 90
		},{
			headerText : $.i18n.prop("mileage.ticketChannel"),
			dataField : "ticketIssueChannel",
			width : 95
		},{
			headerText : $.i18n.prop("mileage.ticketStatus"),
			dataField : "ticketStatus",
			width : 95
		}
		,{
			headerText : $.i18n.prop("mileage.accumulateStatus"),
			dataField : "accStatus",
			handler: "accumulateStatusShow",
			width : 95
		}]
	});
}

function initGridY() {
	maintableY = new ECSGrid({
		url : $ECS_PATH+"mileage/myTicketTotalList.do?candelete=1",
//		searchform : "userInfoListForm",// 查找条件,
		renderTo : "accumulated-mileage",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		oddClass : "gray",
		evenClass : "lightblue",
		pageable : true,
		pageSize : 10,
		// complete : "searchComplete",
		columns : [ {
			headerText : $.i18n.prop("mileage.select"),
			dataField : "",
			handler:"checkbox",
			width : 90
		}, {
			headerText : $.i18n.prop("mileage.ticketNum+couponNum"),
			dataField : "ticketNo.couponno",
			width : 110
		}, {
			headerText : $.i18n.prop("mileage.psgName"),
			dataField : "psgName",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.departureDate"),
			dataField : "carrageDate",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.flightNo"),
			dataField : "flightNo",
			width : 90
		},{
			headerText : $.i18n.prop("mileage.cabin"),
			dataField : "cabin",
			width : 75
		},{
			headerText : $.i18n.prop("mileage.ticketOutCity"),
			dataField : "ticketIssueCity",
			width : 90
		},{
			headerText : $.i18n.prop("mileage.ticketChannel"),
			dataField : "ticketIssueChannel",
			width : 95
		},{
			headerText : $.i18n.prop("mileage.ticketStatus"),
			dataField : "ticketStatus",
			width : 95
		}
		,{
			headerText : $.i18n.prop("mileage.accumulateStatus"),
			dataField : "accStatus",
			handler: "accumulateStatusShow",
			width : 95
		}]
	});
}


 
//查询本月最高里程和本月已累计里程
function queryToplimitAndRewardMileage(){
	
	$.ajax({
		type : "POST",
		url : $ECS_PATH+"mileage/queryToplimitAndRewardMileage.do",
		data : JSON.stringify(ticketIdArr.unique()),
		contentType : "application/json",
		dataType : 'json',
		success : function(data) {
			if(data.toplimit == ""){
				$('#points').text("");
			}else {
				var points=$.i18n.prop("mileage.points");
				points=points.replace("{0}",data.toplimit);
				points=points.replace("{1}",data.recordMileage);
				$('#points').text(points);
			}
		},
		error : function(data) {
//			alert(data);
			//alert($.i18n.prop("mileage.requesterror"));
		}
	});
}


//得到说明内容
function getMainText() {
	// 发送请求
	$.ajax({
		type : "POST",
		url : "",
		data : {},
		dataType : 'json',
		success : function(data) {
			// 说明的内容
			$('#main-text').text('');
		},
		error : function(data) {

		}
	});
}


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
		url : $ECS_PATH + "mileage/myTicketTotalList.do",
//		searchform : "userInfoListForm",// 查找条件,
		renderTo : "accumulated-mileage",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		oddClass : "gray",
		evenClass : "lightblue",
		pageable : true,
		pageSize : 5,
		// complete : "searchComplete",
		columns : [ {
			headerText : $.i18n.prop("mileage.select"),
			dataField : "",
			handler:"checkbox",
			width : 90
		}, {
			headerText : $.i18n.prop("mileage.ticketNum+couponNum"),
			dataField : "ticketNo.couponno",
			width : 110
		}, {
			headerText : $.i18n.prop("mileage.psgName"),
			dataField : "psgName",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.departureDate"),
			dataField : "carrageDate",
			width : 120
		},{
			headerText : $.i18n.prop("mileage.flightNo"),
			dataField : "flightNo",
			width : 90
		},{
			headerText : $.i18n.prop("mileage.cabin"),
			dataField : "cabin",
			width : 75
		},{
			headerText : $.i18n.prop("mileage.ticketOutCity"),
			dataField : "ticketIssueCity",
			width : 90
		},{
			headerText : $.i18n.prop("mileage.ticketChannel"),
			dataField : "ticketIssueChannel",
			width : 95
		},{
			headerText : $.i18n.prop("mileage.ticketStatus"),
			dataField : "ticketStatus",
			width : 95
		}
		,{
			headerText : $.i18n.prop("mileage.accumulateStatus"),
			dataField : "accStatus",
			handler: "accumulateStatusShow",
			width : 95
		}]
	});
}

//显示累计状态列
function accumulateStatusShow(row,col){
	var canDelete = row['canDelete'];
	if(canDelete=='1'){
		return '<a href="#"  onClick="accRrrShow(\'' + row["id"] + '\');">'
		+ $.i18n.prop("mileage.accumulatedFail") +'</a>';
	}else{
		return $.i18n.prop("mileage.notAccumulated");
	}
	
}

function accRrrShow(id){
	$("#hiddenId").val(id);
	lo=0;
	$("#accumulativePop").show();
	$(".shawnShow").show();
	$(".hisTit").show();
	$("#accumulativeErrorBox").html("");
	initGridAccumulative();
	maintableM.bindData();
}

function checkbox(row,col){
	return "<input name='checkbox' type='checkbox' data-id="+row.id+" data-name="+row.canDelete+" />"
}

Array.prototype.unique = function(){
	 var res = [];
	 var json = {};
	 for(var i = 0; i < this.length; i++){
	  if(!json[this[i]]){
	   res.push(this[i]);
	   json[this[i]] = 1;
	  }
	 }
	 return res;
	};
	
var lo=0;
function initGridAccumulative() {
	var val = $("#hiddenId").val();
	maintableM = new ECSGrid({
		url : $ECS_PATH + "mileage/showReason.do?id="+val,
		searchform : "board-list-search",// 查询条件,
		renderTo : "accumulativeErrorBox",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		oddClass : "gray",
		evenClass : "lightblue",
		pageSize : 5,
//			complete : "searchComplete",
		columns : [ {
			//		headerText : $.i18n.prop("mileageBoard.ticketNo"),
			headerText : $.i18n.prop("mileageBoard.failed.num"),
			//dataField : "ticketNo",
			handler : "AccNum",
			width : "10%"
		}, {
//				headerText : $.i18n.prop("mileageBoard.citiesPair"),
			headerText : $.i18n.prop("mileageBoard.failed.time"),
			dataField : "addTime",
			//handler : "AccTime",
			width : "30%"
		}, {
//				headerText : $.i18n.prop("mileageBoard.flightNo"),
			headerText : $.i18n.prop("mileageBoard.failed.reason"),
			dataField : "errReason",
			handler : "AccReason",
			width : "15%"
		}]
	});
}

function AccNum(row, col){
	lo++;
	return lo; 
}
function AccReason(row,col){
	var errReason = row['errReason'];
	var txt = "";
	if(errReason=="申请日期已超过承运后60天。"){
		txt = $.i18n.prop("apply.six.error");
	}
	if(errReason=="找不到相关奖励政策。"){
		txt = $.i18n.prop("apply.nopolicy");
	}
	return txt;
}