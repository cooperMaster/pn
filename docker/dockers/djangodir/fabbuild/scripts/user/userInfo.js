//var userGUID = "agentUser111";
var userGUID = "";
var isRecords = true;
var isSkyPearlError = false,isSignInIdError = false;
$(document).ready(function() {
	// debugger;
 
	// 加载国际化提示信息
	loadBundles();

	display(userGUID);

	initDate('birthday');
	 
});

//初始化日期组件
function initDate(id) {
	new DatePicker(id + 0, {
		inputId : id,
		className : 'date-picker-wp'
	});
}
function display(userGUID) {
	// 显示代理用户信息
	$.ajax({
		type : "post",
		async : false,
		url : $ECS_PATH + "user/GetUserInfo.do",
		data : "userGUID=" + userGUID + "&csrftoken=" + token,
		success : function(data) {
	
			$("#userGUID").val(data.userGUID);

			// huzheyi 2014-05-04
			// alert('userType: '+data.userType);
			$("#userType").val(data.userType);
			// huzheyi 2014-05-04

			$("#userGUID").attr("readonly", true);
			$("#lastName").val(data.lastName);
			$("#lastName").attr("readonly", true);
			$("#firstName").val(data.firstName);
			$("#firstName").attr("readonly", true);
			$("#phone").val(data.phone);
			$("#email").val(data.email);
			
			if(data.joinEasyMiles == "2"){
				$('#skyPearlId').val(data.skyPearlId);
				$('#signInId').val(data.signInId);
				$('#birthday').val(data.birthday);
				$('#skyPearlId').attr('readonly',true);
				$('#signInId').attr('readonly',true);
				$('.checkbox-moreinfo').attr('checked',true);
				$('.checkbox-moreinfo').attr('disabled',true);
				$('.agreeContent').show();
				$(".moreinfo").show();
				$('#birthday').removeAttr('readonly');
			}else if(data.joinEasyMiles == "1"){
				$('.checkbox-moreinfo').attr('checked',false);
				$('.checkbox-moreinfo').removeAttr("disabled");
			}else {
				$('.checkbox-moreinfo').attr('checked',false);
				$('.checkbox-moreinfo').removeAttr("disabled");
				isRecords = false;
			}

		}
	});
}
function checkSkyPearlId(){
	$('#skyPearlIdMsg').text('');
	isSkyPearlError = false;
	var result=false;
	if(skyPearlIdCheck()){
		$.ajax({
			type : "post",
			url : $ECS_PATH + "user/checkExsitSkyPearlNotUserguid.do",
			data : {
				userGUID : $('#userGUID').val(),
				skyPearlId : $('#skyPearlId').val(),
				csrftoken : $('#csrftoken').val()
			},
			async: false,
			success : function(msg) {
				if(msg.code == "-1"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.skyPearlId.null'));
					isSkyPearlError = true;
				}else if(msg.code == "-2"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.skyPearlId.isNull'));
					isSkyPearlError = true;
				}else if(msg.code == "-3"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.userGUID.isNull'));
					isSkyPearlError = true;
				}else if(msg.code == "-4"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.skyPearlId.isRegister'));
					isSkyPearlError = true;
				}else if(msg.code == "-5"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.modifyErrorMsg-9'));//填写的明珠卡号与备案不一致
				}else if(msg.code == "-6"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.modifyErrorMsg-11'));//用户未备案
				}else if(msg.code == "-7"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.modifyErrorMsg-12'));//该明珠卡号已注册，请确认
				}else if(msg.code == "-8"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.modifyErrorMsg-13'));//该明珠卡号已注册，请确认
					
				}else if(msg.code == "1"){
					result=true;
				}
			 
			},
			error : function(msg) {
				alert(msg);
			}
		});
	}
	return result;
}
function checkSignInId(){
	$('#signInIdMsg').text('');
	var result=false;
//	if(signInIdCheck()){
		$.ajax({
			type : "post",
			url : $ECS_PATH + "user/checkExsitSigInNotUserguid.do",
			data : {
				userGUID : $('#userGUID').val(),
				signInId : $('#signInId').val(),
				csrftoken : $('#csrftoken').val()
			},
			async: false,
			success : function(msg) {
				if(msg.code == "-1"){
					$('#signInIdMsg').text($.i18n.prop('user.signInId.null'));
					isSignInIdError = true;
				}else if(msg.code == "-2"){
					$('#signInIdMsg').text($.i18n.prop('user.signInId.isNull'));
					isSignInIdError = true;
				}else if(msg.code == "-3"){
					$('#signInIdMsg').text($.i18n.prop('user.userGUID.isNull'));
					isSignInIdError = true;
				}else if(msg.code == "-4"){
					$('#signInIdMsg').text($.i18n.prop('user.signInId.isRegister'));
					isSignInIdError = true;
				}else if(msg.code == "-5"){
					$('#signInIdMsg').text($.i18n.prop('user.modifyErrorMsg-10'));//填写的Sign-in号与备案不一致
				}else if(msg.code == "-6"){
					$('#signInIdMsg').text($.i18n.prop('user.modifyErrorMsg-11'));//用户未备案
				}else if(msg.code == "1"){
					result= true;
				}
				 
			},
			error : function(msg) {
				alert(msg);
			}
		});
//	}
	return result;
}
function emailCheck2() {
	var result = false;
	var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	var emailStr = $("#email").val().trim();
	var userGUID = $("#userGUID").val();
	// alert("userGUID: "+userGUID);
	if (emailStr == '' || emailStr == null) {
		$("#emailMsg").text($.i18n.prop("v.user.t.mandatory"));
		return false;
	} else {
		if (!emailReg.test(emailStr) || $("#email").val().length > 100) {
			$("#emailMsg").text($.i18n.prop("v.user.t.emailFormatError"));
			return false;
		} else {
			// 校验邮箱唯一性
			$.ajax({
						type : "post",
						async : false, // 注意:async:false。设置为同步的，否则未等ajax执行完，就直接return初始的var
										// resutt=false了。
						url : $ECS_PATH + "usercheck/IsEmailExistForAlter.do",
						data : "email=" + emailStr + "&userGUID=" + userGUID
								+ "&csrftoken=" + token,
						// data: {email:emailStr},
						error : function(request) {
							result = false;
						},
						success : function(msg) {// 操作成功后的操作！msg是后台传过来的值
							if (!msg) {
								$("#emailMsg").text(
										$.i18n.prop("v.user.t.emailExist"));
								result = false;
							} else {
								result = true;
							}
						}
					});
			return result;
		}
	}
}

