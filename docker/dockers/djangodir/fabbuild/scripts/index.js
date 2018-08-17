var error_times = null;
var login_result = null;
var overTimeError = false;
var check_userNameLength = false;
var check_pwdLength = false;
var default_salt='';
var saltletarr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var saltValue = null;
var downloadPath=null;
var originalUserName=null;
var lockMaxTimes=null;

var contextPath = "/IMPS";


function init() {

	// 获取用户使用的语言
	var lang = getLanguage();
	// 加载消息文件
	loadBundles('common');// lang
}

function getLanguage() {
	var lang;
	var cookie = Common.Cookie.read('language');
	if(cookie!=null){
		$("#changeLanguage").val(cookie);
	}else{
		lang = jQuery.i18n.browserLang();
		Common.Cookie.set('language', lang, 1 * 24);// 时效为一天
		$("#changeLanguage").val(lang);
	}
	return lang;
}

function changeLanguage(lang){
	Common.Cookie.set('language', lang, 1 * 24);// 时效为一天
	location.reload();
}

function getRandomSalt_default(saltLength){
	if(saltLength>0){
		default_salt='';
		// alert(saltLength+' and ori_default_salt: '+default_salt);
		for(var salt_index=0;salt_index<saltLength;salt_index++){
			var salt_indi=Math.round(Math.random()*saltletarr.length);
			if(salt_indi==36){
				salt_indi=salt_indi-1;
			}
			var indi_salt=saltletarr[salt_indi];
			default_salt+=indi_salt;
			// alert('salt_index: '+salt_index+' and indi_salt: '+indi_salt+'
			// and salt_indi: '+salt_indi);
		}
	}else{
		default_salt=getRandomSalt_default(32);
	}
	default_salt=$.trim(default_salt.toUpperCase());

	return default_salt;
}

function testFireFoxLanguage(){
	var userLanguage = navigator.userLanguage;
	var language=navigator.language;
	if(userLanguage!=null){
		alert('userLanguage: '+userLanguage);
	}else{
		alert('userLanguage is null');
	}
	if(language!=null){
		alert('language: '+language);
		navigator.language = 'en-US';
	}else{
		alert('language is null');
	}
}

$(document).ready(function() {
	
	// 2014-03-06
	init();
	// 2014-03-06
	
// testFireFoxLanguage();
	
	refresh_img();
	getRegisterFileDownLoadPath();
	$("#shadow_div").hide();
	// $("#verifiCode").click(click_verifiCode);
	$("#verifiCode").blur(blur_verifiCode);
	$("#verifiCodeImg").click(refresh_img);
	$("#login_btn").click(login_func);
	$("#userName").bind('keydown', keydown_func);
	$("#password").bind('keydown', keydown_func);
	$("#verifiCode").bind('keydown', keydown_func);
	$("#download_btn").bind('click',download_click);
	
	$('.verifiCode').css('display', 'none');
	$('#user_bn').click(clear_userName);
	$('#loginInBN').click(click_userIDChange);
	
	$('#forget').click(clickForgetTag);
	$('#forgetConfirm').click(function(){$('#forget_div').slideUp();});

	verifiCode_show();
	
	//huzheyi 2014-05-21
	getAllAdvertiseInfo();
	//huzheyi 2014-05-21
	
	//huzheyi 20140618
//	getPicPath('cn','theme',3,$('#backgroundImg'),null);
//	getPicPath('cn','theme',1,$('#loginAd1Img'),1);
//	getPicPath('cn','theme',1,$('#loginAd2Img'),2);
	//huzheyi 20140618
	/*
		if(position!=null){
		param='localSign='+localSign+'&position='+position+'&pageSite='+pageSite+'&type='+type;
	}else{
		param='localSign='+localSign+'&pageSite='+pageSite+'&type='+type;
	}
	param='localSign=cn&pageSite=theme&type=3'
	param='localSign=cn&pageSite=theme&type=1&position=1'
	param='localSign=cn&pageSite=theme&type=1&position=2'
	 */
});

function getRegisterFileDownLoadPath(){
	$.ajax({
		url:"/IMPS/modules/commonInfo.do",
		data:"register=Y",
		Type:"POST",
		success:function(msg){
			downloadPath=msg;
			$("#registerLink").attr('href',"/IMPS/file/downloadSftpFile.do");
		},error:function(xmlHttpRequest, status){
			alert("xmlHttpRequest.state: "+xmlHttpRequest.state);
			alert("status: "+status);
		}
	});
}

