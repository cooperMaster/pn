var form1DownloadPath=null;
var form2DownloadPath=null;
var form3DownloadPath=null;
var basePath='/IMPS';

$().ready(function() {
	getForm1DownLoadPath();
	getForm2DownLoadPath();
	getForm3DownLoadPath();
});

function getForm1DownLoadPath(){
//	$.ajax({
//		url:"/IMPS/modules/commonInfo.do",
//		data:"form1=Y",
//		// dataType:"script",
//		Type:"POST",
//		success:function(msg){
//			form1DownloadPath=msg;
//			$("#afsp").attr("href",msg);
//		},error:function(xmlHttpRequest, status){
//			alert("xmlHttpRequest.state: "+xmlHttpRequest.state);
//			alert("status: "+status);
//		}
//	});
	//downloadTableForm_Form1
//	$("#afsp").attr("href",downloadTableForm_Form1);
	$("#afsp").attr("href",basePath+'/quickLinkFile/download.do?id=3');
}

function getForm2DownLoadPath(){
//	$.ajax({
//		url:"/IMPS/modules/commonInfo.do",
//		data:"form2=Y",
//		// dataType:"script",
//		Type:"POST",
//		success:function(msg){
//			form2DownloadPath=msg;
//			$("#uf").attr("href",msg);
//		},error:function(xmlHttpRequest, status){
//			alert("xmlHttpRequest.state: "+xmlHttpRequest.state);
//			alert("status: "+status);
//		}
//	});
	
//	$("#uf").attr("href",downloadTableForm_Form2);
	$("#uf").attr("href",basePath+'/quickLinkFile/download.do?id=1');
}

function getForm3DownLoadPath(){
//	$.ajax({
//		url:"/IMPS/modules/commonInfo.do",
//		data:"form3=Y",
//		// dataType:"script",
//		Type:"POST",
//		success:function(msg){
//			form3DownloadPath=msg;
//			$("#orcf").attr("href",msg);
//		},error:function(xmlHttpRequest, status){
//			alert("xmlHttpRequest.state: "+xmlHttpRequest.state);
//			alert("status: "+status);
//		}
//	});
	
//	$("#orcf").attr("href",downloadTableForm_Form3);
	$("#orcf").attr("href",basePath+'/quickLinkFile/download.do?id=2');
}

function downloadForm1(){
	if(form1DownloadPath&&$.trim(form1DownloadPath)!=''){
		window.open(form1DownloadPath, 'Register');
	}
}

function downloadForm2(){
	if(form2DownloadPath&&$.trim(form2DownloadPath)!=''){
		window.open(form2DownloadPath, 'Register');
	}
}

function downloadForm3(){
	if(form3DownloadPath&&$.trim(form3DownloadPath)!=''){
		window.open(form3DownloadPath, 'Register');
	}
}

var $initDowloadList = function(){
		$('.attach_download_list').each(
			function(){
				$initSelector($(this),$(this).parent().find('input'),"",{setTxt:'false'});
			}
				
		/*
		function(){
			var selectDiv = $(this);
			
			$(this).parent().find('input').attr('readonly', 'readonly').click(function() {
				if (!selectDiv.is(":hidden")) {
					selectDiv.hide();
					return false;
				}

				// 构造下拉内容css
				var $this = $(this);
				var pos = $this.position();
				var hei = $this.outerHeight();
				var wid = Number($this.outerWidth() - 2);
				var top = Number(pos.top) + Number(hei) - 1;
				var left = pos.left;
				var liNum = selectDiv.find('li').length;
				
				selectDiv.css({
					"top" : top + 0.5,
					"left" : left,
					"width" : wid,
					"height" : (liNum <= 4 ? liNum*25 : 100) + "px"
//					"height" : "100" + "px"
				}).show();
				
				selectDiv.find('li').length;
				
				selectDiv.hover(function() {
					$(this).show();
				}, function() {
					$(this).hide();
				});

				// 附加下拉内容css，用作显示隐藏判断用
				var li = selectDiv.find("li");
				li.bind("click", function() {
					selectDiv.hide();
					return false;
				}).hover(function() {
					$(this).addClass("selected_");
				}, function() {
					$(this).removeClass("selected_");
				});
				return false;
			}).blur(function(){
					var li = selectDiv.find("li");
					var isSelecting = false;
						li.each(function(){
							if(!isSelecting){
								isSelecting = $(this).hasClass("selected_");
							}
						}
					);
					
					if(!isSelecting){
						selectDiv.hide();
					}
					return false;
				}
			);
			
		}
	*/);
		
		$(".li_title").each(function(){
			$(this).attr("title",$(this).text());
		});
		
};

