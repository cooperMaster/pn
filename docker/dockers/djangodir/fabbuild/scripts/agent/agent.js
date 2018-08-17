var checkE=true;
var checkuser = true;
var checkIsPostCode = false;
var dataAgent = null;
$().ready(function() {
	if(userType!=4){
		$("#Submit").hide();
	}
	$('#shadow_div').hide();
	i18n.init("agent_font");//国际化//original agent_font_zh
//	查询当前用户
	selectAgent("");
	//初始化下拉框模糊查找
	countryClickInit();
//	初始化下拉输入框
	$initSelectors("#statequery_DIV_INSERT_UPDATE","#statesel","#state");
	//$initSelectors("#orgcodequery_DIV","#orgname","#orgcode");
	$initSelectors("#cityquery_DIV_INSERT_UPDATE","#citysel","#city");
	$initSelectors("#countryquery_DIV_INSERT_UPDATE","#countryinp","#country");
	$initSelectors("#postcode_DIV_INSERT_UPDATE","#postcode","#postcodeinp");
	
//	设置验证信息
	$("#update_agent").validate({
		rules : {
			loweragent : {
//				required : true,
				maxlength : 100
			},
			postcode : {
				required : true,
				number: true,
				maxlength : 10
			},
			address : {
				required : true,
				maxlength : 100
			},
			orgname : {
				required : true
				//maxlength : 30
			},
			statesel : {
				required : true,
				maxlength : 30
			},
			citysel : {
				required : true,
				maxlength : 100
			},
			license : {
				//number : true,
				maxlength : 30
			},
			taxref : {
				maxlength: 30
			},
			userguid : {
				required : true,
				checkUserId: true,
				maxlength : 30,
				minlength : 6
			},
			lastname : {
				required : true,
				maxlength: 30
			},
			fristname : {
				required : true,
				maxlength: 30
			},
			email : {
				required : true,
				email : true,
				checkEmail: true
			},
			phone : {
				required : true,
				checkPhone : true,
				maxlength : 30
			}
			
		},
		messages : {
			loweragent : {
//				required : $.i18n.prop("agent.agencyname"),//"Please enter a Agency Name."
				maxlength : $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			postcode : {
				required : i18n.prop('agent.postcode'),
				number: $.i18n.prop("agent.number"),//"Please enter a valid number."
				maxlength: $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			address : {
				required : i18n.prop('agent.address'),
				maxlength: $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			orgname : {
				required : i18n.prop('agent.orgcode')
			},
			statesel : {
				required : i18n.prop('agent.state'),
				maxlength: $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			citysel : {
				required : i18n.prop('agent.city'),
				maxlength: $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			license : {
				maxlength: $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			taxref : {
				maxlength: $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			userguid : {
				required : $.i18n.prop("agent.require"),//"This field is required"
				maxlength : $.i18n.prop("agent.notmore"),//"No more than {0} characters",
				minlength : $.i18n.prop("agent.notless")//"No least than {0} characters"
			},
			lastname : {
				required : $.i18n.prop("agent.require"),//"This field is required",,
				maxlength: $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			fristname : {
				required : $.i18n.prop("agent.require"),//"This field is required",,
				maxlength: $.validator.format($.i18n.prop("agent.notmore"))//"Please enter no more than {0} characters."
			},
			email : {
				required : $.i18n.prop("agent.require"),//"This field is required",
				maxlength: $.validator.format($.i18n.prop("agent.notmore")),//"Please enter no more than {0} characters."
				email : $.i18n.prop("agent.validEmail")//"Please enter a valid email address"
			},
			phone : {
				required : $.i18n.prop("agent.require"),//"This field is required",
				maxlength: $.validator.format($.i18n.prop("agent.notmore")),//"Please enter no more than {0} characters."
				maxlength : $.i18n.prop("agent.notmore")//"No more than {0} characters"
			}
		}
	});
	
	//自定用户名的验证
	jQuery.validator.addMethod("checkUserId", function(value, element) {  
		 var userGUIDReg  = /^[\w_@.]{6,30}$/;
		 var userGUIDnotNumReg=/^\d*$/;
		  if(userGUIDReg.test(value)){
			  if(userGUIDnotNumReg.test(value)){
				  return false;
			  }
		      return true;
		  }else{
		   return false;
		  }
	}, $.validator.format($.i18n.prop("agent.userIDrequire")));//'Mandatory field, 6 to 30 non-pure numbers,support "-","@" and "."'
	//自定电话的验证
	jQuery.validator.addMethod("checkPhone", function(value, element) {  
		var phoneReg  =  /^([0-9]*[\s\-|\/|+]*[0-9]*){1,30}$/;
			if(!phoneReg.test(value) || value.length > 30){
				return false;
			}
		return true;
	}, $.validator.format($.i18n.prop("agent.validTel")));//'Mandatory field, no more than 30 numbers and "-","/","+"'
	//自定Email的验证
	jQuery.validator.addMethod("checkEmail", function(value, element) {  
		checkEmail(value);       
	     return checkE;
	}, $.validator.format($.i18n.prop("agent.emailexist")));//"E-mail. already exist"
	
});


/**
 * TODO 查询当前用户的代理信息
 * @param agentid
 */

function selectAgent(agentid){
	var datas=[];
	datas[datas.length] = {
			name : "agentid",
			"value" : agentid};
	datas[datas.length] = {
			name : "csrftoken",
			"value" : token};
	$.ajax({
		type : "post",
		url : "selectByAgentId.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			if(result!=""&&result!=null){
				//是否在流程审批中（0：不在，1：在 2:没提交  3:初始装态）
				if(result.flowstatus==="0"||result.flowstatus==="3"){
					//selectOrgName("orgcodequery_DIV");
					$("#agentid").val(result.agentid);
					$("#channelid").val(result.channelid);
					$("#userStatus").val(userStatus);
					$("#settlementcode").val(result.settlementcode).css({"background-color":"#F0E9E9"});
					$("#agentname").val(result.agentname).css({"background-color":"#F0E9E9"});
					//判断是否修改过
					if(userStatus==="N"||userStatus==="A"){
						dataAgent = result;
						$("#loweragent").val(result.loweragent).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#countryinp").val(result.countryname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#orgname").val(result.orgname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#orgcode").val(result.orgcode);
						//得到代理对应的POSTCODE
						seletctPostcodeByOrgcode(result.orgcode,"postcode_DIV_INSERT_UPDATE");
						$("#countryinp").val(result.countryname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#country").val(result.country);
						$("#fristname").val(result.fristname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#email").val(result.email).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#oldEmail").val(result.email);
						$("#lastname").val(result.lastname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#phone").val(result.phone).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#userguid").attr('disabled', 'disabled').val(result.userguid).css({"background-color":"#F0E9E9"});
					}else{
						//初始化的数据第一次登录加载数据
						$("#loweragent").val(result.loweragent);
						$("#countryinp").val(result.countryname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});;
						$("#orgname").val(result.orgname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
						$("#orgcode").val(result.orgcode);
						seletctPostcodeByOrgcode(result.orgcode,"postcode_DIV_INSERT_UPDATE");
						$("#country").val(result.country);
						//2014-03-17 huzheyi
						//检测国家是不是有POSTCDOE或办事处
//						checkCountryPostOrg(result.country);
						//判断是不是来自OCM
						if(userFrom!=null){
							if(userFrom){
								$("#fristname").val("");
								$("#lastname").val("");	
								$("#userguid").val("");
								//检测国家是不是有POSTCDOE或办事处
								//checkCountryPostOrg(result.country);
							}
						}
						$("#email").val(result.email);
						$("#oldEmail").val(result.email);
						$("#phone").val(result.phone);
						$("#oldUserId").val(result.userguid)
					}
					
					$("#postcode").val(result.postcode);
					$("#postcodeinp").val(result.postcode);
					$("#license").val(result.license);
					$("#address").val(result.address);
					$("#statesel").val(result.state);
					$("#state").val(result.state);
					$("#city").val(result.city);
					$("#citysel").val(result.city);
					$("#Submit").show();	
				}
				
				if(result.flowstatus==="1"){
					$("#agentid").attr('disabled', 'disabled').val(result.agentid).css({"background-color":"#F0E9E9"});
					$("#license").attr('disabled', 'disabled').val(result.license).css({"background-color":"#F0E9E9"});
					$("#taxref").attr('disabled', 'disabled').val(result.taxref).css({"background-color":"#F0E9E9"});
					$("#orgname").attr('disabled', 'disabled').val(result.orgname).css({"background-color":"#F0E9E9"});
					$("#orgcode").attr('disabled', 'disabled').val(result.orgcode).css({"background-color":"#F0E9E9"});
					$("#postcode").attr('disabled', 'disabled').val(result.postcode).css({"background-color":"#F0E9E9"});
					$("#address").attr('disabled', 'disabled').val(result.address).css({"background-color":"#F0E9E9"});
					$("#countryinp").val(result.countryname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
					$("#statesel").attr('disabled', 'disabled').val(result.state).css({"background-color":"#F0E9E9"});
					$("#state").attr('disabled', 'disabled').val(result.state).css({"background-color":"#F0E9E9"});
					$("#city").attr('disabled', 'disabled').val(result.city).css({"background-color":"#F0E9E9"});
					$("#citysel").attr('disabled', 'disabled').val(result.city).css({"background-color":"#F0E9E9"});
					$("#userguid").attr('disabled', 'disabled').val(result.userguid).css({"background-color":"#F0E9E9"});
					$("#loweragent").attr('disabled', 'disabled').val(result.loweragent).css({"background-color":"#F0E9E9"});
					$("#fristname").val(result.fristname).css({"background-color":"#F0E9E9"});
					$("#email").val(result.email).css({"background-color":"#F0E9E9"});
					$("#oldEmail").val(result.email);
					$("#lastname").val(result.lastname).css({"background-color":"#F0E9E9"});
					$("#phone").val(result.phone).css({"background-color":"#F0E9E9"});
					$("#settlementcode").val(result.settlementcode).css({"background-color":"#F0E9E9"});
					$("#agentname").val(result.agentname).css({"background-color":"#F0E9E9"});
				}
			}else{
			}
		},
		error : function(e) {
		}
	});
}

/**
 * TODO 打开提示框
 */
//huzheyi 2014-05-13
function resetPsnShowSubmit() {
	
	inputTrim("update_agent");
	if(!$("#update_agent").valid()){
		return ;
	}
	if(!checkuser||!checkE){
		return ;
	}
	$("#city").val($("#citysel").val());
	$("#state").val($("#statesel").val());
	$('#shadow_div').show();
	$("#reset_Psn_show_Submit").show();
}

/**
 * TODO 关闭提示框
 */
function delsuccessshowSubmit() {
	$('#shadow_div').hide();
	$("#reset_Psn_show_Submit").hide();
}

/**
 * TODO 确定提交修改信息
 */
//huzheyi 2014-05-13
function againDefineShowSubmit() {
	var datas = $("#update_agent").serializeArray();
	$.imps_showLoading("");
	//提交数据
	$.ajax({
		type : "post",
		url : "updateAgent.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			  $.imps_hideLoading("");
			$("#supply_top").hide();
			$("#reset_Psn_show_Submit").hide();
			$("#shadow_div").hide();
			
			//20140716 huzheyi
			if(typeof result!='undefined'&&result!=null&&result==true){
				$("#reset_success_show_Submit").show();
				setTimeout("$('#reset_success_show_Submit').hide(1000);", 2000);
			}else{
				$("#reset_unsuccess_show_Submit").show();
				setTimeout("$('#reset_unsuccess_show_Submit').hide(1000);", 2000);
			}
			
			//original
//			$("#reset_success_show_Submit").show();
//			setTimeout("$('#reset_success_show_Submit').hide(1000);", 2000);
			
			//disabledAgent();
			if(userStatus==="Y"){
				//window.location.href="../../modules/user/modifypsd.jsp";
				window.location.href='../../modules/agent/info.jsp';
			}
		},
		error : function(e) {
			  $.imps_hideLoading("");
				$("#reset_Psn_show_Submit").hide();
		}
	});
}


/**
 * TODO 动态生成省
 * 
 * @param valueState
 * @returns {Boolean}
 */
function checkState(valueState) {
	if (valueState != "" && valueState != null) {
		selectState(valueState, 'statequery_DIV_INSERT_UPDATE');
	}
	return false;
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
							//POSTCODE选择
							if(valInputId == "#postcodeinp"){
								$("#checkpostcode").hide();
								$("#checkpostcode").html("");
								if($("#postcodeinp").val()==$(this).attr("name")){
								}else{
									selectByPostCodeCsnorg($(this).attr("name"));
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
//					POSTCODE输入框失焦点事件
					if(valInputId == "#postcodeinp"){
						if($("#postcode").val()!=""&&$("#orgname").val()!=""){
							
							if($("#postcode").val()==$("#postcodeinp").val()){
							}else{
								$("#postcodeinp").val($("#postcode").val());
								checkPostcode($("#postcode").val(),$("#orgcode").val());
							}
						}
					}
//					州输入框失焦点事件
					if(valInputId == "#state"){
						if($("#postcode").val()!=""&&$("#statesel").val()!=""){
							
							if($("#state").val()==$("#statesel").val()){
								
							}else{
								$("#state").val($("#statesel").val());
								checkPostcodeState($("#postcode").val(),$("#statesel").val());
							}
						}
					}
				}
				
				return false;
			})
;
};


/**
 * TODO 检查代理名是否重
 * 
 * @param value
 */
function checkAgentname(value,sr){
	if(value==null&&value==""){
		return;
	}
	var datas={agentname:value};
	$.ajax({
		type : "post",
		url : "checkAgentname.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			if(result>1){
				$("#loweragentShow").show();
			}
		},
		error : function(e) {
//			if (confirm(i18n.prop('agent.confirm'))) {
//			}
		}
	});
}

function getAgentInfo(){
	var datas={settlementcode:"00001544"};
	$.ajax({
		type : "post",
		url : "getAgentInfo.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			if(result>1){
				$("#loweragentShow").show();
			}
		},
		error : function(e) {
//			if (confirm(i18n.prop('agent.confirm'))) {
//			}
		}
	});
}
/**
 * 禁编制
 */
function disabledAgent(){
	$("#agentid").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#license").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#taxref").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#orgname").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#orgcode").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#countryinp").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	
	$("#postcode").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#address").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#statesel").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#state").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#city").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#citysel").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#userguid").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	//$("#loweragent").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#userguid").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#loweragent").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#fristname").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#email").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#lastname").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	$("#phone").attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
	//$("#prompt").show();	
	$("#Submit").hide();
}

function inputTrim(formid){
	//formid指定表单的id
	   var fom = $("#"+formid);
	 //下面是获取选择了的表单
	   var inpt = fom.find("input[type=text]"); 
	//由上面的表单获取里面的值
	   inpt.each(function(){
	       var value = $(this).val();
	       var valueTrim = $.trim(value);
	      // var valueTrim = value.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
	       $(this).attr("value",valueTrim);//;
	    });
	//输出选择的值
	   //alert(value);
	 } 
/**
 * TODO 检查代理用户
 */

function checkuser(value) {
	
}


function checkusers(){
	value = $("#userguid").val();
	if (value == "") {
		return false;
	}
	// 请求后台查询数据
	var datas = {
			userGuid : value
	};
	$.ajax({
		type : "post",
		url : "checkUsername.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			var json = result;
			// 判断是不是有数据有数据为已存在
			if (json=== true ) {
				$("#checkuser").hide();
				checkuser = true;
				return;
			} else {
				checkuser = false;
				$("#checkuser").show();
				$("#checkuser").html("User ID. already exists ");
			}
		},
		error : function(e) {
		}
	});
}

/**
 * TODO 检查代理用户的邮箱
 */
function checkEmail(value) {
	// agentfrom_insert_update
	if (value == "") {
		return false;
	}
	var oldEmail=$("#oldEmail").val();
	if(oldEmail===value){
		return false;
	}
	// 请求后台查询数据
	var datas = {
			email : value
	};
	$.ajax({
		type : "get",
		url : "checkEmail.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			var json = result;
			if (json=== true ) {
				checkE = true;
				return true;
			} else {
				checkE = false;
				return false;
			}
		},
		error : function(e) {
		}
	});
}




function countryClickInits() {
	$(".check_iconAgent").click(function(){
		var $this = $(this);
		var par = $this.parent().find(".check_content");
		var li = par.find("li");
		$this.keyup(function(){
					var val= $this.val();
					if(val.length >1){
						var val2 =val.substr(0,1);
						var val3 = val.substr(1);
						var val_input = val2.toUpperCase()+val3;
					}else{
						val_input = val.toUpperCase();
					}
					li.hide();
					li.each(function(){
						if($(this).html().indexOf(val_input) > -1){
							$(this).show();
						}
					});
				});
	});
}


/**
 * TODO 通过Postcode查办事处
 * 
 * @param valueState
 * @returns {Boolean}
 */
function selectByPostCodeCsnorg(valueState) {
		selectByPostCodeC(valueState);
}



function selectByPostCodeC(valueState){
	
			  checkState(valueState);
}

/**
 * TODO 过通postcode和City查询办事处的信息
 * @param orgcode
 */
function selectByStateCsnorg(state,postcode){
	var datas = {
			state	: state ,postcode : postcode
	};
	//查找办事处
	$.ajax({
		type : "post",
		url : "selectByStateCsnorg.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			if(result!=null){
				  $("#orgname").val(result.orgname);
				  $("#orgcode").val(result.orgcode);
			}else{
				 $("#orgname").val("");
				 $("#orgcode").val("");
			}
		},
		error : function(e) {
		}
	});
}


