$(document).ready(function(){
	if($Initial_sign==true||$Initial_signForUserID==true){
		$('#submit_BN').bind('click',forwardto_changePsd);
	}else{
		$('#submit_BN').bind('click',function(){});
	}
});

function forwardto_changePsd(){
	window.location.href='../../modules/user/modifypsd.jsp';
}

function addnewicon($this){
	var agent = $this.closest(".agent");
	var len = agent.find(".add_icon").length;
	var str = len === 1 ? "PCC:":"&nbsp;";
	agent.find(".agent_right").append("<div class=\"agentChild\"><p>"+ str +"</p><input type=\"text \" class=\"txt min_wid\" /><input type=\"button\" class=\"add_icon\" onclick=\"addnewicon($(this))\" value=\"\" /></div>");
	if(len !== 1){
		$this.addClass("colse_icon").attr("onclick","closeicon($(this))");
	}else{
		$this.attr("onclick","");
	}
}

function addagent($this){
	var agent = $this.closest(".agent");
	var len = agent.length;
	var str = "<div class=\"agent\">"
	//var str1 = agent.eq(len-1).find(".agent_left").clone();
	str += "<div class=\"agent_left\"><p>GDS:</p><input type=\"text\" class=\"txt min_wid check_list\" /><div class=\"check_content\"><ul><li>123</li> <li>123</li><li>123</li></ul></div><input type=\"button\" class=\"add_icon\" value=\"\" onClick=\"addagent($(this))\" /></div>";
	str += "<div class=\"agent_right\"><div class=\"agentChild\"><p>PCC:</p><input class=\"txt min_wid\" type=\"text \"><input class=\"add_icon\" type=\"button\" value=\"\" onclick=\"addnewicon($(this))\"></div></div> <div class=\"cls\"></div></div>";
	agent.closest(".agent_parent").append(str);
	//if(len !== 1){
		$this.addClass("colse_icon").attr("onclick","closeagent($(this))");
	//}else{
		//$this.attr("onclick","");
	//}
}