var $initSelector = function(selectDivId, txtInputId, valInputId,col) {
	
	var def = {
		setTxt:true
	};
	
	if(col && col.setTxt && col.setTxt == 'false'){
		def.setTxt = false;
	}
	
	var selectDiv = typeof(selectDivId) == "object"? selectDivId : $(selectDivId);
	
	selectDiv.find("li").each(function(){
		$(this).addClass("txt-break");
	});
	var isHoverDiv = false;
	
	var input = typeof(txtInputId) == "object"? txtInputId : $(txtInputId);
	input.attr('readonly', 'readonly').unbind().click(function() {
		if (!selectDiv.is(":hidden")) {
			selectDiv.hide();
			return false;
		}

		// 构造下拉内容css
		var $this = $(this);
		var pos = $this.position();
		var hei = $this.outerHeight();
		var wid = Number($this.outerWidth() - 2);
		var top = Number(pos.top) + Number(hei) - 1;
		var left = pos.left;
		var li = selectDiv.find("li");
		var liNum = li.length;
		selectDiv.css({
			"top" : top + 0.1,
			"left" : left,
			"width" : wid,
			"height" : (liNum <= 4 ? liNum*25 : 100) + "px"
		}).show();

		selectDiv.hover(function() {
			$(this).show();
			isHoverDiv = true;
		}, function() {
			$(this).hide();
			isHoverDiv = false;
		});

		// 附加下拉内容css，用作显示隐藏判断用
		
		li.each(
				function (){
					$(this).unbind().bind("click", function(){
						
						var txt = $(this).html();
						if(def.setTxt){
							$this.val($.trim(txt));
						}
						if(valInputId){
							$(valInputId).val($(this).attr("name"));
						}
						selectDiv.hide();
						
					/*	for ( var func in funcs) {
							eval(func);
						}
						*/
						if(col && col.handler && typeof(col.handler) == 'function'){
							 col.handler($(this).attr('name'));
						}
//						if(selectDiv.attr("change")){
//							eval(selectDiv.attr("change"));
//						}
						return false;
					});
					
				}
		);
		li.hover(function() {
			$(this).addClass("selected_");
		}, function() {
			$(this).removeClass("selected_");
		});
		
		
		return true;
	}).blur(function(){
		var li = selectDiv.find("li");
		var isSelecting = false;
			li.each(function(){
				if(!isSelecting){
					isSelecting = $(this).hasClass("selected_");
				}
			}
		);
		
		if(!isSelecting && !isHoverDiv){
			selectDiv.hide();
		}
		return false;
	}
	);;
};

var $handleDate = function(row, col, params) {
	var begin = row[params.begin];
	var end = row[params.end];
	if(!begin){
		begin = "";
	}
	if(!end){
		end = "";
	}
	
	return begin + "-" + end;
};

var $handleImportanceFlag = function(row, col) {
	var value = row[col.dataField];
	return value == "1" ? "<p class='child_hot'><p>" : "";
};


var $handleTitleLink = function(row, col) {
	var url = $BASE_PATH + '/modules/common/download.jsp?id='+ row['id'] +"&module=" + ($('#tab').html() || 0);
	var func = "window.open('"+url+"'); return false;";
	var divNode = document.createElement("div");
	$(divNode).append("<li class='li_title'><a href='javascript:void(0);' onclick=\""+ func + "\"></a></li>");
	$(divNode).find("a").append($splitStr(row["title"],30));
	return divNode;
//	return "<li class='li_title'><a href='javascript:void(0);' onclick=\""+ func + "\">" + $splitStr(row["title"],30) + "</a></li>";
	
};

var $handleRemark = function(row, col) {
	return $splitStr(row["remark"],20);
};
var $handleJourney = function(row, col) {
	var div = "<div class='price_break'>";
	var split = i18n.prop('price.split');
	for(var i = 1; i <= row["journey"]; i <<= 1){
		if( (row["journey"] & i) == i){
			div += i18n.prop('price.journey.' + i) + split;
		}
	}
	if(div.lastIndexOf(split) == (div.length-split.length)){
		div = div.substring(0, div.length-split.length);
	}
	return div += "</div>";
};
var $handleCabin = function(row, col) {
	var div = "<div class='price_break'>";
	var split = i18n.prop('price.split');
	for(var i = 1; i <= row["cabin"]; i <<= 1){
		if( (row["cabin"] & i) == i){
			div += i18n.prop('price.cabin.' + i) + split;
		}
	}
	if(div.lastIndexOf(split) == (div.length-split.length)){
		div = div.substring(0, div.length-split.length);
	}
	return div += "</div>";
};