function keydown_func(e) {
	if (e.which == 13) {
		login_func();
	}
}

function click_userIDChange() {
	location.href = "/IMPS/modules/agent/agent.jsp";// user/modifypsd.jsp";
}

function click_GSDChange(){
	location.href="/IMPS/modules/agent/info.jsp";
}

function click_psdChange(){
	location.href="/IMPS/modules/user/modifypsd.jsp";
}

// 下载文件，要给具体pdf文件
function download_click(){
	// window.location.href="/IMPS/scripts/index.js";
	if(downloadPath){
		window.open(downloadPath, 'Register');
	}
}

function clear_userName() {
	$('#userName').val('');
}

function login_func() {

	if (check_userName()) {

		check_userGUID($.trim($('#userName').val()));
		encode_psd($('#password').val());

		login_form_ajaxSubmit();
	}
	return false;
}

function initial_param_aboutUserName(){
	if(originalUserName){
		if($.trim($('#userName').val())!=$.trim(originalUserName)){
			error_times = 0;
			login_result = null;
			overTimeError = false;
			
			originalUserName=$.trim($('#userName').val());
		}
	}else{
		error_times = 0;
		login_result = null;
		overTimeError = false;
		
		originalUserName=$.trim($('#userName').val());
	}
}

function check_userName() {
	var userName_check = false;
	var password_check = false;

	if ($.trim($('#userName').val()) != '') {
		userName_check = true;
		initial_param_aboutUserName();
	}
	if ($.trim($('#password').val()) != '') {
		password_check = true;
	}
	
	var login_tip = $("#login_tip");

	// if (!overTimeError) {
		if (!userName_check && !password_check) {

			show_LoginTip($.i18n.prop("login.emptyUserPSD"));
			return false;
		} else if (userName_check && !password_check) {

			show_LoginTip($.i18n.prop("login.emptyPSD"));
			return false;
		} else if (!userName_check && password_check) {
			show_LoginTip($.i18n.prop("login.emptyUser"));
			return false;
		}
// } else {
// show_LoginTip($.i18n.prop("login.errorOverTimes"));
// }
	change_display(login_tip.parent(), false);
	return true;
}

function change_display(element_id, display_result) {
	$(element_id).css('display', display_result ? 'block' : 'none');
}

function change_verifiCode(){
	$("#verifiCodeImg").click();
	$('#verifiCode').val('');
	
	var yesElement=$('span.yes');
	var wrongELement=$('span.wrong');
	
	if(yesElement){
		yesElement.css('display','none');
	}
	if(wrongELement){
		wrongELement.css('display','none');
	}
}