String.prototype.trim = function() {
	return (this.replace(/^\s+|\s+$/g, ""));
};

function phoneCheck() {
	var phoneReg = /^([0-9]*[\s\-|\/]*[0-9]*){1,30}$/;
	var phoneValue = $("#phone").val().trim();
	if (phoneValue == '' || phoneValue == null) {
		$("#phoneMsg").text($.i18n.prop("v.user.t.mandatory"));
		return false;
	} else {
		if (!phoneReg.test(phoneValue) || $("#phone").val().length > 30) {
			$("#phoneMsg").text($.i18n.prop("v.user.t.mandatoryOfPhone"));
			return false;
		}
	}
	return true;
}

function skyPearlIdCheck() {
	var skyPearlId = $('#skyPearlId').val().trim();
	if(skyPearlId == '' || skyPearlId == null) {
		$('#skyPearlIdMsg').text($.i18n.prop("v.user.t.mandatory"));
		return false;
	}else if(skyPearlId.length != 12){
		$('#skyPearlIdMsg').text($.i18n.prop("skyPearlIdMsg.error"));
		return false;
	}
	return true;
}


function signInIdCheck() {
	var signInId = $('#signInId').val().trim();
	var reg = new RegExp(/^[a-zA-Z0-9]+$|^\s*$/);
	if(signInId == '' || signInId == null) {
		var r=confirm("未填写sign－in号信息则系统无法给您自动累积里程，确定继续"+"?");
		  if (r==true){
		    	return true;
		    }else{
		    	$('#signInId').focus();
		    	return false;
		    }
	}else if(!reg.test(signInId)){
		$('#signInIdMsg').text($.i18n.prop("user.signInId.noChar"));
		return false;
	}
	return true;
}

