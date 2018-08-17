$(document).ready(function() {
	$('#shadow_div').hide();
	$('#ready_logout').hide();
	$('#logoutConfirmBN').bind('click', logoutConfirm);
	$('#logoutCancelBN').bind('click', logoutCancel);
	$('#headerLogoutBN').bind('click', logoutBNClick);
	$('.closed').bind('click',hide_shadow);
	//alert("$Initial_sign: "+$Initial_sign);
	if($Initial_sign=='true' || $Initial_signForUserID=='true'){
		$("#submitBN").attr('disabled',true);//$("#searchForm input[@type='submit']#submitBN").attr('disabled',true);
		$("#header_search_value").attr('disabled',true);//$("#searchForm input#searchTxt").attr('disabled',true);
		$('#header_search_value').attr("readonly","readonly");
	}else{
		$("#submitBN").attr('disabled',false);//$("#searchForm input[@type='submit']#submitBN").attr('disabled',false);
		$("#header_search_value").attr('disabled',false);//$("#searchForm input#searchTxt").attr('disabled',false);
		$('#header_search_value').removeAttr("readonly");
	}
});
function logoutConfirm() {
	//alert("logout_action");
	window.location = "/IMPS/log/logout.do?loginPage_URL=index_show.do";
}
function logoutCancel() {
	$('#ready_logout').hide();
	hide_shadow();
}

function hide_shadow(){
	$('#shadow_div').hide();
}

function logoutBNClick() {
	$('#ready_logout').show();
	$('#shadow_div').show();
}