// login.do
function login_form_ajaxSubmit() {

	var check_verification=false;
	if ($('.verifiCode').css('display') != 'none') {
		$("#checkCodeSign").html("false");
		
		blur_verifiCode();
		check_verification=true;
	}
	
	var verifiCode_check = $('#checkCodeSign').html();
	// alert('verifiCode_check: '+verifiCode_check+' and check_verification:
	// '+check_verification+' and error_times: '+error_times);
// alert('error_times: '+error_times);
	
	if ((error_times >= 2 && $.trim($('#verifiCode').val()) != '' && ((!check_verification) || (check_verification && verifiCode_check == 'true')))
			|| error_times < 2 || $.trim(originalUserName)!=$.trim($('#userName').val())) {
// alert("inside and ready to submit login.do: "+verifiCode_check);
		$("#login_btn").attr('disabled', 'disabled');
		
		$.ajax({
					type : "POST",
					url : /* "/IMPS/" + "login/loginAction.do", */"/IMPS/login/loginAction.do",
					data : "password=" + $("#password").val() + "&userName="
							+ $("#userName").val()+"&differName=true"+($(".verifiCode").css('display')!='none'?"&need_verification=Y&verifiCode_enter="+$("#verifiCode").val():"&need_verification=N")+"&csrftoken="+ token,
							// "verifiCode_enter=" + $("#verifiCode").val()
					dataType : 'json',
					success : function(msg) {
						
						
						var login_resul_infot = msg.login_result;
						var initial_user_info = msg.initial_user;
						var error_times_info = msg.error_times;
						var auth_result_info = msg.authorize;
						var invalidate_info = msg.invalidate;
						var activate_agent=msg.activated;
						
						var upper_activated=msg.upperActivated;// UpperActivated
						var agent_disable=msg.agentDisable;// AgentDisable
						
						lockMaxTimes=msg.lock_times;
						
						originalUserName=$.trim($('#userName').val());
						error_times=error_times_info;
						// 2014-01-23
						var verification_info=msg.verification_check;
						
						$("#login_btn").attr('disabled', false);
						// 2014-01-23
						if(verification_info){
							if (invalidate_info&&activate_agent&&upper_activated&&agent_disable) {
	
								if (auth_result_info) {
									check_login(login_resul_infot,
											initial_user_info, error_times_info,
											verifiCode_check);
									change_verifiCode();
								} else {
									$("#password").val("");
									show_LoginTip("Not enough authorization");
									change_verifiCode();
								}
							} else if(!invalidate_info&&activate_agent){
								$("#password").val("");
								
								change_verifiCode();
								
								show_LoginTip($.i18n.prop("login.invalidate"));
							}else if(invalidate_info&&(!activate_agent)){
								$("#password").val("");
								
								change_verifiCode();
								
								show_LoginTip($.i18n.prop("login.inactivatedAgent"));
							}else if(!upper_activated){
								$("#password").val("");
								
								change_verifiCode();
								
								show_LoginTip($.i18n.prop("login.upperInactivated"));
							}/*
								 * else if(agent_disable){
								 * $("#password").val("");
								 * show_LoginTip($.i18n.prop("login.inactivatedAgent")); }
								 */
							
							
						}else{
							
							// 2014-03-12
							if(error_times_info<lockMaxTimes||lockMaxTimes==0){
								$("#password").val("");
								show_LoginTip($.i18n.prop("login.errorVerifiCode"));
								
								change_verifiCode();
								
								if($('.verifiCode').css('display') == 'none'){
									show_verifiCode();
								}
							}else{
								
								if($('.verifiCode').css('display') == 'none'){
									verifiCode_show();
								}
								
								show_LoginTip($.i18n.prop("login.errorOverTimes.part0")+' '+lockMaxTimes+' '+$.i18n.prop("login.errorOverTimes.part1"));/* $.i18n.prop("login.errorOverTimes") */
								// 2014-03-10
								change_verifiCode();
								$("#password").val("");
							}

						}
					},
					error : function(xmlHttpRequest, status) {
						// 2013-12-22
						/*
						 * alert(xmlHttpRequest.status); alert(status);
						 */
						$("#login_btn").attr('disabled', false);
						$("#password").val("");
						
						change_verifiCode();
						
						$("#login_tip").parent("div").css("display", "inline");
						if (xmlHttpRequest.status == 200) {
							check_login(false, null, error_times + 1,
									verifiCode_check);
						} else if (xmlHttpRequest.status == 404) {
							show_LoginTip($.i18n.prop("login.errorSystem404"));
						} else {
							show_LoginTip($.i18n.prop("login.errorSystem500"));
						}
					}
				});
	} else {
		var login_tip_obj = $("#login_tip");
// 2014-03-10
// alert('overTimeError: '+overTimeError);
		if (!overTimeError) {
			if ($.trim($('#verifiCode').val()) != '') {
				
				if($.trim($('#verifiCode').val())=='true'){
					show_LoginTip($.i18n.prop("login.errorUserPSD"));
				}else{
					$("#login_tip").html($.i18n.prop("login.errorVerifiCode"));
				}
				
				change_verifiCode();
				
			} else {
				show_LoginTip($.i18n.prop("login.emptyVerificationCode"));
			}
		} else {
			show_LoginTip($.i18n.prop("login.errorOverTimes.part0")+' '+lockMaxTimes+' '+$.i18n.prop("login.errorOverTimes.part1"));/* $.i18n.prop("login.errorOverTimes") */
			// 2014-03-10
			change_verifiCode();
			
// hide_verifiCode();
		}
		$("#password").val("");
		change_display(login_tip_obj.parent(), true);
	}
}