/**
 * TODO 查询办事处的信息
 * @param orgcode
 */
function selectCsnorg(isOrgcode){
	var datas = {
			orgcode	: isOrgcode
	};
	//查找办事处
	$.ajax({
		type : "post",
		url : "selectByOrgcode.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			  $("#orgname").val(result.orgname);
			  $("#orgcode").val(result.orgcode);
		},
		error : function(e) {
		}
	});
}


/**
 * 判断POSTCODE与办事处是否匹配
 * @param postcode
 * @param orgcode
 */
function checkPostcode(postcode,orgcode){
	var datas = {"postcode":postcode,"orgcode":orgcode};
	 $.ajax({
			type : "post",
			url : "checkPostcode.do",
			data : datas,
			dataType : "json",
			success : function(result) {
				//判断POSTCODE与办事处是否匹配
				if(result.length>0){
					$("#checkpostcode").hide();
					$("#checkpostcode").html("");
					selectPostCodeState(result,"statequery_DIV_INSERT_UPDATE");
				}else{
					if($("#postcode_DIV_INSERT_UPDATE").find("ul").find("li").length>0){
						$("#checkpostcode").show();
						//$("#checkpostcode").html("您输入的postcode与办事处不匹配，是否确定输入！");
						$("#checkpostcode").html($.i18n.prop("agent.checkpostcode"));
					}
				}
			},
			error : function(e) {
			}
	 });
}