function birthdayCheck() {
	var birthday = $('#birthday').val().trim();
	if(birthday == '' || birthday == null) {
		$('#birthdayMsg').text($.i18n.prop("v.user.t.mandatory"));
		return false;
	}
	return true;
}
//检查常客系统，姓名，明珠卡是否一致
function checkSkyPealIdAndName(){
	var data = "skyPearlId="+$('#skyPearlId').val()+"&"+
	"lastName="+$('#lastName').val()+"&"+
	"firstName="+$('#firstName').val()+"&"+
	"csrftoken="+$('#csrftoken').val();
	var result=false;
	$.ajax({
		type : "post",
		url : $ECS_PATH + "user/checkSkyPealId.do",
		data : data,
		async: false,
		success : function(msg) {
			if (msg.code == "1") { // 成功
				result=true;
			} else if(msg.code == "-1") {
				$("#reset_Psn_show2").hide();
				$('#skyPearlIdMsg').text($.i18n.prop("user.skyPearlId.isNull"));
				result=false;
			} else if(msg.code == "-2") {
				$("#reset_Psn_show2").hide();
				$('#skyPearlIdMsg').text($.i18n.prop("user.skyPearlId.membership.isNull"));
				result=false;
			} else if(msg.code == "-3") {
				$("#reset_Psn_show2").hide();
				$('#skyPearlIdMsg').text($.i18n.prop("user.skyPearlId.membership.isNull"));
				result=false;
			}
		}
	});
	return result;
}