function check_login(login_resul_infot, initial_user_info, error_times_info,
		verifiCode_check) {
	if (!login_resul_infot) {
		$("#password").val("");

		// 2014-01-05
		if(error_times_info < 2){
			show_LoginTip($.i18n.prop("login.errorUserPSD"));
			
			// 2014-03-10
		}else if(error_times_info>=2 && (error_times_info<lockMaxTimes||lockMaxTimes==0)){
			/* (lockMaxTimes!=null&&lockMaxTimes!=0?lockMaxTimes:5) */
			if($('.verifiCode').css('display')=='none'){
				show_LoginTip($.i18n.prop("login.infoErrorOverTimes"));
			}else{
				show_LoginTip($.i18n.prop("login.errorUserPSD"));
			}
		}
		
		if (error_times_info >= 2) {
			error_times = error_times_info;
			// 2014-03-10
// alert('error_times: '+error_times);
			
			// 2014-03-10
			if (error_times_info < lockMaxTimes||lockMaxTimes==0) {/*
																	 * error_times_info
																	 * <5
																	 */
				verifiCode_show();

				// alert("verifiCode_check: "+verifiCode_check);
				if (verifiCode_check == 'true') {
					$('#checkCodeSign').html("false");
					$("#checkCodeSignPic").html("");
					change_verifiCode();
				}
			} else {
				overTimeError = true;
				show_LoginTip($.i18n.prop("login.errorOverTimes.part0")+' '+lockMaxTimes+' '+$.i18n.prop("login.errorOverTimes.part1"));
				// show_LoginTip($.i18n.prop("login.errorOverTimes"));
				// 2014--03-10
// alert('position2');
				change_verifiCode();
			}
		}
	} else if (login_resul_infot) {
		$("#login_div").hide();
		$("#news").css("height", "64px");
		$("#login").css("padding-bottom", "40px");
		$("#fares").show(1000);
		$("#user_icon").removeClass("video").addClass("usericon").show();

		if (initial_user_info) {
			
			if($.trim(initial_user_info).toLowerCase()=='a'){
				$("#shadow_div").show();
				show_Tip("a");
				$('#loginInBN').focus();
				$('#loginInBN').click(click_GSDChange);
			}else if($.trim(initial_user_info).toLowerCase()=='y'){
				$("#shadow_div").show();
				show_Tip("y");
				$('#loginInBN').focus();
				$('#loginInBN').click(click_userIDChange);
			}else if($.trim(initial_user_info).toLowerCase()=='g'){
				$("#shadow_div").show();
				show_Tip("g");
				$('#loginInBN').focus();
				$('#loginInBN').click(click_psdChange);
			}else{
				setTimeout(function(){$("#login_tip").html("");},3000);
				location.href = "/IMPS/home.do";
			}
		} else {
			location.href = "/IMPS/home.do";
			// location.href="/IMPS/modules/systemInfo/info.jsp";
		}
	}
}

function verifiCode_show() {

	if (error_times >= 0 && error_times < 2) {
		$('.verifiCode').css('display', 'none');
	} else if (error_times >= 2 && $('.verifiCode').css('display') == 'none') {
		show_verifiCode();
	}
}
function show_verifiCode() {
	$('.verifiCode').slideDown('normal');
}

function hide_verifiCode() {
	$('.verifiCode').slideUp('normal');
}

function refresh_img() {
	var img_href = "login_verifiCodeImg.do" + "?random=" + Math.random();
	$("#verifiCodeImg").attr("src", img_href);
}
function encode_password() {
	$('#password').val(secret($('#password').val()));
}

function blur_verifiCode() {
	
// check_verifiCode('true');
	
	var trim_result = trim_func($("#verifiCode"));
	if (trim_result == "") {
// show_LoginTip($.i18n.prop("login.emptyVerificationCode"));
		var yesElement=$('span.yes');
		var wrongELement=$('span.wrong');
		
		if(yesElement){
			yesElement.css('display','none');
		}
		if(wrongELement){
			wrongELement.css('display','none');
		}
		emptyLoginTipEmptyVerifiCode();
	}else if(trim_result.length != 4){
		check_verifiCode('false');
	} 
	else if (trim_result.length == 4) {

		$.ajax({

			type : "POST",
			url : "/IMPS/" + "verifiCodeCheck.do",
			dataType : 'script',
			data : "verifiCode_enter=" + $("#verifiCode").val(),
			async : false,
			success : function(data) {
				check_verifiCode(data);
			},
			error : function(xmlHttpRequest, status) {
				if (xmlHttpRequest.status == 200) {// login.errorSystem500
					show_LoginTip($.i18n.prop("login.errorSystem500"));
				} else if (xmlHttpRequest.status == 500) {
					show_LoginTip($.i18n.prop("login.errorSystem500"));
				} else if (xmlHttpRequest.status == 403) {
					show_LoginTip($.i18n.prop("login.errorSystem500"));
				} else if (xmlHttpRequest.status == 404) {
					show_LoginTip($.i18n.prop("login.errorSystem404"));
				}
				$('#checkCodeSign').html('false');
			}
		});
	}
}

