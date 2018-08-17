//var userGUID = "agentForPwd";
var userGUID;
var httpsPath;
var $ECS_PATH = "/IMPS/";

$(document).ready(function() {
	// debugger;

	// 加载国际化提示信息
	loadBundles();
//	httpsPath='https'+httpsPath.substring(httpsPath.lastIndexOf('://'));
//	alert('httpsPath: '+httpsPath);
	
	var conLeftHeight = $("#child_nav").height();
	var innerHerght = $(window).height();  //窗口高度
	var clientHeight = $(document.body).height(); //页面高度
	if(clientHeight<innerHerght){
		var disparity = innerHerght - clientHeight;
		$("#child_nav").height(conLeftHeight+disparity);
	}
	
});

// 2014-03-26 huzheyi 检查原有pwd是否正确，并在这个过程中会获得原来pwd暗文以及salt值
// function isPwdCorrect() {
// // debugger;
// var result = false;
// var oldPwd = $("#oldPwd").val();
//
// if (oldPwd == null || oldPwd == "") {
// $("#oldPwdMsg").text($.i18n.prop("v.modify.t.empty"));
// result = false;
// } else {
// $
// .ajax({
// type : "post",
// async : false,
// url : $ECS_PATH + "usercheck/IsPwdCorrect.do",
// data : "userGUID=" + userGUID,
// error : function(request) {
// result = false;
// },
// success : function(data) {
// var salt = data.salt;
// var password = data.password;
// // alert(salt);
// // alert(password);
// // alert(encrypt(oldPwd,salt,100));
// if (password == encrypt(oldPwd, salt, 100)) {
// result = true;
// } else {
// $("#oldPwdMsg").text(
// $.i18n.prop("v.modify.t.oldPwdError"));
// }
// }
// });
// }
//
// return result;
// }
// 2014-03-26 huzheyi check enter current password is right or wrong

