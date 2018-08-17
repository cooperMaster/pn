$().ready(function() {
	i18n.init("agent_font");//国际化//original agent_font_zh
//	查询当前用户
	selectAgent("");
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
			
			
					
						$("#prompt").hide();

					$("#agentid").attr('disabled', 'disabled').val(result.agentid).css({"background-color":"#F0E9E9"});
					$("#license").attr('disabled', 'disabled').val(result.license).css({"background-color":"#F0E9E9"});
					$("#taxref").attr('disabled', 'disabled').val(result.taxref).css({"background-color":"#F0E9E9"});
					$("#orgname").attr('disabled', 'disabled').val(result.orgname).css({"background-color":"#F0E9E9"});
					$("#orgcode").attr('disabled', 'disabled').val(result.orgcode).css({"background-color":"#F0E9E9"});
					$("#postcode").attr('disabled', 'disabled').val(result.postcode).css({"background-color":"#F0E9E9"});
					$("#address").attr('disabled', 'disabled').val(result.address).css({"background-color":"#F0E9E9"});
					$("#country").val(result.countryname).attr('disabled', 'disabled').css({"background-color":"#F0E9E9"});
					$("#statesel").attr('disabled', 'disabled').val(result.state).css({"background-color":"#F0E9E9"});
					$("#state").attr('disabled', 'disabled').val(result.state).css({"background-color":"#F0E9E9"});
					$("#city").attr('disabled', 'disabled').val(result.city).css({"background-color":"#F0E9E9"});
					$("#citysel").attr('disabled', 'disabled').val(result.city).css({"background-color":"#F0E9E9"});
					$("#userguid").attr('disabled', 'disabled').val(result.userguid).css({"background-color":"#F0E9E9"});
					$("#loweragentShow").show();
						$("#loweragent").attr('disabled', 'disabled').val(result.loweragent).css({"background-color":"#F0E9E9"});
					$("#fristname").val(result.fristname).css({"background-color":"#F0E9E9"});
					$("#email").val(result.email).css({"background-color":"#F0E9E9"});
					$("#lastname").val(result.lastname).css({"background-color":"#F0E9E9"});
					$("#phone").val(result.phone).css({"background-color":"#F0E9E9"});
					$("#settlementcode").val(result.settlementcode).css({"background-color":"#F0E9E9"});
					$("#agentname").val(result.agentname).css({"background-color":"#F0E9E9"});
				
			}else{
				//alert("Not data");
			}
		},
		error : function(e) {
//			if (confirm(i18n.prop('agent.confirm'))) {
//				//$("#reset_Psn_show_Submit").hide();
//			}
		}
	});
}