function saveUserInfo() {
	$("#emailMsg").text("");
	$("#phoneMsg").text("");
	if(!isSkyPearlError){
		$("#skyPearlIdMsg").text("");
	}
	if(!isSignInIdError){
		$("#signInIdMsg").text("");
	}
	$("#birthdayMsg").text("");
	var check = true;
	if (!phoneCheck()) {
		check = false;
	}
	if (!emailCheck2()) {
		check = false;
	}
	if($('.selectPlan')[0].checked){
		if(!isRecords){
			$("#reset_success_show2")
			.find(".success")
			.html($.i18n.prop("v.list.t.noRecord"));
			$("#reset_success_show2").show();
			setTimeout("$('#reset_success_show2').hide(1000);$('#shadow_div').hide();",2000);
			check = false;
			return;
		}
		if(!skyPearlIdCheck()){
			check = false;
			return;
		}
		if(!birthdayCheck()){
			check = false;
			return;
		}
		if(!signInIdCheck()){
			check = false;
			return;
		}
		if(!checkSkyPearlId()){
			check = false;
			return;
		}
		if(!checkSignInId()){
			check = false;
			return;
		}
		if(!checkSkyPealIdAndName()){
			check = false;
			return;
		}
	}
	
	if (check) {// 校验
	// alert("$('#userInfoForm').serialize():
	// "+$('#userInfoForm').serialize()); 
//		var data = "skyPearlId="+$('#skyPearlId').val()+"&"+
//					"lastName="+$('#lastName').val()+"&"+
//					"firstName="+$('#firstName').val()+"&"+
//					"csrftoken="+$('#csrftoken').val();
		if($('.selectPlan')[0].checked){
//				if(checkSkyPearlId() && checkSignInId()){
//					$.ajax({
//						type : "post",
//						url : $ECS_PATH + "user/checkSkyPealId.do",
//						data :data,
//						success : function(msg) {
//							if(msg.code == "1"){ //成功
								var data = $('#userInfoForm').serialize();
								if($('.selectPlan')[0].checked){
									data+="&joinEasyMiles=2"
									
								}else{
									data+="&joinEasyMiles=1"
								}
								$.ajax({
									type : "post",
									url : $ECS_PATH + "user/UserInfoAlter.do",
									data :data,
									success : function(msg) {
										display(userGUID);
										if (msg > 0) {
											$("#reset_success_show2").find(".success").html(
													$.i18n.prop("v.list.t.submitSuccess"));
										} else if(msg === -2){
											$("#reset_success_show2").find(".success").html(
													$.i18n.prop("v.list.t.noRecord"));
										}else if(msg === -3){
											$("#reset_success_show2").find(".success").html(
													$.i18n.prop("user.skyPearlId.isNull"));
										}else if(msg === -6){
											$("#reset_success_show2").find(".success").html(
													$.i18n.prop("user.signInId.isNull"));
										}else if(msg === -7){
											$("#reset_success_show2").find(".success").html(
													$.i18n.prop("v.list.t.repeatsignInId"));
										}else if(msg === -8){
											$("#reset_success_show2").find(".success").html(
													$.i18n.prop("repeatskyPearlId"));
										}else if (msg === -9) {
											$("#reset_success_show2").find(".success")
											.html($.i18n.prop("user.modifyErrorMsg-9"));//填写的明珠卡号与备案不一致
										}else if (msg === -10) {
											$("#reset_success_show2").find(".success")
											.html($.i18n.prop("user.modifyErrorMsg-10"));//填写的Sign-in号与备案不一致
										}else if (msg === -12) {
											$("#reset_success_show2").find(".success")
											.html($.i18n.prop("user.modifyErrorMsg-12"));//该明珠卡号已经注册
										}else if (msg === -13) {
											$("#reset_success_show2").find(".success")
											.html($.i18n.prop("user.modifyErrorMsg-13"));//请使用原明珠卡号
										}
										$("#reset_success_show2").show();
										setTimeout("$('#reset_success_show2').hide(1000);",2000);
									}
								});
//							}else{
//								$('#skyPearlIdMsg').text(msg.errormsg);
//							}
//						}
//					});
//			}else{
//				//没有备案
//				$("#reset_success_show2").find(".success").html(
//						$.i18n.prop("v.list.t.noRecord"));
//				$("#reset_success_show2").show();
//				setTimeout("$('#reset_success_show2').hide(1000);",2000);
//			}
		}else{
			var data = $('#userInfoForm').serialize();
			if($('.selectPlan')[0].checked){
				data+="&joinEasyMiles=2"
				
			}else{
				data+="&joinEasyMiles=1"
			}
			$.ajax({
				type : "post",
				url : $ECS_PATH + "user/UserInfoAlter.do",
				data :data,
				success : function(msg) {
					display(userGUID);
					
					setTimeout("$('#reset_success_show2').hide(1000);", 2000);
					
					if (msg != null && msg > 0) {
						$("#reset_success_show2").find(".success").html(
								$.i18n.prop("v.list.t.submitSuccess"));
						$("#reset_success_show2").show();
						setTimeout("$('#reset_success_show2').hide(1000);",2000);
					} else {
						if(msg === -2){
							$("#reset_success_show2").find(".success").html(
									$.i18n.prop("v.list.t.noRecord"));
						}else{
							$("#reset_success_show2").find(".success").html(
									$.i18n.prop("v.list.t.submitUnsuccess"));
						}
						$("#reset_success_show2").show();
						setTimeout("$('#reset_success_show2').hide(1000);",2000);
					}
				}
			});
		}
	}

}

function loadBundles() {
	// jQuery.i18n.properties({
	// name:'user_font',
	// path:$ECS_PATH + 'messages/',
	// mode:'map',
	// language:Common.Cookie.get('language'),
	// cache:true,
	// encoding: 'UTF-8',
	// callback: function() {
	//	    	
	// }
	// });

	// 2014-3-12 huzheyi
	var lang = null;
	if (langJsp != null) {
		lang = langJsp;
	} else {
		lang = Common.Cookie.get('language');
	}
	jQuery.i18n.properties({
		name : 'user_font',// 资源文件名称
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