function checkPsd(psd) {
	var result = false;
	// var psdReg = /^[0-9A-Za-z_@]{8,30}$/;
	var psdReg2 = /^[0-9]{8,30}$/;
	var psdReg3 = /^[A-Za-z]{8,30}$/;
	var psdReg = /^[\w~#^$@%&!*]{8,30}$/;
	if (psdReg2.test(psd) || psdReg3.test(psd)) {
		result = false;
	} else if (psdReg.test(psd)) {
		result = true;
	}
	return result;
}

function checkInput() {
	var result = true;
	if($.trim($("#oldPwd").val())==""){
		$("#oldPwdMsg").text($.i18n.prop("v.modify.t.emptyOldPwd"));
		result=false;
		return result;
	}
	
	if($.trim($("#newPwd").val())==''){
		$("#newPwdMsg").text($.i18n.prop("v.modify.t.newPwdEmpty"));
		result=false;
		return result;
	}
	
	if (!checkPsd($("#newPwd").attr("value"))) {
		result = false;
		$("#newPwdMsg").text($.i18n.prop("v.modify.t.psdFormat"));
		return result;
		
	} else if ($("#oldPwd").attr("value") == $("#newPwd").attr("value")) {
		result = false;
		$("#newPwdMsg").text($.i18n.prop("v.modify.t.newPwdEqualWithOld"));
		
		return result;
	}
	if ($("#newPwd").attr("value") != $("#confirmNewPwd").attr("value")) {
		result = false;
		$("#confirmNewPwdMsg").text($.i18n.prop("v.modify.t.equal"));
	} else if ($("#confirmNewPwd").attr("value").length > 30) {
		result = false;
		$("#confirmNewPwdMsg").text($.i18n.prop("v.modify.t.oldPwdError"));
	}

	return result;
}

// 2014-03-26 huzheyi submit 修改密码的时候，进行上交随机生成的salt以及输入的password
function changePwd() {
	$("#oldPwdMsg").text("");
	$("#newPwdMsg").text("");
	$("#confirmNewPwdMsg").text("");

	var uuidTemp = getUuid();
	var uuidReg = new RegExp("-", "g");

	// recreate salt for password 新创建的盐值
	var salt = uuidTemp.replace(uuidReg, "").toUpperCase();

	var oldPasswordEncode = hex_md5($("#oldPwd").val());
	var newPasswordEncode = hex_md5($('#newPwd').val());

	// 校验//重新验证输入框中信息是否正确，并验证原密码是否正确
	if (/* isPwdCorrect() && */ checkInput()  /*true*/) {
		// alert("newPwd: "+newPwd);
		$
				.ajax({
					type : "post",
					url :  $ECS_PATH+ "user/ChangePwd.do",/*$ECS_PATH*/
					data : /* $('#modifyPsdForm').serialize()+ */"password="
							+ newPasswordEncode + "&currentPsd="
							+ oldPasswordEncode /*+ "&salt=" + salt*/
							/*+ "&userGUID=" + userGUID*/,
					success : function(msg) {
						$("#oldPwd").val("");
						$("#newPwd").val("");
						$("#confirmNewPwd").val("");

						// 2014-03-27 huzheyi result_return
						var correctPwdResult = msg.correctPwdResult;
						var changePwdResult = msg.changePwdResult;
						var firstInitialResult = msg.firstInitialResult;
						var comparePwdResult = msg.comparePwdResult;

//						alert('msg.correctPwdResult: ' + correctPwdResult
//								+ ' and msg.changePwdResult: '
//								+ changePwdResult + ' and firstInitialResult: '
//								+ firstInitialResult
//								+ " and comparePwdResult: " + comparePwdResult);
						// 2014-03-27

						// $("#reset_success_show").slideDown('normal');
						$('.closed').click(function() {
							$('shadow_div').hide();
						});
						$("#logoutConfirm")
								.click(
										function() {
											window.location = '/IMPS/log/logout.do?loginPage_URL=index_show.jsp';
										});

						// 2014-03-27 huzheyi original
						// 代理管理员首次登陆修改密码后，退出登陆
						// if (msg) {
						// $("#confirm_btn").css('display', 'block');
						// $('#modifyPsdTxt')
						// .html(
						// $.i18n
						// .prop("v.modify.t.changePswAndLogout"));
						// $("#reset_success_show").slideDown('normal');
						// $('#shadow_div').show();
						// // setTimeout("window.location =
						// //
						// '/IMPS/log/logout.do?loginPage_URL=index_show.jsp';",3000);
						// } else {
						// $("#confirm_btn").css('display', 'none');
						// $("#reset_success_show .closed").css('display',
						// 'none');
						// $('#modifyPsdTxt').html(
						// $.i18n.prop("v.modify.view.success"));
						// $("#reset_success_show").slideDown('normal');
						// setTimeout(
						// "$('#reset_success_show').hide(1000);$('#shadow_div').hide();",
						// 5000);
						// $('#shadow_div').show();
						// }
						// 2014-03-27

						// 2014-03-27 huzheyi new block
						if (firstInitialResult) {
							$("#confirm_btn").css('display', 'block');
							$('#modifyPsdTxt')
									.html(
											$.i18n
													.prop("v.modify.t.changePswAndLogout"));
							$("#reset_success_show").slideDown('normal');
							$('#shadow_div').show();
							// setTimeout("window.location =
							// '/IMPS/log/logout.do?loginPage_URL=index_show.jsp';",3000);
						} else {
							if (correctPwdResult == true) {
								if (comparePwdResult == true) {
									if (changePwdResult == true) {
										$("#confirm_btn")
												.css('display', 'none');
										$("#reset_success_show .closed").css(
												'display', 'none');
										$('#modifyPsdTxt')
												.html(
														$.i18n
																.prop("v.modify.view.success"));
										$("#reset_success_show").slideDown(
												'normal');
										setTimeout(
												"$('#reset_success_show').hide(1000);$('#shadow_div').hide();",
												5000);
										$('#shadow_div').show();
									}
								} else {
									$("#newPwdMsg")
											.text(
													$.i18n
															.prop("v.modify.t.newPwdEqualWithOld"));
								}
							} else {
								$("#oldPwdMsg").text(
										$.i18n.prop("v.modify.t.oldPwdError"));
							}
						}
						// 2014-03-27 huzheyi

					}
				});
	}

}
// 2014-03-26 huzheyi

function getUuid() {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
			.split('');
	var uuid = [], i;
	var r;

	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';
	for (i = 0; i < 36; i++) {
		if (!uuid[i]) {
			r = 0 | Math.random() * 16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	}
	return uuid.join('');
}

function loadBundles() {
	// Original Part
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
	// Original Part

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