function error_tipShow(errorCode) {
	if (xmlHttpRequest.status == 404) {
		show_LoginTip($.i18n.prop("login.errorSystem404"));
	} else {
		show_LoginTip($.i18n.prop("login.errorSystem500"));
	}
}

function getLoginTipInfo(){
	return $('#login_tip').html();
}

function emptyLoginTipEmptyVerifiCode(){
	if(getLoginTipInfo()==$.i18n.prop("login.errorVerifiCode")||getLoginTipInfo()==$.i18n.prop("login.emptyVerifiCode")){
		$("#login_tip").html('');
	}
}

function check_verifiCode(data) {
	if (data == 'true') {
		$("#checkCodeSignPic").html("<span class='yes'>&nbsp;</span>");
		 $("#login_btn").attr('disabled', false);
		$("#checkCodeSign").html("true");
		
		emptyLoginTipEmptyVerifiCode();
		
	} else {
		$("#checkCodeSignPic").html("<span class='wrong'>&nbsp;</span>");
		// $("#verifiCodeImg").click();
		$("#login_tip").html($.i18n.prop("login.errorVerifiCode"));
		 $("#login_btn").attr('disabled', 'disabled');
		$("#checkCodeSign").html("false");
	}
}

function trim_func(element) {
	$(element).val($.trim($(element).val()));
	return $(element).val();
}
function click_verifiCode() {
	var trim_result = trim_func($("#verifiCode"));
	if (trim_result.length != 4) {
		$("#verifiCode").val("");
	}
}

// 加载国际化信息
// function loadBundles() {
// jQuery.i18n.properties({
// name : 'common',// 资源文件名称
// path : contextPath + '/messages/',// 资源文件所在目录路径
// mode : 'map',// 模式：变量或 Map
// language : langJsp,//Common.Cookie.get('language'),// 从cookie获取语言
// cache : true,
// encoding : 'UTF-8',
// callback : function() {
// // 加载完回调
// }
// });
// }

var userGUIDdata = null;
var psddata = null;
var saltdata = null;
var verificationdata = null;

// 2014-03-26 huzheyi original
// function ajax_userGUID(ori_userGUID) {
// $.ajax({
// type : "POST",
// url : "/IMPS" + "/usercheck" + "/getSalt.do",// "/IsPwdCorrect.do",
// dataType : 'json',
// data : "settlementCode=" + ori_userGUID,
// async : false,
// success : function(data) {
// if (data) {
// saltdata = data.salt;
// // alert('get salt: '+saltdata);
// }else{
// var IATAcheck=/^\d{8}$/;
// var IATA_check=IATAcheck.exec($('#userName').val());
// if(IATA_check){
// saltdata='';
// }else{
// saltdata=getRandomSalt_default(32);
// }
// // alert('create salt: '+saltdata);
// }
// },
// error : function(xmlHttpRequest, status) {
// // 2013-12-22
// if (xmlHttpRequest.status == 200) {// login.errorSystem500
// show_LoginTip($.i18n.prop("login.errorSystem500"));
// } else if (xmlHttpRequest.status == 500) {
// show_LoginTip($.i18n.prop("login.errorSystem500"));
// } else if (xmlHttpRequest.status == 403) {
// show_LoginTip($.i18n.prop("login.errorSystem500"));
// } else if (xmlHttpRequest.status == 404) {
// show_LoginTip($.i18n.prop("login.errorSystem404"));
// }
// }
// });
// }
// 2014-03-26

function check_userGUID(ori_userGUID) {
	if (ori_userGUID && $.trim(ori_userGUID) != "") {

		if ($.trim(ori_userGUID).length <= 30) {
			check_userNameLength = true;
			// 2014-03-26
// ajax_userGUID(ori_userGUID);
			// 2014-03-26
		} else {
			check_userNameLength = false;
			show_LoginTip($.i18n.prop("login.userNameOverLength"));
		}
	}
}

function check_userGUIDStyle(ori_userGUID) {
	if (ori_userGUID && $.trim(ori_userGUID) != '') {

		var userID_numTest = /^[0-9]{6,30}$/ig;
		var userNum_test=userID_numTest.exec(ori_userGUID);
		
		if (userNum_test) {
			if($.trim(ori_userGUID).length==8){
				return true;
			}
			show_LoginTip($.i18n.prop("login.wrongStyle"));
			return false;
		} else {
			return true;
		}
	}
}

