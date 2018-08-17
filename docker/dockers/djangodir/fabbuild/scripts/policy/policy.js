$().ready(function() {
	i18n.init("policy_font");

	var searchMode = $("#search_mode").val();
	var autoSubmit = (searchMode == "allClassify") ? false : true;
	
	new FormHelper({
		tableClass : "nt",
		oddClass : "gray",
		renderTo : "policyList",
		searchform : "policyForm",
		url : $ECS_PATH + "/modules/policy.do",
		complete : "$initDowloadList",
		pageposition:"button",
		columns : [ {
			headerText : "",
			dataField : "importance",
			handler : $handleImportanceFlag
		}, {
			headerText : i18n.prop('policy.title'),
			dataField : "title",
			handler : $handleTitleLink
		}, {
			headerText : i18n.prop('policy.valid_period'),
			dataField : "policyValidDate",
			handler : {
				func : $handleDate,
				params : {
					begin: "validBeginDateStr",
					end : "validEndDateStr"
				}
			}
		}, {
			headerText : i18n.prop('policy.remark'),
			dataField : "remark",
			handler : $handleRemark
		}, {
			headerText : i18n.prop('policy.last_update_time'),
			dataField : "lastUpdateTime",
			handler: $dateFormatChange
		}, {
			headerText : i18n.prop('policy.download'),
			dataField : "contentPath",
			handler : {"func" : $handleDownloadLink, params :  {"module" : "policy"}}
			
		} ]
	},

	{
		currentIndex : 0,
		formId : "policyForm",
		autoSubmit : autoSubmit,
		beforeSubmit: function(){
			$("#search_allRadio").show();
			$("#crumbs_levleII_nohref").hide();
			$("#crumbs_levleII_href").show();
			
			$("#categories_resultDiv").hide();
			$("#search_resultDiv").show();
		},
		conditionRadioIds : ['query0','query1','query2'],
		conditionRadioName : "polices",

		submitBtnId : "#submitBtn",
		resetBtnId : "#resetBtn",

		
		initDefaultValue : function() {
			$("#publisherEndDate").val(new Date().format("MM/dd/yyyy"));
		},
		
		invalids : {errMsg:i18n.prop('policy.query.info.valid_period'), errIds:["#publisherBeginDate","#publisherEndDate"]},
		
		initValidation : function() {
			$("#policyForm").validate({
				onfocusout: false,
				onkeyup: false,
				rules : {
					title : {
						required : true,
						/*maxlength : 30 original*/
						maxlength : 100,//huzheyi 2014-05-09
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
						required : i18n.prop('policy.query.info.title'),
						maxlength : $.validator.format(i18n.prop('policy.query.info_maxlength.title')),
						titleMaxLength : $.validator.format(i18n.prop('policy.query.info_maxlength.title'))//huzheyi 2014-05-15
					},
					publisherBeginDate : {
						required : i18n.prop('policy.query.info.release_begin_date'),
						compareDate : $.validator.format(i18n.prop('policy.query.info.valid_period'))
					},
					publisherEndDate : {
						required : i18n.prop('policy.query.info.release_end_date'),
						compareDate : $.validator.format(i18n.prop('policy.query.info.valid_period'))
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
			url : $ECS_PATH + "modules/policy/json/categories.do?_=" + (new Date()).getTime(),
			data : '',
			complete : function(data) {
				if (data && data.responseText) {
					var json = null;
					try{
						json = JSON.parse(data.responseText);
					}catch(e){
						//debugger;
					}
					
					if (json) {
						var downloadPath = $ECS_PATH + "/modules/common/download.jsp?module=2";
						
						for(var i = 1; i < 9; i++){
							if(json[i] != null){
								
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
		$('#policyStartTime').attr('width','10%');
		$('#policyEndTime').attr('width','10%');
	}else if($.trim(lang).lastIndexOf('en')>=0){
		$('#policyStartTime').attr('width','4%');
		$('#policyEndTime').attr('width','3%');
	}
}