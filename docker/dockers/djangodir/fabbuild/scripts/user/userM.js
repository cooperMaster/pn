var RESUT_TABLE_ID = "__ecstable";
// 查询结果表格对象
var maintable;
var logtable;
var rowUserGUID;// 查询列表每一列对应的用户账号
var isNew = true;// 新增用户，false为修改用户
var currentActionList;
var addUserType;
var currentUserGUID;// 当前登录账号
var currentUserType;// 当前登录账号用户类型

// huzheyi 2014-05-13
var original_email = null;

var isRecords = true;

$(document).ready(function() {
	// debugger;

	// 加载国际化提示信息
	loadBundles();

	// 分页查询表格初始化
	initGrid();
	$.imps_showLoading("");
	maintable.bindData();

	initDate('birthday');

	// 勾选同意
	$('.selectPlan').on('change', function() {
		if (!$(this)[0].checked) {
			$('.agreeContent').hide();
			$('#skyPearlId').attr('readonly', true);
			$('#signInId').attr('readonly', true);
			$('#birthday').attr('readonly', true);
		} else {
			$('.agreeContent').show();
//			$(this).attr('disabled', true);
			$('#skyPearlId').attr('readonly', false);
			$('#signInId').attr('readonly', false);
			$('#birthday').attr('readonly', false);
		}
	});
	
	var conLeftHeight = $("#child_nav").height();
	var innerHerght = $(window).height();  //窗口高度
	var clientHeight = $(document.body).height(); //页面高度
	if(clientHeight<innerHerght){
		var disparity = innerHerght - clientHeight;
		$("#child_nav").height(conLeftHeight+disparity);
	}
	
	$("#userGUID1").bind("blur",function(){
		userGUIDCheck(1);
	})
	
});
// 初始化日期组件
function initDate(id) {
	new DatePicker(id + 0, {
		inputId : id,
		className : 'date-picker-wp'
	});
}
function userGUIDCheck(i) {
	// debugger;
	var result = false;
	// var userGUID = $("#userGUID").parent().html();
	var userGUID = $("#userGUID" + i).val().trim();
	// var userGUIDReg = /^[0-9A-Za-z]{6,30}$/;
	var userGUIDReg = /^[\w_@.]{6,30}$/;
	var userGUIDReg2 = /^[0-9]{6,30}$/;
	// alert("userGUID: "+userGUID);
	if (userGUID == '' || userGUID == null) {
		$("#userGUIDMsg" + i).text($.i18n.prop("v.user.t.mandatory"));
		// alert($.i18n.prop("v.list.t.userGUIDBlank"));
		return false;
	} else {
		if (userGUIDReg2.test(userGUID) || !userGUIDReg.test(userGUID)) {
			$("#userGUIDMsg" + i).text($.i18n.prop("v.user.t.mandatoryOfUserGUID"));
			return false;
		} else {
			if (isNew) {
				// 校验用户名唯一性
				$.ajax({
					type : "post",
					async : false,
					url : $ECS_PATH + "usercheck/IsAccountExist.do",
					data : "userGUID=" + userGUID + "&csrftoken=" + token,
					error : function(request) {
						result = false;
					},
					success : function(msg) {// 操作成功后的操作！msg是后台传过来的值
						if (!msg) {
							$("#userGUIDMsg" + i).text($.i18n.prop("v.user.t.userGUIDExist"));
							// alert($.i18n.prop("v.list.t.userGUIDExist"));
							result = false;
						} else {
							$("#userGUIDMsg" + i).text("");
							result = true;
						}
					}
				});
				return result;
			} else {
				return true;
			}
		}
	}
}