var  $dateFormatChange=function(row,col){
	var originalDate=row['lastUpdateTimeStr'];
	
//	var testDate=new Date();
////	testDate.setMonth(0,	1);
////	alert(testDate.format("yyyy-Mon-dd"));
//	
////	alert('originalDate: '+originalDate);
//	var originalDate_js=new Date();
////	alert('today: '+originalDate_js);
//	var dateFormat=originalDate;
	return  originalDate;
};

var changeDateFormat=function(originalDate){
	var months=["Jan","Feb"];
}

var $handleDownloadLink = function(row, col,params) {
	
	var id = 'display_' + row['id'];
	var selectId = 'select_' + row['id'];
	
	var attachs = row['attachs'];
	var divNode = document.createElement("div");
	if(attachs && attachs.length>0 && attachs[0].basicInfoId && attachs[0].basicInfoId !=null && attachs[0].basicInfoId !='null' ){
//		html +="<div>";
//		html +="<input type='text' class='txt download_list' id='"+id+"' readonly='readonly' value='Click to download'/>";
//		html +="<div class='check_content attach_download_list' id='"+selectId+"'>";
		$(divNode).append("<input type='text' class='txt download_list' id='"+id+"' readonly='readonly' value='"+$.i18n.prop("common.clickToDownload")+"'/>");
		var subDivNode = document.createElement("div");
		subDivNode.className="check_content attach_download_list";
		subDivNode.id=selectId;
		var ulNode = document.createElement("ul");
//		html +="<ul>";
		for(var i=0; i<attachs.length; i++){
			var attach = attachs[i];
			if(attach){
				var selectOptId = selectId+"_"+i;
				var fileName = attach.fileName;
				//var downloadPath = attach.downloadPath;
				//var path = attach.path;
				var url = "/IMPS/file/" + params.module + "/download.do?id=" + attach.id;
				var func = "window.open('"+url+"'); return false;";
//				var a = "<a href='"+url+"' target=_blank'>"+fileName+"</a>";
//				html +="<li class='txt-break' title='"+fileName+" 'id=\""+selectOptId+"\">"+a+"</li>";
//				html +="<li class='txt-break' title='"+fileName+" 'id=\""+selectOptId+"\" onclick=\" "+func+"\">"+fileName+"</li>";
//				var liNode = document.createElement("li");
//				liNode.className = "txt-break";
//				liNode.id = selectOptId;
//				$(liNode).attr("title",fileName);
//				$(liNode).die().live("click",function(){
//					window.open(url);
//					return false;
//				});
				$(ulNode).append("<li class='txt-break' title='"+fileName+" 'id=\""+selectOptId+"\" onclick=\""+func+"\" ></li>");
				
				var textNode = document.createTextNode(fileName);
//				$(liNode).append(textNode);
//				$(ulNode).append(liNode);
				
				$(ulNode).find("#" + selectOptId ).append(textNode);
			}
			$initSelector(selectId,id,null);
		}
		$(subDivNode).append(ulNode);
		$(divNode).append(subDivNode);
//		html +="</ul>";
//		html +="</div>";
//		html +="</div>";
	}
	return divNode;
};

