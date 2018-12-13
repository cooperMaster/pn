$(function(){
	$initSelectors("#statusquery_div", "#statusqueryinp", "#statusquery",true);
	// 初始化表格
	//agent_report_query.init();
    //agent_report_query.reporttable.bindData();

	$("#end_agentfrom").validate({
		rules : {
			endReason : {
				required : true,
				maxlength : 200
			}
		},
		messages : {
			endReason : {
				required : /*"This field is required"*/$.i18n.prop("inter.require"),
				maxlength : /*"No more than {0} characters"*/$.i18n.prop("inter.notmore")
			}
		}
	});
	/**
	 * TODO System Info 系统信息
	 * 
	 * @param row
	 * @param col
	 * @returns {String}
	 */
	var System_report_query = {
		reporttable : "",
		/**
		 * TODO 初始化
		 * 
		 * @param row
		 * @param col
		 * @returns {String}
		 */
		init : function(agentids) {
			System_report_query.initGrid(agentids);
		},
		onComplete : function() {

		},

		/**
		 * TODO 初始化列表
		 * 
		 * @param row
		 * @param col
		 * @returns {String}
		 */
		initGrid : function(agentids) {
			System_report_query.reporttable = new ECSGrid({
				renderTo : "System_report_show",
				searchform:"agentfrom2",
				url : "modules/agents/selectByAgentidSystemInfo.do?agentid="+agentids,//position0
				tableClass : "data_nt BreakWord",
				oddClass : "lightblue",
				headerClass : "table_ct1_tr",
				headerAlign : "left",
				pageSize : 5 ,
				createBnExist : false,
				complete : "System_report_query.onComplete",
				columns : [ {
					headerText : "GDS",
					headerAlign : "center",
					dataField : "flag",
					handler : "System_report_query.systemFlag",
					width : "500"
				},
				{
					headerText : "PCC",
					headerAlign : "center",
					dataField : "pccinfo",
					//handler : "System_report_query.systemFlag",
					width : "500"
				}
				]
			});
		},
		
		systemFlag : function(row, col) {
			var systemname = row["systemname"];
			var returnvale="";
			//if(flag==="G"){
				returnvale=systemname;
			//}
			return returnvale;
		}
	};
})




/*
 * 上传文件
 */
function uploadTemplate() {
	$("#errormsg_show_txt").find("tr").not(":first").remove();
	$("input:radio[name='cover']:last").trigger("click");
	$("#user_regist_file_tab_show").show();
	showShadow();
	initAttachUploadFile("upload_file_original_name","upload_file_browse","upload_file_submit","EasyMilesTemplate");
}




/**
 * 新增用户备案
 */



//显示遮罩半透明背景
function showShadow() {
	$("#shadow_div_left", window.parent.document).show();
	$("#shadow_div_foot", window.parent.document).show();
	$("#shadow_div").show();
	$("html").addClass("overflow");
}
// 隐藏遮罩半透明背景
function hideShadow() {
	$("#shadow_div_left", window.parent.document).css("display", "none");
	$("#shadow_div_foot", window.parent.document).css("display", "none");
	$("#shadow_div").hide();
	$("html").removeClass("overflow");
}

/**
 * TODO 初始化拉框
 */
