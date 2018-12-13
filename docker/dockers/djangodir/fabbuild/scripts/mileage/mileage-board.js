var maintable;

$(function(){
	// 加载国际化提示信息
	loadBundles();
	  
	//初始化日期控件
	$(".datebox").each(function(i) {
		new DatePicker($(this).attr("id") + i, {
			inputId : $(this).attr("id"),
			className : 'date-picker-wp'
		});
	});
	
	var uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight',//设置运行环境，会按设置的顺序，可以选择的值有html5,gears,flash,silverlight,browserplus,html
		flash_swf_url : './js/Moxie.swf',
		silverlight_xap_url : './js/Moxie.xap',
        url : $ECS_PATH + 'reRegistration/batchImport.do',//上传文件路径
        max_file_size : '3gb',//100b, 10kb, 10mb, 1gb
        unique_names : true,//生成唯一文件名
        browse_button : 'uploader', 
        filters : [ {
            title : 'files',
            extensions : 'xls,xlsx'
        }]
    });
	uploader.init();
    
    /*$("#fileBtn").click(function(){
        uploader.start();
    })*/
	
    // 选择文件后在文本框中显示文件名
    uploader.bind('FilesAdded',function(uploader,files){
        for(var i = 0, len = files.length; i<len; i++){
            //$('#' + fileNameDisplayId).val($('#' + fileNameDisplayId).val() + files[i].name + ";");
            console.log(files[i].name)
            $("#fileName").val(files[i].name);
        }
    });
    
 // 绑定上传完一个文件后触发的事件
	uploader.bind('FileUploaded',function(uploader, file, responseObject) {
		$(".shawnShow").hide();
		$(".loadBack").hide();
		var result = JSON.parse(responseObject.response);
		if(result.msg=="请参考模板文件进行批量补登。"||result.msg.indexOf("系统")!=-1){
			alert(i18n.prop('file.filed'));
		}else{
			alert(i18n.prop('file.success'));
		}
    	$("#fileName").val("");
	});
	
	// 绑定点击上传按钮触发的事件
	$('#fileBtn').unbind("click").click(function(){
		if($("#fileName").val().length < 1){
			alert(i18n.prop('mileageBoard.select.upload'))
			return false;
		}else{
			$(".shawnShow").show();
			$(".loadBack").show();
		}
		// 开始上传
		uploader.start();
	});
	
	
	//舱位输入小写字母时转成大写
	var cabinObj = $("#cabin");
	cabinObj.on("keyup",function(){
		this.value = this.value.toUpperCase().slice(0,1);
	});
	
	//时间控件
	$("#calendarShowcarrageDateEnd2").click(function(){
		$("#carrageDateEnd").focus();
	});
	
	$("#calendarShowcarrageDateStart1").click(function(){
		$("#carrageDateStart").focus();
	});
	
	
	//拼接航段对
	$("#btn-submit").bind("click",function(){
		$("#citiesPair").val(function(){
			return $("#citiesPairStart").val()+"-"+$("#citiesPairEnd").val();
		});
		$("#ticketNo").val(function(){
			return $("#ticketNoFirstPart").val()+$("#ticketNoLastPart").val();
		});
	});

	// 分页查询表格初始化
	initGrid();
	maintable.bindData();
	
	
	//补登申请
	$("#btn-submit").bind("click",function(){
		if($('#board-apply-form').valid()){
			$("#btn-submit").attr("disabled",true);
			$.ajax({
				type : "POST",
				url: $ECS_PATH + "reRegistration/saveReRegistration.do",
				dataType : "json",
				data: $('#board-apply-form').serialize(),
				success:function(data){		
					console.log(data);
					switch(Number(data.code)){
						case 0:
							alert(i18n.prop('mileageBoard.saveSuccess'));//"保存成功"
							maintable.bindData();
						  break;
						case 1:
//						  alert("仅可补登本代理所出票证航段");
							alert(i18n.prop('mileageBoard.saveFail1'));
						  break;
						case 2:
//							alert("旅客信息不匹配");
						/*	var errCodes = data.codes.split(",");
							//alert(errCodes);
							var errStr = "";
							for (var i = 0; i < errCodes.length; i++) {
								if(errCodes[i]!=""){
									errStr += i18n.prop('mileageBoard.saveFail'+errCodes[i])+"、";
								}
							}
							alert(errStr.substring(0,errStr.length-1));
							*/
							alert(i18n.prop('mileageBoard.saveFail2'));
						  break;
						case 3:
//							alert("该票号已经被累计");
							alert(i18n.prop('mileageBoard.saveFail3'));
						  break;
						case 4:
							alert(i18n.prop('mileageBoard.saveFail4'));
						  break;
						case 5:
							alert(i18n.prop('mileageBoard.saveFail5'));
						  break;
						case 6:
							alert(i18n.prop('mileageBoard.saveFail6'));
						  break;
						case 7:
							alert(i18n.prop('mileageBoard.saveFail7'));
						  break;
						case 8:
							alert(i18n.prop('mileageBoard.saveFail8'));
						  break;
						case 9:
							alert(i18n.prop('mileageBoard.saveFail9'));
						  break;
						case 10:
							alert(i18n.prop('mileageBoard.saveFail10'));
						  break;
						case 11:
							alert(i18n.prop('mileageBoard.saveFail11'));
						  break;
						case 12:
							alert(i18n.prop('mileageBoard.saveFail12'));
						  break;
						case 13:
							alert(i18n.prop('mileageBoard.saveFail13'));
						  break;  
						case 25:
							alert(i18n.prop('mileageBoard.saveFail25'));
						  break;
						default:
//							alert("申请补登失败");
							alert(i18n.prop('mileageBoard.applicationFailed'));
					}
					$("#btn-submit").attr("disabled",false);
				},
				error:function(){
					alert(i18n.prop('mileageBoard.applicationFailed'));//申请失败,请稍后再试
				}
			});
		}
	});
	
	//按条件查询
	$("#btn-search").bind("click",function(){
		maintable.bindData();
	});
	
	//搜索工具显隐
	$("#filterTool").bind("click",function(){
		$("#board-list-search").slideToggle(300).find(":text").val("");
		$("#board-list-search").validate().resetForm();
	});
	
	//里程 补登申请表单验证
	$("#board-apply-form").validate({
		//不提交表单
//		debug:true,
		//输入框失去焦点时进行验证
		onfocusout: function(element){
	        $(element).valid();
	    },
		rules : {
			flightNo : {
				required : true,
				aviationNumber : true
//				maxlength : 10,
//				rangelength:[5,5],
//				number:true
			},
			carrageDate : {
				required : true,
//				maxlength : 10,
				date:true
			},
			citiesPairStart : {
				required : true,
				rangelength:[3,3],
				letter:true
			},
			citiesPairEnd : {
				required : true,
				rangelength:[3,3],
				letter:true
			},
			ticketNoLastPart : {
				required : true,
				rangelength:[10,10],
				number:true
			}/*,
			couponno : {
				required : true,
				maxlength:1,
				number:true
			}*/,
			cabin : {
				required : true,
				maxlength:1,
				letter:true
			}
		},
		messages : {
			flightNo : {
				required : i18n.prop('mileageBoard.errMsgOfFlightNo1'),//"航班号项必填",
				maxlength : i18n.prop('mileageBoard.errMsgOfFlightNo2'),//"航班号不能超过*个数字",
				number: i18n.prop('mileageBoard.errMsgOfFlightNo3'),//"航班号请输入数字"
			},
			carrageDate : {
				required : i18n.prop('mileageBoard.errMsgOfCarrageDate1'),//"航班日期项必填",
//				rangelength : 10
				date:i18n.prop('mileageBoard.errMsgOfCarrageDate2')//"请输入有效的日期""
			},
			citiesPairStart : {
				required : i18n.prop('mileageBoard.errMsgOfCitiesPair1'),//"航段项必填",
				rangelength : i18n.prop('mileageBoard.errMsgOfCitiesPair2')//"航段不能超过3个字母"
			},
			citiesPairEnd : {
				required : i18n.prop('mileageBoard.errMsgOfCitiesPair1'),//"航段项必填",
				rangelength : i18n.prop('mileageBoard.errMsgOfCitiesPair2')//"航段不能超过3个字母"
			},
			ticketNoLastPart : {
				required : i18n.prop('mileageBoard.errMsgOfTicketNo1'),//"票号项必填",
				rangelength: i18n.prop('mileageBoard.errMsgOfTicketNo2'),// "票号请填写10位数字",
				number:  i18n.prop('mileageBoard.errMsgOfTicketNo3')//"票号必须输入数字"
			}/*,
			couponno : {
				required : i18n.prop('mileageBoard.errMsgOfTicketNo5'),//"票联项必填",
				number:  i18n.prop('mileageBoard.errMsgOfTicketNo6')//"票联必须输入数字"
			}*/,
			cabin : {
				required : i18n.prop('mileageBoard.errMsgOfCabin1'),//"舱位项必填",
//				maxlength : 1,
				letter : i18n.prop('mileageBoard.errMsgOfCabin2')//"舱位填写单个字母"
			}
		},
		errorPlacement: function(error, element) { //错误信息位置设置方法
			var errMsgObj = document.getElementById("board-apply-form").getElementsByClassName(element.context.name+"ErrMsg")[0];
			error.appendTo(errMsgObj); //这里的element是录入数据的对象
		},
	});
	
	//里程 补登查询表单的验证
	$("#board-list-search").validate({
		//不提交表单
//		debug:true,
		//输入框失去焦点时进行验证
		onfocusout: function(element){
	        $(element).valid();
	    },
		rules : {
			ticketNo : {
				required : false,
				rangelength:[10,10],
				number:true
			},
			carrageDateStart : {
				required : false,
				date:true,
				compareDate : {
					begin : '#carrageDateStart',
					end : '#carrageDateEnd'
				}
			},
			carrageDateEnd : {
				required : false,
				date:true ,
				compareDate : {
					begin : '#carrageDateStart',
					end : '#carrageDateEnd'
				}
			}			
		},
		messages : {
			ticketNo : {
				rangelength: i18n.prop('mileageBoard.errMsgOfTicketNo2'),//"票号请填写10位数字",
				number: i18n.prop('mileageBoard.errMsgOfTicketNo3')// "票号必须输入数字"
			},
			carrageDateStart : {
				compareDate : i18n.prop('mileageBoard.errMsgOfCarrageDateStart'),//"开始日期不能晚于结束日期"
				date:i18n.prop('mileageBoard.errMsgOfCarrageDate2')//"请输入有效的日期"
			},
			carrageDateEnd : {
				compareDate : i18n.prop('mileageBoard.errMsgOfCarrageDateEnd'),//"结束日期不能早于开始日期"
				date:i18n.prop('mileageBoard.errMsgOfCarrageDate2')//"请输入有效的日期"
			},
		},
		errorPlacement: function(error, element) { //错误信息位置设置方法
			var errMsgObj = document.getElementById("board-list-search").getElementsByClassName(element.context.name+"ErrMsg")[0];
			error.appendTo(errMsgObj); //这里的element是录入数据的对象
		},
	});
	
	/**
	 * 验证航空号
	 */
	jQuery.validator.addMethod("aviationNumber", function(value, element) {  
		var aviationNum  = /^[0-9a-zA-Z]+$/;
			if(!aviationNum.test(value)){
				return false;
			}
		return true;
	}, $.format($.i18n.prop("mileageBoard.errMsgOfFlightNo4")));
	
	//
	$.validator.addMethod("letter",function(value,element,params){
		var patt1 = new RegExp(/^[A-Z]+$/);
		if(patt1.test(value)){
			return true;
		}else{
			return false;
		}
	},$.i18n.prop("mileageBoard.mustLetter"));//必须是字母
	
	$("#btn-reset").click(function(){
		$("#board-apply-form").find(":text").val("");
		$("#flightNoFirst").val("CZ");
		$("#ticketNoFirstPart").val("784");
		$("#board-apply-form").validate().resetForm();
	});
	
	//查询本月最高里程和本月已累计里程
	queryToplimitAndRewardMileage();
});