var $removeErr;
var FormHelper = function(_gridConfig, _config) {
	
	var removeErr = function(id){
		var errClass = "error";
		$(id).removeClass(errClass);
		$("[for ='"+id.substring(1)+"']").remove();
	};
	$removeErr = removeErr;
	
	var config = {
		currentIndex : _config.currentIndex || 0,// 当前显示的选项卡
		formId : _config.formId,

		conditionRadioIds : _config.conditionRadioIds,// 查询条件选项卡ID拼接字符串,例如#query0,#query1,#query2
		conditionRadioName : _config.conditionRadioName,// 查询条件选项卡Radio名

		submitBtnId : _config.submitBtnId || '#submitBtn',// 表单提交按钮ID
		resetBtnId : _config.resetBtnId || '#resetBtn',// 表单重置按钮ID

		initDefaultValue : _config.initDefaultValue || (function() {
		}),// function 默认值设置
		initValidation : _config.initValidation,// function 表单提交校验

		submit : _config.submit || function() {
			if ($("#" + _config.formId).valid()) {
				grid.bindData();
			}
		},
		autoSubmit : (_config.autoSubmit == false ? false : true),
		beforeSubmit: _config.beforeSubmit || (function(){}),
		extInitFunc : _config.extInitFunc || (function() {
		})// 额外的初始化方法
	};

	var gridConfig = _gridConfig;

	var formId = _gridConfig.searchform || config.formId;

	var jqFormId = "#" + formId;

	var grid = "";

	// 初始化表格
	var initGrid = function() {
		if (gridConfig) {
			grid = new ECSGrid(gridConfig);
		}
	};

	// 清除查询数据
	var clearGrid = function(id) {
		$(jqFormId).html('');
	};

	this.onComplete = function() {
	};

	var reset = function() {
		$(jqFormId).each(function() {
			this.reset();
		});
	};

	// 隐藏所有查询选项,禁用所有隐藏的输入框
	var hideAllQueryInput = function(ids) {
		var sel = getJqIds(ids);
		$(sel).hide().find("input,select").each(function() {
			$(this).attr("disabled", true);
		});
	};

	var getJqIds = function(idArr) {
		var ids = "";
		for ( var i = 0; i < idArr.length; i++) {
			ids += "#" + idArr[i];
			ids += i != (idArr.length - 1) ? "," : "";
		}
		return ids;
	};

	var getJqId = function(id) {
		return "#" + id;
	};

	var enableQueryInput = function(id) {
		$(getJqId(id)).show().find("input,select").each(function() {
			$(this).attr("disabled", false); // 启用输入框
		});
	};

	// 初始化查询选项卡
	var checkedRadioId = "";
	var initQueryTabs = function(radioName, queryInputIdArr, currentIndex) {
		var checkedRadio = $("input[name='" + radioName + "']:checked");
		checkedRadioId = checkedRadio.attr("id");
		var radios = $("input[name=" + radioName + "]");

		var submitBtn = $(config.submitBtnId);
		if (radios.index(checkedRadio) === 0) {// 如果是第一个radio
			submitBtn.hide();
		} else {
			submitBtn.show();
		}

		// 查询切换
		radios.unbind().click(function() {
			if (checkedRadioId == $(this).attr("id"))
				return;// 点击已选中radio
			hideAllQueryInput(queryInputIdArr);
			enableQueryInput(queryInputIdArr[radios.index(this)]);
			removeValidateResult();
			checkedRadioId = $(this).attr("id");

			if (radios.index(this) === 0) {// 如果是第一个radio
				submitBtn.hide();
				config.submit();// 提交按钮隐藏，自动提交
			} else {
				submitBtn.show();
			}

		});

		hideAllQueryInput(queryInputIdArr);
		radios.each(function() {
			if (radios.index(this) == currentIndex) {
				$(this).attr("checked", 'checked');
				enableQueryInput(queryInputIdArr[radios.index(this)]);
				config.initDefaultValue();
			}
		});
	};

	var initSubmit = function() {
		$(config.submitBtnId).click(function() {
			if($(jqFormId).valid()){
				config.beforeSubmit();
				config.submit();
			}else{
				//校验失败
					if(_config.invalids && _config.invalids.errIds && _config.invalids.errMsg){
//						<p for="saleValidBegin" class="error">Start date no later than the due date</p>
						for(var i = 1 ; i<_config.invalids.errIds.length ; i++){
							var id = _config.invalids.errIds[i];
							var msg = _config.invalids.errMsg;
							var html = $("[for ='"+id.substring(1)+"']").html();
							if(html && html.indexOf(msg) >= 0){
								removeErr(id);
							}
						}
					
					}
				}
		});
	};

	var initReset = function() {
		$(config.resetBtnId).click(function() {
			reset();
		});
	};

	var initDateBox = function() {
		$(".datebox").each(function(i) {
			//console.info('abcdefghijklmnopqrstuvwxyz');
			new DatePicker($(this).attr("id") + i, {
				inputId : $(this).attr("id"),
				className : 'date-picker-wp'
			});
		});
	};

	var removeValidateResult = function() {
		$("p.error").remove();
		$(".error").removeClass("error").val("");
	};

	var init = function() {
		reset();

		initQueryTabs(config.conditionRadioName, config.conditionRadioIds, config.currentIndex);

		initDateBox();

		config.initDefaultValue();

		initGrid();

		config.initValidation();

		initSubmit();

		initReset();

		for ( var func in config.extInitFunc) {
			eval(func);
		}
		
		//点击时,去掉错误信息
		$(".validate-input").each(
			function (){
				$(this).click(function(){
					$removeErr('#' + $(this).attr('id'));
				});
			}
		);
	};
	init();

	if (config.autoSubmit) {
		config.submit();
	}

};