var $initSelectors = function(selectDivId, txtInputId, valInputId,readonly) {
	var selectDiv = $(selectDivId);
	var isHoverDiv=false;
	//selectDiv.hide();
	$(txtInputId).attr('readonly', readonly).click(
			function() {
				//i=0;
				//alert(i++);
				if (!selectDiv.is(":hidden")) {
					selectDiv.hide();
					return;
				}

				// 构造下拉内容css
				var $this = $(this);
				var pos = $this.position();
				var hei = $this.outerHeight();
				var wid = Number($this.outerWidth() - 2);
				var sroll = 0;
				$(".tab_div").each(
						function() {
							if ($(this).css("display") != "none") {
								var thisr = $(this).find(".sroll");
								if (thisr.length > 0
										&& thisr.css("display") != "none") {
									sroll = thisr.scrollTop();
								}

							}
						});
				var top = Number(pos.top) + Number(hei) - 1 + sroll;
				var left = pos.left;
				selectDiv.css({
					"top" : top,
					"left" : left,
					"width" : wid
				}).show();

				// 附加下拉内容css，用作显示隐藏判断用
				selectDiv.hover(function() {
					isHoverDiv=true;
					$(this).show();
				}, function() {
					isHoverDiv=false;
					$(this).hide();
				});
				var li = selectDiv.find("li");
				var selectLi = true;
				li.bind(
						"click",
						function() {
							if(selectLi===true){
							selectLi=false;
							var txt = $(this).html();
							//赋值到输入框
							$this.val($.trim(txt));
							selectDiv.hide();
							//选择州
							if (valInputId == "#state") {
								$("#checkStatePost").hide();
								$("#checkStatePost").html("");
								selectCity($(this).attr("name"),$("#postcode").val(), "cityquery_DIV_INSERT_UPDATE");
							}
							//区域
							if (valInputId == "#areaquery") {
								selectAreaOrgName($(this).attr("name"), "orgcodequery");
							}
							
							//POSTCODE选择
							if(valInputId == "#postcodeinp"){
								$("#checkpostcode").hide();
								$("#checkpostcode").html("");
								if($("#postcodeinp").val()==$(this).attr("name")){
								}else{
									selectByPostCodeCsnorg($(this).attr("name"));
								}
							}
							
							//办事处
							if(valInputId == "#orgcode") {
								if($("#orgcode").val()==$(this).attr("name")){
								}else{
									//通过办事处带出POSTCODE
									seletctPostcodeByOrgcode($(this).attr("name"),"postcode_DIV_INSERT_UPDATE");
								}
							}
							
							//国家
							if(valInputId =="#country"){
								if(orgcodeAgent!=""){
									
								}else{
									if($("#country").val()==$(this).attr("name")){
										
									}else{
										checkCountryN = false;
										$("#orgcode").val("");
										$("#orgname").val("");
										var orgcodequery=$("#orgcodequery_DIV_INSERT_UPDATE").find("ul"); 
										orgcodequery.empty();
										var perPostCode=$("#postcode_DIV_INSERT_UPDATE").find("ul"); 
										perPostCode.empty();
										var perCity=$("#cityquery_DIV_INSERT_UPDATE").find("ul");
										perCity.empty();
										//$("#cityquery_DIV_INSERT_UPDATE").css("height",'0px');
										//perCity.css("height",'0px');
										var perState=$("#statequery_DIV_INSERT_UPDATE").find("ul");
										perState.empty();
										//$("#statequery_DIV_INSERT_UPDATE").css("height",'0px');
										//var ispostcode = $(this).attr("ispostcode");
										
										var code = $(this).attr("name");
										//通过国家带出办事处
										selectByCountryCode(code,"orgcodequery_DIV_INSERT_UPDATE");
									}
								}
							}
							//赋值到隐藏输入框
							$(valInputId).val($(this).attr("name"));
						}
						}).hover(function() {
					$(this).addClass("selected_");
				}, function() {
					$(this).removeClass("selected_");
				});
						//下拉框输入不选择，失去焦点事件
			}).blur(function(){
				var li = selectDiv.find("li");
				var isSelecting = false;
					li.each(function(){
						if(!isSelecting){
							isSelecting = $(this).hasClass("selected_");
						}
					}
				);
				//失去焦点事件
				if(!isSelecting && !isHoverDiv){
					//隐藏DIV
					selectDiv.hide();
					
					if(valInputId == "#country"){
						if($("#countryinp").val()!=""){
								$("#country").val($("#countryinp").val());
								checkCountry($("#countryinp").val());
						}
					}
					
					if(valInputId == "#postcodeinp"){
						if($("#postcode").val()!=""&&$("#orgname").val()!=""){
							
							if($("#postcode").val()==$("#postcodeinp").val()){
							}else{
								$("#postcodeinp").val($("#postcode").val());
								checkPostcode($("#postcode").val(),$("#orgcode").val());
							}
						}
					}
					if(valInputId == "#state"){
						if($("#postcode").val()!=""&&$("#stateinp").val()!=""){
							
							if($("#stateinp").val()==$("#state").val()){
								
							}else{
								$("#state").val($("#stateinp").val());
								checkPostcodeState($("#postcode").val(),$("#stateinp").val());
							}
						}
					}
				}
				
				return false;
			})
;
};