//初始化分页表格
function initGrid() {
	maintable = new ECSGrid({
		url : $ECS_PATH + "reRegistration/showReRegistration.do",
		searchform : "board-list-search",// 查询条件,
		renderTo : "ecsgrid",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		oddClass : "gray",
		evenClass : "lightblue",
		pageSize : 5,
//		complete : "searchComplete",
		columns : [ {
			headerText : $.i18n.prop("mileageBoard.ticketNo"),
//			headerText : "票号",
			dataField : "ticketNo",
			width : "10%"
		}, {
			headerText : $.i18n.prop("mileageBoard.citiesPair"),
//			headerText : "旅行航段",
			dataField : "segmentCitiesPair",
			width : "10%"
		}, {
			headerText : $.i18n.prop("mileageBoard.flightNo"),
//			headerText : "航班号",
			dataField : "flightNo",
			width : "6%"
		}, {
			headerText : $.i18n.prop("mileageBoard.carrageDate"),
//			headerText : "航班日期",
			dataField : "carrageDate",
			handler: "InterceptionDate",
			width : "15%"
		},{
			headerText : $.i18n.prop("mileageBoard.cabin"),
//			headerText : "舱位",
			dataField : "cabin",
			width : "5%"
		},{
			headerText : $.i18n.prop("mileageBoard.addWay"),
//			headerText : "积累方式",
			dataField : "addWay",
			handler: "addWayShow",
			width : "10%",
			isNumber : true
		},{
			headerText : $.i18n.prop("mileageBoard.accumulateStatus"),
//			headerText : "状态",
			dataField : "processStatus",
			handler: "accumulateStatusShow",
			width : "10%"
		},{
			headerText : $.i18n.prop("mileageBoard.operation"),
//			headerText : "操作",
			dataField : "processStatus",
			handler: "operationShow",
			width : "5%"
		}]
	});
}
//累计方式展示
function addWayShow(row,col){
	var oldDate = row['addWay'];
	if(oldDate == "补登"){
		return $.i18n.prop("mileage.board");//"补登";
	}else{
		return $.i18n.prop("mileage.auto");//"自动";
	}
}