//检查明珠卡号有没有重复
function checkSkyPearlId (){
	$('#skyPearlIdMsg').text('');
	var result=false;
	if(skyPearlIdCheck()){
		$.ajax({
			type : "post",
			url : $ECS_PATH + "user/checkExsitSkyPearlNotUserguid.do",
			async: false,
			data : {
				userGUID : $('#userGUID2').val(),
				skyPearlId : $('#skyPearlId').val(),
				csrftoken : $('#csrftoken').val()
			},
			success : function(msg) {
				if(msg.code == "-1"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.skyPearlId.null'));
					  
				}else if(msg.code == "-2"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.skyPearlId.isNull'));
					
				}else if(msg.code == "-3"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.userGUID.isNull'));
					
				}else if(msg.code == "-4"){
					$('#skyPearlIdMsg').text($.i18n.prop('user.skyPearlId.isRegister'));
					
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

//检查signin号有没有重复
function checkSignInId(){
	$('#signInIdMsg').text('');
	var result=false;
//	if(signInIdCheck()){
		$.ajax({
			type : "post",
			url : $ECS_PATH + "user/checkExsitSigInNotUserguid.do",
			async: false,
			data : {
				userGUID : $('#userGUID2').val(),
				signInId : $('#signInId').val(),
				csrftoken : $('#csrftoken').val()
			},
			success : function(msg) {
				if(msg.code == "-1"){
					$('#signInIdMsg').text($.i18n.prop('user.signInId.null'));
					
				}else if(msg.code == "-2"){
					$('#signInIdMsg').text($.i18n.prop('user.signInId.isNull'));
					
				}else if(msg.code == "-3"){
					$('#signInIdMsg').text($.i18n.prop('user.userGUID.isNull'));
					
				}else if(msg.code == "-4"){
					$('#signInIdMsg').text($.i18n.prop('user.signInId.isRegister'));
					
				}else if(msg.code == "-5"){
					$('#signInIdMsg').text($.i18n.prop('user.modifyErrorMsg-10'));//填写的Sign-in号与备案不一致
					
				}else if(msg.code == "-6"){
					$('#signInIdMsg').text($.i18n.prop('user.modifyErrorMsg-11'));//用户未备案
					
				}else if(msg.code == "1"){
					 result=true;
				}
				 
			},
			error : function(msg) {
				alert(msg);
			}
		});
//	}
	return result;
}
function emailCheck(i) {
	var result = false;
	var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	var emailStr = $("#email" + i).val().trim();
	if (emailStr == '' || emailStr == null) {
		$("#emailMsg" + i).text($.i18n.prop("v.user.t.mandatory"));
		// alert($.i18n.prop("v.list.t.emailBlank"));
		return false;
	} else {
		if (!emailReg.test(emailStr) || $("#email" + i).val().length > 100) {
			$("#emailMsg" + i).text($.i18n.prop("v.user.t.emailFormatError"));
			// alert($.i18n.prop("v.list.t.emailFormatError"));
			return false;
		} else {

			// huzheyi 2014-05-13
			if (emailStr != original_email) {
				// 校验邮箱唯一性
				$.ajax({
					type : "post",
					async : false, // 注意:async:false。设置为同步的，否则未等ajax执行完，就直接return初始的var
					// resutt=false了。
					url : $ECS_PATH + "usercheck/IsEmailExist.do",
					data : "email=" + emailStr + "&csrftoken=" + token,
					// data: {email:emailStr},
					error : function(request) {
						result = false;
					},
					success : function(msg) {// 操作成功后的操作！msg是后台传过来的值
						if (!msg) {
							$("#emailMsg" + i).text(
									$.i18n.prop("v.user.t.emailExist"));
							// alert($.i18n.prop("v.list.t.emailExist"));
							result = false;
						} else {
							result = true;
						}
					}
				});
				// huzheyi 2014-05-13
			} else {
				result = true;
			}

			return result;
		}
	}
}

function emailCheck2(i) {
	var result = false;
	var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	var emailStr = $("#email" + i).val().trim();
	var userGUID = $("#userGUID" + i).val();
	if (emailStr == '' || emailStr == null) {
		$("#emailMsg" + i).text($.i18n.prop("v.user.t.mandatory"));
		// alert($.i18n.prop("v.list.t.emailBlank"));
		return false;
	} else {
		if (!emailReg.test(emailStr) || $("#email" + i).val().length > 100) {
			$("#emailMsg" + i).text($.i18n.prop("v.user.t.emailFormatError"));
			// alert($.i18n.prop("v.list.t.emailFormatError"));
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
						$("#emailMsg" + i).text(
								$.i18n.prop("v.user.t.emailExist"));
						// alert($.i18n.prop("v.list.t.emailExist"));
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

function lastNameCheck(i) {
	var lastNameValue = $("#lastName" + i).val().trim();
	if (lastNameValue == '' || lastNameValue == null) {
		$("#lastNameMsg" + i).text($.i18n.prop("v.user.t.mandatory"));
		// alert($.i18n.prop("v.list.t.lastNameBlank"));
		return false;
	} else {
		if (lastNameValue.length > 50) {
			$("#lastNameMsg" + i).text($.i18n.prop("v.user.t.lengthOfName"));
			// alert($.i18n.prop("v.list.t.lastNameFormatError"));
			return false;
		}
	}
	return true;
}

function firstNameCheck(i) {
	var firstNameValue = $("#firstName" + i).val().trim();
	if (firstNameValue == '' || firstNameValue == null) {
		$("#firstNameMsg" + i).text($.i18n.prop("v.user.t.mandatory"));
		// alert($.i18n.prop("v.list.t.firstNameBlank"));
		return false;
	} else {
		if (firstNameValue.length > 50) {
			$("#firstNameMsg" + i).text($.i18n.prop("v.user.t.lengthOfName"));
			// alert($.i18n.prop("v.list.t.firstNameFormatError"));
			return false;
		}
	}
	return true;
}

function skyPearlIdCheck() {
	var skyPearlId = $('#skyPearlId').val().trim();
	if (skyPearlId == '' || skyPearlId == null) {
		$('#skyPearlIdMsg').text($.i18n.prop("v.user.t.mandatory"));
		return false;
	} else if (skyPearlId.length != 12) {
		$('#skyPearlIdMsg').text($.i18n.prop("skyPearlIdMsg.error"));
		return false;
	}
	return true;
}

function signInIdCheck() {
	var signInId = $('#signInId').val().trim();
	var reg = new RegExp(/^[a-zA-Z0-9]+$|^\s*$/);
	if (signInId == '' || signInId == null) {
		var r=confirm("未填写sign－in号信息则系统无法给您自动累积里程，确定继续"+"?");
		if (r==true){
		    	return true;
		   }else{
		    	$('#signInId').focus();
		    	return false;
		   }
	}else 
		if(!reg.test(signInId)){
		$('#signInIdMsg').text($.i18n.prop("user.signInId.noChar"));
		return false;
	}
	return true;
}

function birthdayCheck() {
	var birthday = $('#birthday').val().trim();
	if (birthday == '' || birthday == null) {
		$('#birthdayMsg').text($.i18n.prop("v.user.t.mandatory"));
		return false;
	}
	return true;
}

String.prototype.trim = function() {
	return (this.replace(/^\s+|\s+$/g, ""));
};

function phoneCheck(i) {
	var phoneReg = /^([0-9]*[\s\-|\/|+]*[0-9]*){1,30}$/;
	var phoneValue = $("#phone" + i).val().trim();
	if (phoneValue == '' || phoneValue == null) {
		$("#phoneMsg" + i).text($.i18n.prop("v.user.t.mandatory"));
		// alert($.i18n.prop("v.list.t.phoneBlank"));
		return false;
	} else {
		if (!phoneReg.test(phoneValue) || phoneValue.length > 30) {
			$("#phoneMsg" + i).text($.i18n.prop("v.user.t.mandatoryOfPhone"));
			// alert($.i18n.prop("v.list.t.phoneFormatError"));
			return false;
		}
	}
	return true;
}

// 分页查询初始化
function initGrid() {
	maintable = new ECSGrid({
		url : $ECS_PATH + "user/UserInfoList.do",
		searchform : "userInfoListForm", // 查找条件
		// complete:"onComplete",
		renderTo : "user_search_paging",
		tableClass : "hr nt",
		headerClass : "",
		pageposition : "button",
		createBnStyle : "blue_btn createBn",
		oddClass : "gray",
		createBnExist : true,
		evenClass : "lightblue",
		complete : "searchComplete",
		createBnTxt : $.i18n.prop("user.addAccount"),// 'Add Account',
		createBnHandler : "addNewUserShow",
		columns : [ {
			headerText : $.i18n.prop("v.list.t.userGUID"),
			dataField : "userGUID",
			width : 90
		}, {
			headerText : $.i18n.prop("v.list.t.userName"),
			dataField : "userName",
			width : 120
		}, {
			headerText : $.i18n.prop("v.list.t.phone"),
			dataField : "phone",
			width : 120
		}, {
			headerText : $.i18n.prop("v.list.t.email"),
			dataField : "email",
			width : 90
		}, {
			headerText : $.i18n.prop("v.list.t.operation"),
			dataField : "status",
			handler : "operationHandler",
			width : 200
		} ]
	});
}

// 判断数组中包含element元素
Array.prototype.contains = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
};

// 查询回调操作列处理
function operationHandler(row, col) {
	if (row["status"] == "D") {
		/*
		 * return $.i18n.prop("v.list.c.alter") + '&nbsp&nbsp' +
		 * $.i18n.prop("v.list.c.resetPwd")
		 */
		return '<a href="#" id="alter_' + row["id"]
				+ '" disabled = "true" onClick="alterUserShow(\''
				+ row["userGUID"] + '\');">' + $.i18n.prop("v.list.c.alter")
				+ '</a>' + '   <a href="#" id="reset_' + row["id"]
				+ '" disabled = "true" onClick="resetPsnshow(\''
				+ row["userGUID"] + '\');">' + $.i18n.prop("v.list.c.resetPwd")
				+ '</a>' + '   <a href="#" id="' + row["id"] + '"value = '
				+ row[col.dataField] + ' onClick="setupAndout(\''
				+ row["userGUID"] + '\',\'' + row["status"] + '\',\''
				+ row["id"] + '\');">'
				+ $.i18n.prop("v.list.status." + row["status"]) + '</a>';
	} else {
		return '<a href="#" id="alter_' + row["id"]
				+ '" onClick="alterUserShow(\'' + row["userGUID"] + '\');">'
				+ $.i18n.prop("v.list.c.alter") + '</a>'
				+ '   <a href="#" id="reset_' + row["id"]
				+ '" onClick="resetPsnshow(\'' + row["userGUID"] + '\');">'
				+ $.i18n.prop("v.list.c.resetPwd") + '</a>'
				+ '   <a href="#" id="' + row["id"] + '" value = '
				+ row[col.dataField] + ' onClick="setupAndout(\''
				+ row["userGUID"] + '\',\'' + row["status"] + '\',\''
				+ row["id"] + '\');">'
				+ $.i18n.prop("v.list.status." + row["status"]) + '</a>';
	}
}

function addNewUserShow() {
	isNew = true;
	$.imps_showLoading("");
	clearMsg(1);
	clearAgent(1);
	$("#add_account").show();
	$('#shadow_div').show();
	$.imps_hideLoading("");
}

function resetPsnshow(userGUID) {
	rowUserGUID = userGUID;
	$("#reset_Psn_show").show();
	$('#shadow_div').show();
}

function againDefineShow() {
	// debugger;
	// alert("userGUID="+rowUserGUID);
	$
			.ajax({
				type : "post",
				url : $ECS_PATH + "user/ResetPwd.do",
				data : "userGUID=" + rowUserGUID + "&csrftoken=" + token,
				success : function(data) {
					if (data != null && data > 0) {
						$("#reset_Psn_show").hide();
						$("#reset_success_show2").find(".success").html(
								$.i18n.prop("v.list.t.submitSuccess"));
						$("#reset_success_show").show();
						setTimeout(
								"$('#reset_success_show').hide(1000);$('#shadow_div').hide();",
								2000);
					} else {
						$("#reset_Psn_show").hide();
						$("#reset_success_show").find(".success").html(
								$.i18n.prop("v.list.t.submitUnsuccess"));
						$("#reset_success_show").show();
						setTimeout(
								"$('#reset_success_show').hide(1000);$('#shadow_div').hide();",
								2000);
					}
				}
			});
}

function setupAndout(userGUID, status, id) {
	// debugger;
	// alert(id);
	status = $("#" + id).val();
	// alert("status:"+status);
	// alert('suibian: '+$("#"+id).attr('value'));
	$("#submit_btn").unbind('click');
	if (status == "D") {
		$("#reset_Psn_show4").find(".submit_txt").html(
				$.i18n.prop("v.list.t.confirmStart"));
		$("#reset_Psn_show4").show();
		$('#shadow_div').show();
		$("#submit_btn")
				.click(
						function() {
							$
									.ajax({
										type : "post",
										url : $ECS_PATH + "user/Enable.do",
										data : "userGUID=" + userGUID
												+ "&csrftoken=" + token,
										success : function(data) {

											if (data != null && data > 0) {
												$("#reset_Psn_show4").hide();
												$("#reset_success_show4")
														.find(".success")
														.html(
																$.i18n
																		.prop("v.list.t.startSuccess"));
												$("#reset_success_show4")
														.show();
												$("#" + id)
														.html(
																$.i18n
																		.prop("v.list.status.A"));
												$("#" + id).val("A");
												// 取消置灰
												$("#alter_" + id).attr(
														"disabled", false).css(
														"cursor", "pointer");
												;
												$("#reset_" + id).attr(
														"disabled", false).css(
														"cursor", "pointer");
												;
												setTimeout(
														"$('#reset_success_show4').hide(1000);$('#shadow_div').hide();",
														2000);
											} else {
												$("#reset_Psn_show4").hide();
												$("#reset_success_show4")
														.find(".success")
														.html(
																$.i18n
																		.prop("v.list.t.startUnsuccess"));
												$("#reset_success_show4")
														.show();
												setTimeout(
														"$('#reset_success_show4').hide(1000);$('#shadow_div').hide();",
														2000);
											}
										}
									});
						});
	} else {
		$("#reset_Psn_show4").find(".submit_txt").html(
				$.i18n.prop("v.list.t.confirmStop"));
		$("#reset_Psn_show4").show();
		$('#shadow_div').show();
		$("#submit_btn")
				.click(
						function() {
							$
									.ajax({
										type : "post",
										url : $ECS_PATH + "user/Disable.do",
										data : "userGUID=" + userGUID
												+ "&csrftoken=" + token,
										success : function(data) {

											if (data != null && data > 0) {
												$("#reset_Psn_show4").hide();
												$("#reset_success_show4")
														.find(".success")
														.html(
																$.i18n
																		.prop("v.list.t.stopSuccess"));
												$("#reset_success_show4")
														.show();
												$("#" + id)
														.html(
																$.i18n
																		.prop("v.list.status.D"));
												$("#" + id).val("D");
												// 置灰
												$("#alter_" + id).attr(
														"disabled", true).css(
														"cursor", "default");
												$("#reset_" + id).attr(
														"disabled", true).css(
														"cursor", "default");
												setTimeout(
														"$('#reset_success_show4').hide(1000);$('#shadow_div').hide();",
														2000);
											} else {
												$("#reset_Psn_show4").hide();
												$("#reset_success_show4")
														.find(".success")
														.html(
																$.i18n
																		.prop("v.list.t.stopUnsuccess"));
												$("#reset_success_show4")
														.show();
												setTimeout(
														"$('#reset_success_show4').hide(1000);$('#shadow_div').hide();",
														2000);
											}
										}
									});
						});
	}
}

function alterUserShow(userGUID) {
	isRecords = true;
	$('.selectPlan').attr('checked', false);
	$.imps_showLoading("");
	// alert("alterUserShow: "+userGUID);
	clearMsg('');
	$('#skyPearlId').val('');
	$('#signInId').val('');
	$('#birthday').val('');
	// 显示代理用户信息
	$.ajax({
		type : "post",
		async : false,
		url : $ECS_PATH + "user/GetUserInfo.do",
		data : "userGUID=" + userGUID + "&csrftoken=" + token,
		success : function(data) {

			$("#userGUID2").val(data.userGUID);
			$('#userGUID2').attr("readonly", true);// 代理用户：“用户账号”不能更改。
			$("#lastName2").val(data.lastName);
			$("#firstName2").val(data.firstName);
			$("#phone2").val(data.phone);
			$("#email2").val(data.email);
			$('#skyPearlId').attr('readonly', true);
			$('#signInId').attr('readonly', true);
			if (data.joinEasyMiles == "2") {
				$('#skyPearlId').val(data.skyPearlId);
				$('#signInId').val(data.signInId);
				$('#birthday').val(data.birthday);
				$('.agreeContent').show();
				$('#birthday').attr('readonly', false);
				$('.selectPlan').attr('checked', true);
				$('.selectPlan').attr('disabled', true);
			} else if(data.joinEasyMiles == "1"){
				$('.agreeContent').hide();
				$('.selectPlan').attr('checked', false);
				$('.selectPlan').removeAttr("disabled");
				$('#birthday').attr('readonly', true);
			}else{
				$('.agreeContent').hide();
				$('.selectPlan').attr('checked', false);
				$('.selectPlan').removeAttr("disabled");
				isRecords = false;
			}
			// huzheyi 2014-05-13
			original_email = $.trim($("#email2").val());

			isNew = false;// 修改

		}
	});

	$("#modify_account").show();
	$('#shadow_div').show();
	$.imps_hideLoading("");
}

function userInfoCheck(i) {
	var result = true;
	if (!userGUIDCheck(i)) {
		result = false;
	}
	if (!lastNameCheck(i)) {
		result = false;
	}
	if (!firstNameCheck(i)) {
		result = false;
	}
	if (!phoneCheck(i)) {
		result = false;
	}
	if (!emailCheck2(i)) {
		result = false;
	}

	if ($('.selectPlan')[0].checked) {
		if(!isRecords){
			$("#reset_success_show2")
			.find(".success").html($.i18n.prop("v.list.t.noRecord"));
			$("#reset_success_show2").show();
			setTimeout("$('#reset_success_show2').hide(1000);$('#shadow_div').hide();",2000);
			return false;
		}
		if (!skyPearlIdCheck()) {
			return false;
		}
		if (!birthdayCheck()) {
			return false;
		}
		if (!signInIdCheck()) {
			return false;
		}
		if(!checkSkyPearlId()){
			return false;
		}
		if(!checkSignInId()){
			return false;
		}
		if(!checkSkyPealIdAndName()){
			return false;
		}
	}
	return result;
}

//检查常客系统，姓名，明珠卡是否一致
function checkSkyPealIdAndName(){
	var data = "skyPearlId=" + $('#skyPearlId').val() + "&" + "lastName="
	+ $('#lastName2').val() + "&" + "firstName="
	+ $('#firstName2').val() + "&" + "csrftoken="
	+ $('#csrftoken').val();
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
			} else {
				$("#reset_Psn_show2").hide();
				$('#skyPearlIdMsg').text(msg.errormsg);
				result=false;
			}
		}
	});
	return result;
}

function resetPsnShow2() {
	if (isNew) {
		clearMsg(1);
		if (userInfoCheck(1)) {
			/*$("#reset_Psn_show2").show();
			$('#shadow_div').show();*/
			againDefineShow2();
		}
	} else {
		clearMsg(2);
		if (userInfoCheck(2)) {
//			$("#reset_Psn_show2").show();
//			$('#shadow_div').show();
			againDefineShow2();
		}
	}

}

// 代理用户，确认保存
function againDefineShow2() {
	
	// 新增代理用户
	if (isNew) {// 新增

		$
				.ajax({
					type : "post",
					url : $ECS_PATH + "user/UserInfoAdd.do",
					data : $('#agentUserAddForm').serialize(),
					success : function(msg) {
						maintable.bindData();

						if (msg != null && msg > 0) {
							$(".tab_div").hide();
							$("#reset_Psn_show2").hide();
							$("#reset_success_show2").show();
							$("#reset_success_show2").find(".success").html(
									$.i18n.prop("v.list.t.submitSuccess"));
							setTimeout(
									"$('#reset_success_show2').hide(1000);$('#shadow_div').hide();",
									2000);
						} else {
							$(".tab_div").hide();
							$("#reset_Psn_show2").hide();
							$("#reset_success_show2").find(".success").html(
									$.i18n.prop("v.list.t.submitUnsuccess"));
							$("#reset_success_show2").show();
							setTimeout(
									"$('#reset_success_show2').hide(1000);$('#shadow_div').hide();",
									2000);
						}
					}
				});

	} else {// 修改
		var data = "skyPearlId=" + $('#skyPearlId').val() + "&" + "lastName="
				+ $('#lastName2').val() + "&" + "firstName="
				+ $('#firstName2').val() + "&" + "csrftoken="
				+ $('#csrftoken').val();
		if ($('.selectPlan')[0].checked) {
				var data = $('#agentUserModifyForm').serialize();
				if ($('.selectPlan')[0].checked) {
					data += "&joinEasyMiles=2";
				} else {
					data += "&joinEasyMiles=1";
				}	
			$.ajax({
						type : "post",
						url : $ECS_PATH + "user/UserInfoAlter.do",
						data : data,
						success : function(msg) {
							maintable.bindData();
							// alert('msg: '+msg);
							$(".tab_div").hide();
							$("#reset_Psn_show2").hide();
							if (msg > 0) {// 成功
								$("#reset_success_show2").find(".success").html($.i18n.prop("v.list.t.submitSuccess"));
							} else if (msg === -2) {
								$("#reset_success_show2").find(".success").html($.i18n.prop("v.list.t.noRecord"));
							} else if (msg === -3) {
								$("#reset_success_show2").find(".success").html($.i18n.prop("user.skyPearlId.isNull"));
							} else if (msg === -6) {
								$("#reset_success_show2").find(".success").html($.i18n.prop("user.signInId.isNull"));
							} else if (msg === -7) {
								$("#reset_success_show2").find(".success").html($.i18n.prop("v.list.t.repeatsignInId"));
							} else if (msg === -8) {
								$("#reset_success_show2").find(".success").html($.i18n.prop("repeatskyPearlId"));
							}else if (msg === -9) {
								$("#reset_success_show2").find(".success").html($.i18n.prop("user.modifyErrorMsg-9"));//填写的明珠卡号与备案不一致
							}else if (msg === -10) {
								$("#reset_success_show2").find(".success").html($.i18n.prop("user.modifyErrorMsg-10"));//填写的Sign-in号与备案不一致
							}
							
							$("#reset_success_show2").show();
							
							setTimeout(
									"$('#reset_success_show2').hide(1000);$('#shadow_div').hide();",
									2000);
							isNew = true;
						}
					});

		} else {
			var data = $('#agentUserModifyForm').serialize();
			if ($('.selectPlan')[0].checked) {
				data += "&joinEasyMiles=2";

			} else {
				data += "&joinEasyMiles=1";
			}

			$
					.ajax({
						type : "post",
						url : $ECS_PATH + "user/UserInfoAlter.do",
						data : data,
						success : function(msg) {
//							maintable.bindData();
							// alert('msg: '+msg);
							$("#user_search_paging").html("");
							initGrid();
							maintable.bindData();
							if (msg != null && msg > 0) {
								$(".tab_div").hide();
								$("#reset_Psn_show2").hide();
								$("#reset_success_show2").find(".success").html($.i18n.prop("v.list.t.submitSuccess"));
								$("#reset_success_show2").show();
								setTimeout(
										"$('#reset_success_show2').hide(1000);$('#shadow_div').hide();",
										2000);
//								window.location.reload();
							} else {
								$(".tab_div").hide();
								$("#reset_Psn_show2").hide();
								if (msg === -2) {
									$("#reset_success_show2")
											.find(".success")
											.html(
													$.i18n
															.prop("v.list.t.noRecord"));
								} else {
									$("#reset_success_show2")
											.find(".success")
											.html(
													$.i18n
															.prop("v.list.t.submitUnsuccess"));
								}
								$("#reset_success_show2").show();
								setTimeout(
										"$('#reset_success_show2').hide(1000);$('#shadow_div').hide();",
										2000);
							}
							isNew = true;
						}
					});
		}
	}

}

function resetPsnShow3(userType) {
	addUserType = userType;
	$("#reset_Psn_show3").show();
	$('#shadow_div').show();
}

// 搜索完毕回调
function searchComplete() {
	var par = $("#user_search_paging");
	par.find("a").each(function() {
		if ($(this).attr("disabled") == "disabled") {
			$(this).css("cursor", "default");
		}
	});

	$.imps_hideLoading("");
	// $('#queryBtn').removeAttr("disabled");
	// $('#loadPubBtn').removeAttr("disabled");
	// $('#loadPubBtn').removeClass("myGray");
}

// 隐藏||显示高级查询选项
function highSearchShow() {
	var dir = $("#freight_table tr").eq(2).css("display");
	if (dir == "none") {
		$("#freight_table tr").show();
		$("#dir_txt").html("&and;");
	} else {
		var len = $("#freight_table tr").length - 1;
		$("#freight_table tr").each(function(x) {
			if (x == 0 || x == len) {

			} else {
				$("#freight_table tr").eq(x).hide();
			}
		});
		$("#dir_txt").html("&or;");
	}

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

function delsuccessshow() {
	$("#reset_Psn_show").hide();
	$('#shadow_div').hide();
}

function delsuccessshow2() {
	$("#reset_Psn_show2").hide();
	// $('#shadow_div').hide();
}

function delsuccessshow3() {
	$("#reset_Psn_show3").hide();
	$('#shadow_div').hide();
}

function delsuccessshow4() {
	$("#reset_Psn_show4").hide();
	$('#shadow_div').hide();
}

function clearMsg(i) {
	$("#userGUIDMsg" + i).text("");
	$("#firstNameMsg" + i).text("");
	$("#lastNameMsg" + i).text("");
	$("#emailMsg" + i).text("");
	$("#phoneMsg" + i).text("");
	$("#skyPearlIdMsg").text("");
	$("#signInIdMsg").text("");
	$("#birthdayMsg").text("");
}

function clearAgent(i) {
	$("#userGUID" + i).val("");
	$("#firstName" + i).val("");
	$("#lastName" + i).val("");
	$("#email" + i).val("");
	$("#phone" + i).val("");
}
