$().ready(function() {
	i18n.init("service_font");// 国际化

	var searchMode = $("#search_mode").val();
	var autoSubmit = (searchMode == "allClassify") ? false : true;

	new FormHelper({
		tableClass : "nt",
		oddClass : "gray",
		renderTo : "serviceList",
		searchform : "serviceForm",
		url : $ECS_PATH + "/modules/service.do",
		pageposition:"button",
		complete : "$initDowloadList",
		columns : [ {
			headerText : "",
			dataField : "importance",
			handler : $handleImportanceFlag
		}, {
			headerText : i18n.prop('service.title'),
			dataField : "title",
			handler : $handleTitleLink
		}, {
			headerText : i18n.prop('service.valid_period'),
			dataField : "serviceValidDate",
			handler : {
				func : $handleDate,
				params : {
					begin: "validBeginDateStr",
					end : "validEndDateStr"
				}
			}
		}, {
			headerText : i18n.prop('service.remark'),
			dataField : "remark",
			handler : $handleRemark
		}, {
			headerText : i18n.prop('service.last_update_time'),
			dataField : "lastUpdateTime",
				handler : $dateFormatChange//2014-05-13 huzheyi
		}, {
			headerText : i18n.prop('service.download'),
			dataField : "contentPath",
			handler : {func : $handleDownloadLink, params : {module : "service"}}
		} ]
	},

	{
		currentIndex : 0,// 当前显示的选项卡
		formId : "serviceForm",
		autoSubmit : autoSubmit,
		beforeSubmit: function(){
			$("#search_allRadio").show();//搜索时显示全部可选搜索条件，和Search页面保持一致
			$("#crumbs_levleII_nohref").hide();
			$("#crumbs_levleII_href").show();//oh my god.
			
			$("#categories_resultDiv").hide();
			$("#search_resultDiv").show();
		},
		conditionRadioIds : ['query0','query1','query2'],// 查询条件选项卡ID拼接字符串,例如#query0,#query1,#query2
		conditionRadioName : "services",// 查询条件选项卡Radio名

		submitBtnId : "#submitBtn",// 表单提交按钮ID
		resetBtnId : "#resetBtn",// 表单重置按钮ID

		// function 默认值设置
		initDefaultValue : function() {
			$("#publisherEndDate").val(new Date().format("MM/dd/yyyy"));
		},
		
		invalids : {errMsg:i18n.prop('service.query.info.valid_period'), errIds:["#publisherBeginDate","#publisherEndDate"]},
		
		initValidation : function() {
			$("#serviceForm").validate({
				onfocusout: false,
				onkeyup: false,
				rules : {
					title : {
						required : true,
						/*maxlength : 30 original*/
						maxlength : 100,//huzheyi 2014-05-09,
						titleMaxLength : 100//huzheyi 2014-05-15
					},
					publisherBeginDate : {
						required : true,
						compareDate : {
							begin : '#publisherBeginDate',
							end : '#publisherEndDate'
						}
					},
					publisherEndDate : {
						required : true,
						compareDate : {
							begin : '#publisherBeginDate',
							end : '#publisherEndDate'
						}
					}
				},
				messages : {
					title : {
						required : i18n.prop('service.query.info.title'),
						maxlength : $.validator.format(i18n.prop('service.query.info_maxlength.title')),
						titleMaxLength : $.validator.format(i18n.prop('service.query.info_maxlength.title'))//huzheyi 2014-05-15
					},
					publisherBeginDate : {
						required : i18n.prop('service.query.info.release_begin_date'),
						compareDate : $.validator.format(i18n.prop('service.query.info.valid_period'))
					},
					publisherEndDate : {
						required : i18n.prop('service.query.info.release_end_date'),
						compareDate : $.validator.format(i18n.prop('service.query.info.valid_period'))
					}
				}
			});
		}

	}

	);
	
	
	if(searchMode == "allClassify"){
		$("#search_allRadio").hide();
		$.imps_showLoading("");
		$("#queryRadio1").click();
		$.ajax({
			type : "GET",
			dataType : "json",
			url : $ECS_PATH + "modules/service/json/categories.do?_=" + (new Date()).getTime(),
			data : '',
			complete : function(data) {
				if (data && data.responseText) {
					var json = null;
					try{
						json = JSON.parse(data.responseText);
					}catch(e){
						//debugger;
					}
					//该json是一个map，没有长度的
					if (json) {
						var downloadPath = $ECS_PATH + "/modules/common/download.jsp?module=3";
						//i 取1-7 1-7是类别的值，这里刚好是数字，是map的key
						for(var i = 1; i < 8; i++){
							if(json[i] != null){
								//目前每个类别最多显示3个
								for(var j = 0; j < json[i].length; j++){
									var textNode = document.createTextNode(json[i][j].title);
									$("#categories_li_" + i + "_" + j).append("<a href=\"#\" onclick=\"window.open('"+ downloadPath + "&id=" + json[i][j].basicInfoId + "');return false;\" ></a>");
									$("#categories_li_" + i + "_" + j).find("a").append(textNode);
								}
							}
						}
						
					}
				}
				
				$("#categories_resultDiv").show();
				$.imps_hideLoading("");
			}
		});
	}else {
		$("#search_resultDiv").show();
		if(searchMode == "all"){
			$("#search_allRadio").show();
		}else{
			$("#search_condition").hide();
		}
	}
	modifyDateWidth();
});

//huzheyi 2014-05-14
function modifyDateWidth(){
	
	var lang=null;
	if(langJsp!=null){
		lang=langJsp;
	}else{
		lang=Common.Cookie.get('language');
	}
	
	if($.trim(lang).lastIndexOf('zh')>=0){
		$('#serviceStartTime').attr('width','10%');
		$('#serviceEndTime').attr('width','10%');
	}else if($.trim(lang).lastIndexOf('en')>=0){
		$('#serviceStartTime').attr('width','4%');
		$('#serviceEndTime').attr('width','3%');
	}
}