//截取日期
function InterceptionDate(row,col){
	return row[col.dataField].substring(0,10);
}

//显示状态列
function accumulateStatusShow(row,col){
	var oldDate = row[col.dataField];
	if(oldDate=='S'){
		return $.i18n.prop("mileageBoard.accumulated");
	}else if(oldDate=='F'){
		//return '<a href="#"  onClick="showRecord(\'' + row["id"] + '\');">'
		//+ $.i18n.prop("mileageBoard.accumulatedFail") +'</a>';
		return '<a href="#"  onClick="accRrrShow(\'' + row["id"] + '\');">'
		+ $.i18n.prop("mileageBoard.accumulatedFail") +'</a>';
	}else{
		return $.i18n.prop("mileageBoard.notAccumulated");
	}
}

//显示操作列
function operationShow(row, col) {
	var oldDate = row[col.dataField];
	if (oldDate == "N") {
		return '<a href="#"  onClick="deleteEntry(\'' + row["id"] + '\');">'
				+ $.i18n.prop("mileageBoard.delete") +'</a>';//删除
	}else{
		return "";
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


function showRecord(id){
	$.ajax({
		type : "POST",
		url: $ECS_PATH + "reRegistration/showRecord.do",
		dataType : "json",
		data: {"id":id},
		success:function(data){
			alert(data.record);
			alert("超过本月奖励上限，累计失败！");
		},
		error:function(data){
			alert(data.errorMsg);
		}
	});
}


//删除条目
function deleteEntry(id){
	$("#confirmDeleteBox").css({"display":"block","z-index":"9999"});
	$("#CancelDelete").unbind("click").bind("click",function(){
		$("#confirmDeleteBox").css("display","none");
		return;
	});
	$("#confirmDelete").unbind("click").bind("click",function(){
		$.ajax({
			type : "POST",
			url: $ECS_PATH + "reRegistration/deleteReRegistration.do",
			dataType : "json",
			data: {"id":id},
			success:function(data){
				$("#confirmDeleteBox").css("display","none");
				alert($.i18n.prop("mileageBoard.deleteSuccess"));//"删除成功"
				maintable.bindData();
			},
			error:function(data){
				alert(data.errorMsg);
			}
		});
	});
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
var isIE9 = window.navigator.userAgent.indexOf("MSIE 9.0")>=0;
var isIE8 = window.navigator.userAgent.indexOf("MSIE 8.0")>=0;
//如果IE，则删除select背景图片
$(function(){
	if(console){
//		console.log(IETester());
	}
	if(IETester()){
		console.log("ie");
		$("select").css("background","none");
	}
});

//兼容ie9的placeholder
if (isIE9 || isIE8) {//如果是IE9,就用jquery的方法实现placeholder
    $(document).ready(function () {
            $("input").not("input[type='password']").each(//把input绑定事件 排除password框
                function () {
                    if ($(this).val() == "" && $(this).attr("placeholder") != "") {
                        $(this).val($(this).attr("placeholder"));
                        $(this).focus(function () {
                            if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
                        });
                        $(this).blur(function () {
                            if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
                        });
                    }
                });
//对password框的特殊处理1.创建一个text框 2获取焦点和失去焦点的时候切换
            $("input[type='password']").each(
                function () {
                    var pwdField = $(this);
                    var pwdVal = pwdField.attr('placeholder');
                    pwdField.after('<input  class="login-input" type="text" value=' + pwdVal + ' autocomplete="off" />');
                    var pwdPlaceholder = $(this).siblings('.login-input');
                    pwdPlaceholder.show();
                    pwdField.hide();

                    pwdPlaceholder.focus(function () {
                        pwdPlaceholder.hide();
                        pwdField.show();
                        pwdField.focus();
                    });

                    pwdField.blur(function () {
                        if (pwdField.val() == '') {
                            pwdPlaceholder.show();
                            pwdField.hide();
                        }
                    });
                }
            );
        }
    );
};

//加载国际化
function loadBundles() {
	var lang = null;
	if (langJsp != null) {
		lang = langJsp;
	} else {
		lang = Common.Cookie.get('language');
	}
	jQuery.i18n.properties({
		name : 'mileageBoard',// 资源文件名称
		path : $ECS_PATH + 'messages/',// 资源文件所在目录路径
		mode : 'map',// 模式：变量或 Map
		language : lang,// Common.Cookie.get('language'),// 从cookie获取语言
		cache : true,
		encoding : 'UTF-8',
		callback : function() {
			// 加载完回调
		}
	});
}

//查询本月最高里程和本月已累计里程
function queryToplimitAndRewardMileage(){
	
	$.ajax({
		type : "POST",
		url : $ECS_PATH+"mileage/queryToplimitAndRewardMileage.do",
		data : {},
		contentType : "application/json",
		dataType : 'json',
		success : function(data) {
			if(data.toplimit == ""){
				$('.points').text("");
			}else {
				var points=$.i18n.prop("mileage.points");
				points=points.replace("{0}",data.toplimit);
				points=points.replace("{1}",data.recordMileage);
				$('.points').text(points);
			}
		},
		error : function(data) {
//			alert(data);
			//alert($.i18n.prop("mileage.requesterror"));
		}
	});
}

var io=0;
//初始化分页表格
function initGridHis() {
	maintableN = new ECSGrid({
		url : $ECS_PATH + "reRegistration/showReAttach.do",
		searchform : "board-list-search",// 查询条件,
		renderTo : "ecsgridHistory",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		oddClass : "gray",
		evenClass : "lightblue",
		pageSize : 5,
//		complete : "searchComplete",
		columns : [ {
			//		headerText : $.i18n.prop("mileageBoard.ticketNo"),
			headerText : $.i18n.prop("mileageBoard.history.num"),
			dataField : "ticketNo",
			handler : "hisNum",
			width : "10%"
		}, {
//			headerText : $.i18n.prop("mileageBoard.citiesPair"),
			headerText : $.i18n.prop("mileageBoard.history.document"),
			dataField : "name",
			handler : "hisName",
			width : "30%"
		}, {
//			headerText : $.i18n.prop("mileageBoard.flightNo"),
			headerText : $.i18n.prop("mileageBoard.history.time"),
			dataField : "uploadTime",
			handler : "hisTime",
			width : "15%"
		}, {
//			headerText : $.i18n.prop("mileageBoard.carrageDate"),
			headerText : $.i18n.prop("mileageBoard.history.size"),
			dataField : "fileSize",
			handler: "hisSize",
			width : "15%"
		},{
//			headerText : $.i18n.prop("mileageBoard.cabin"),
			headerText : $.i18n.prop("mileageBoard.history.import"),
			dataField : "cabin",
			handler : "historyAll",
			width : "30%"
		}]
	});
}

function hisNum(){
	io++;
	return io; 
}

function hisName(row, col){
	var name = row['name'];
	var uploadPath = row['uploadPath'];
	var html = "";
	html +="<a href='"+$ECS_PATH+"reRegistration/downloadAttach.do?path="+uploadPath+"&name="+name+"'  style='text-decoration:inherit'>"+name+"</a>";
	return html;
}

function hisTime(row, col){
	var time = row['uploadTime'];
	time =new Date(time);
	return time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate();
}

function hisSize(row, col){
	var size = row['fileSize'];
	size = parseInt(size / 1024);
	return size+"Kb";
}

function historyAll(row, col){
	var sucfileId = row['sucfileId'];
	var failfileId = row['failfileId'];
	var name = row['name'];
	var arr = name.split(".");
	console.log(arr);
	var html = "";
	if(sucfileId!=null && failfileId!=null){
		html += "<div class='tabBox' onclick='toggleShow(this)'>";
		html += "<div class='tabTit' style='cursor:pointer'>"+$.i18n.prop("mileageBoard.history.down")+"</div>";
		html += "<div class='tabIco check_list' style='padding-right:0'>v</div>";
		html += "<ul class='tabUl'>";
		html += "<li>";
		html += "<a style='text-decoration:none' href='"+$ECS_PATH+"reRegistration/downloadAttach.do?path="+sucfileId+"&name="+arr[0]+"的成功记录."+arr[1]+"'>"+$.i18n.prop("mileageBoard.history.success")+"</a>";
		html += "</li>";
		html += "<li>";
		html += "<a style='text-decoration:none' href='"+$ECS_PATH+"reRegistration/downloadAttach.do?path="+failfileId+"&name="+arr[0]+"的失败记录."+arr[1]+"'>"+$.i18n.prop("mileageBoard.history.filed")+"</a>";
		html += "</li>";
		html += "</ul>";
		html += "</div>";
	}else if(sucfileId!=null && failfileId==null){
		html += "<div class='tabBox' onclick='toggleShow(this)'>";
		html += "<div class='tabTit' style='cursor:pointer'>"+$.i18n.prop("mileageBoard.history.down")+"</div>";
		html += "<div class='tabIco check_list' style='padding-right:0'>v</div>";
		html += "<ul class='tabUl'>";
		html += "<li>";
		html += "<a style='text-decoration:none' href='"+$ECS_PATH+"reRegistration/downloadAttach.do?path="+sucfileId+"&name="+arr[0]+"的成功记录."+arr[1]+"'>"+$.i18n.prop("mileageBoard.history.success")+"</a>";
		html += "</li>";
		html += "</ul>";
		html += "</div>";
	}else if(sucfileId==null && failfileId!=null){
		html += "<div class='tabBox' onclick='toggleShow(this)'>";
		html += "<div class='tabTit' style='cursor:pointer'>"+$.i18n.prop("mileageBoard.history.down")+"</div>";
		html += "<div class='tabIco check_list' style='padding-right:0'>v</div>";
		html += "<ul class='tabUl'>";
		html += "<li>";
		html += "<a style='text-decoration:none' href='"+$ECS_PATH+"reRegistration/downloadAttach.do?path="+failfileId+"&name="+arr[0]+"的失败记录."+arr[1]+"'>"+$.i18n.prop("mileageBoard.history.filed")+"</a>";
		html += "</li>";
		html += "</ul>";
		html += "</div>";
	}
	
		
	return html;
}

function toggleShow(obj){
	event.stopPropagation();
	$(obj).find(".tabUl").toggle();
	/*$(obj).find(".tabUl").mouseout(function(){
		$(this).hide();
	})*/
	$(document).click(function(e){
		var target=$(e.target);
		var id=target.attr('class');
		if(id!="tabUl"){
			$(".tabUl").hide();
		}
	})
	$(obj).parent().parent().siblings().find('.tabUl').hide();
}
var lo=0;
function initGridAccumulative() {
	var val = $("#hiddenId").val();
	maintableM = new ECSGrid({
		url : $ECS_PATH + "reRegistration/showRecord.do?id="+val,
		searchform : "board-list-search",// 查询条件,
		renderTo : "accumulativeErrorBox",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		oddClass : "gray",
		evenClass : "lightblue",
		pageSize : 1,
//		complete : "searchComplete",
		columns : [ {
			//		headerText : $.i18n.prop("mileageBoard.ticketNo"),
			headerText : $.i18n.prop("mileageBoard.failed.num"),
			//dataField : "ticketNo",
			handler : "AccNum",
			width : "10%"
		}, {
//			headerText : $.i18n.prop("mileageBoard.citiesPair"),
			headerText : $.i18n.prop("mileageBoard.failed.time"),
			dataField : "operatetime",
			//handler : "AccTime",
			width : "30%"
		}, {
//			headerText : $.i18n.prop("mileageBoard.flightNo"),
			headerText : $.i18n.prop("mileageBoard.failed.reason"),
			dataField : "localexceptioninfo",
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
	var errReason = row['localexceptioninfo'];
	var txt = "";
	if(errReason!=null){
		
		if(errReason.indexOf("该票号已经被累计")!=-1){
			txt=errReason.replace("该票号已经被累计",$.i18n.prop("mileageBoard.saveFail3"));
		}
		if(errReason.indexOf("出票日期早于注册EM时间，无法补登")!=-1){
			txt=errReason.replace("出票日期早于注册EM时间，无法补登",$.i18n.prop("mileageBoard.saveFail5"));
		}
		if(errReason.indexOf("申请日期已超过承运后60天，无法补登")!=-1){
			txt=errReason.replace("申请日期已超过承运后60天，无法补登",$.i18n.prop("mileageBoard.saveFail4"));
		}
		if(errReason.indexOf("代理和客票的sign-in号不一致")!=-1){
			txt=errReason.replace("代理和客票的sign-in号不一致",$.i18n.prop("mileageBoard.saveFail6"));
		}
		if(errReason.indexOf("客票销售日期内没有符合的政策")!=-1){
			txt=errReason.replace("客票销售日期内没有符合的政策",$.i18n.prop("mileageBoard.saveFail7"));
		}
		if(errReason.indexOf("常客卡状态有问题无法累计，详情可联系您的渠道经理或致电95539")!=-1){
			txt=errReason.replace("常客卡状态有问题无法累计，详情可联系您的渠道经理或致电95539",$.i18n.prop("mileageBoard.saveFail13"));
		}
		if(errReason.indexOf("票号－票联号不能为空")!=-1){
			txt=errReason.replace("票号－票联号不能为空",$.i18n.prop("mileageBoard.resson.faile1"));
		}
		if(errReason.indexOf("会员账户状态非活动，不可入账")!=-1){
			txt=errReason.replace("会员账户状态非活动，不可入账",$.i18n.prop("mileageBoard.resson.faile2"));
		}
		if(errReason.indexOf("里程数必须为整数")!=-1){
			txt=errReason.replace("里程数必须为整数",$.i18n.prop("mileageBoard.resson.faile3"));
		}
		if(errReason.indexOf("不允许重复入账")!=-1){
			txt=errReason.replace("不允许重复入账",$.i18n.prop("mileageBoard.resson.faile4"));
		}
		if(errReason.indexOf("该航段已经奖励")!=-1){
			txt=errReason.replace("该航段已经奖励",$.i18n.prop("mileageBoard.resson.faile5"));
		}
		if(errReason.indexOf("会员卡号不存在")!=-1){
			txt=errReason.replace("会员卡号不存在",$.i18n.prop("mileageBoard.resson.faile6"));
		}
		if(errReason.indexOf("政策编号不存在")!=-1){
			txt=errReason.replace("政策编号不存在",$.i18n.prop("mileageBoard.resson.faile7"));
		}
		if(errReason.indexOf("票号－票联号格式不正确")!=-1){
			txt=errReason.replace("票号－票联号格式不正确",$.i18n.prop("mileageBoard.resson.faile8"));
		}
		if(errReason.indexOf("入账不成功")!=-1){
			txt=errReason.replace("入账不成功",$.i18n.prop("mileageBoard.resson.faile9"));
		}
		if(errReason.indexOf("政策编号不正确")!=-1){
			txt=errReason.replace("政策编号不正确",$.i18n.prop("mileageBoard.resson.faile10"));
		}
		if(errReason.indexOf("超过本月奖励上限，累计失败")!=-1){
			txt=errReason.replace("超过本月奖励上限，累计失败",$.i18n.prop("mileageBoard.resson.faile11"));
		}
		if(errReason.indexOf("客票不满足奖励规则，被过滤")!=-1){
			txt=errReason.replace("客票不满足奖励规则，被过滤",$.i18n.prop("mileageBoard.resson.faile12"));
		}
		if(errReason.indexOf("仅可补登本代理所出票证航段")!=-1){
			txt=errReason.replace("仅可补登本代理所出票证航段",$.i18n.prop("mileageBoard.resson.faile13"));
		}
		if(errReason.indexOf("预计奖励里程已达到本月奖励上限，不能补登")!=-1){
			txt=errReason.replace("预计奖励里程已达到本月奖励上限，不能补登",$.i18n.prop("mileageBoard.resson.faile14"));
		}
		if(errReason.indexOf("该票号保存失败")!=-1){
			txt=errReason.replace("该票号保存失败",$.i18n.prop("mileageBoard.resson.faile15"));
		}
		if(errReason.indexOf("已达到本月奖励上限，不可再累计")!=-1){
			txt=errReason.replace("已达到本月奖励上限，不可再累计",$.i18n.prop("mileageBoard.resson.faile16"));
		}
		if(errReason.indexOf("仅允许补登南航销售且承运的客票")!=-1){
			txt=errReason.replace("仅允许补登南航销售且承运的客票",$.i18n.prop("mileageBoard.resson.faile17"));
		}
		if(errReason.indexOf("客票没有捆绑名称")!=-1){
			txt=errReason.replace("客票没有捆绑名称",$.i18n.prop("mileageBoard.resson.faile18"));
		}
		if(errReason.indexOf("代理没有捆绑名称")!=-1){
			txt=errReason.replace("代理没有捆绑名称",$.i18n.prop("mileageBoard.resson.faile19"));
		}
		if(errReason.indexOf("客票和代理都没有捆绑名称")!=-1){
			txt=errReason.replace("客票和代理都没有捆绑名称",$.i18n.prop("mileageBoard.resson.faile20"));
		}
	}
	return txt;
}