function encode_psd(ori_password) {
	if (ori_password && $.trim(ori_password) != "") {

		// 2014-03-26 huzheyi original
// if (saltdata && $.trim(saltdata) != "") {
// $('#password').val(encrypt(ori_password, saltdata, 100));//
// temp_reconstructPSD()
// }
		// 2014-03-26 huzheyi
		
		
		// 2014-03-26 huzheyi current
		
// alert('inside encode_psd function');
		$('#password').val(hex_md5($('#password').val()));/* $('#password').val() */
// alert("password: "+$('#password').val());
		
		// 2014-03-26
		
	}
}

function show_LoginTip(msg) {
	var loginTip_obj = $("#login_tip");
	loginTip_obj.css("display", "block");
	loginTip_obj.html(msg);
	var loginTip_parent = loginTip_obj.parent("div");
	if (loginTip_parent.css("display") == "none") {
		loginTip_parent.slideDown();
	}
}

function hide_LoginTip() {
	var loginTip_obj = $("#login_tip");
	loginTip_obj.css("display", "none");
	loginTip_obj.html("");
	var loginTip_parent = loginTip_obj.parent("div");
	if (loginTip_parent.css("display") != "none") {
		loginTip_obj.parent("div").slideUp();
	}
}

function show_Tip(tip) {
	
	
	if ($("#tip_InitialUser").css("display") == "none") {
		if(tip=='a'){
			$("#tip_text").html("<div>"+$.i18n.prop("common.changsysinfo")+"</div>");// For
																						// your
																						// account
																						// safty
																						// you
																						// have
																						// to
																						// change
																						// your
																						// system
																						// information
																						// </div><div>and
																						// then
																						// change
																						// your
																						// password,
																						// thank
																						// you
		}else if(tip=='y'){
			$("#tip_text").html("<div>"+$.i18n.prop("common.changeuserinfo")+"</div>");// For
																						// your
																						// account
																						// safty
																						// you
																						// have
																						// to
																						// change
																						// your
																						// user
																						// information
																						// </div><div>and
																						// then
																						// change
																						// your
																						// password,
																						// thank
																						// you
		}else if(tip=='g'){
			$("#tip_text").html($.i18n.prop("common.changepwd"));// For your
																	// account
																	// safty you
																	// have to
																	// change
																	// your
																	// password,
																	// thank you
		}
		$("#tip_InitialUser").slideDown();
	}
}

function clickForgetTag(){
	var forgetDiv=$('#forget_div');
	if(typeof(forgetDiv)!='undefined'&&forgetDiv!=null&&forgetDiv.css('display')=='none'){
		forgetDiv.slideDown();
	}
}

// huzheyi 2014-05-21
function getAllAdvertiseInfo(){
	
	$.ajax({
		url:'/IMPS/advertise/searchAll.do',
		type:'post',
		datatype:'json',
		asyn:true,
		success:function(data){
			//alert('success');
			if(typeof(data)!='undefined'&&data!=null){
				if(data.length>0){
					for(var index=0;index<data.length;index++){
						var indi_data=data[index];
//						alert('id: '+indi_data.id);
					}
				}
			}
		},error:function(xmlHttpRequest,state){
			alert('error happens and xmlHttpRequest.status: '+xmlHttpRequest.status+' and state: '+state);
		}
	});
	
}
// huzheyi 2014-05-21


//huzheyi 2014-06-03
function getThemePicPath(){
	alert(here);
}

function getPicPath(localSign,pageSite,type,elementObj,position){
	//"${basePath}/advertise/publishAdvertisePic.do?localSign=cn&pageSite=theme&type=3"//background              $('#backgroundImg')
	//${basePath}/advertise/publishAdvertisePic.do?localSign=cn&position=1&pageSite=theme&type=1                  $('#loginAd1Img')
	
	
	
	
	
//	var param='';
//	if(position!=null){
//		param='localSign='+localSign+'&position='+position+'&pageSite='+pageSite+'&type='+type;
//	}else{
//		param='localSign='+localSign+'&pageSite='+pageSite+'&type='+type;
//	}
//	
//	$.ajax({
////		url:basePath+'/advertise/publishAdvertisePic.do?random='+Math.random(),
//		url:basePath+'/advertise/getPublishAdvertisePic.do?random='+Math.random(),//huzheyi 20150306
//		type:'get',
//		async:true,
//		data:param,
//		success:function(data){
//			elementObj.attr('src',data);
//		},
//		error:function(xmlHttpRequest,state){
//			alert('xmlHttpRequest.status: '+xmlHttpRequest.status+' and state: '+state);
//		}
//	});
}

//huzheyi 2014-06-03