/**
 * 判断POSTCODE与城市是否匹配
 * @param postcode
 * @param Sstate
 */
function checkPostcodeState(postcode,state){
	var datas = {"postcode":postcode,"state":state};
	 $.ajax({
			type : "post",
			url : "checkPostcodeState.do",
			data : datas,
			dataType : "json",
			success : function(result) {
				//判断POSTCODE与城市是否匹配
				if(result.length>0){
					$("#checkStatePost").hide();
					$("#checkStatePost").html("");
					selectStateCity(result,"cityquery_DIV_INSERT_UPDATE");
				}else{
					if($("#statequery_DIV_INSERT_UPDATE").find("ul").find("li").length>0){
						$("#checkStatePost").show();
						//$("#checkStatePost").html("您输入的城市与postcode不匹配，是否确定输入！");
						$("#checkStatePost").html($.i18n.prop("agent.checkStatePost"));
					}
				}
			},
			error : function(e) {
			}
	 });
}

//模糊查询下拉框
function countryClickInit() {
	$(".check_list").click(function(){
		var $this = $(this);
		var par = $this.parent().find(".check_content");
		var li = par.find("li");
		$this.keyup(function(){
					var val= $this.val();
					if(val.length >1){
						var val2 =val.substr(0,1);
						var val3 = val.substr(1);
						var val_input = val2.toUpperCase()+val3;
					}else{
						val_input = val.toUpperCase();
					}
					li.hide();
					li.each(function(){
						if($(this).html().indexOf(val_input) > -1){
							$(this).show();
						}
					});
				});
	});
}
