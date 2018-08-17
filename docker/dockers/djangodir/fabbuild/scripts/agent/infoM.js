var l = 0;
$().ready(function() {
	$.ajax({
		type : "post",
		url : "selectSystemInfoByAgentid.do",
		data : {},
		dataType : "json",
		success : function(result) {
			if (result.length > 0) {
				for ( var i = 0; i < result.length; i++) {
					addgdsInit(result[i]);
				}
			}
		},
		error : function(e) {
			// $.imps_hideLoading("");
		}
	});
	// }
});

/**
 * TODO 初始化DGS
 */
function addgdsInit(gdsValue) {
	var pccinfoValue = gdsValue.pccinfo;
	var systemnameValue = gdsValue.systemname;
	var systemDIV = "systemDIV" + l;
	var inputId = "inputId" + l;
	if (systemnameValue != "" && systemnameValue != " ") {
		var str = "<div class=\"fare_div\" id=\""
				+ systemDIV
				+ "\"><div class=\"fare_tab borderB\"><span class=\"tab_title current\">"
				+ ''
				+ "</span></div><div class=\"fare_content relax\">"
				+ "<table class=\"nt\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"
				+ "<tbody><tr><td><p>PCC:</p><span>"
				+ "<input style=\"display: none;\" class=\"blue_btn marginL15\" type=\"button\" onclick=\"addpcc($(this))\" id=\""
				+ inputId
				+ "\" value=\"Add PCC\"><p class=\"pccClass\" style=\" color: #ff0000;\"></p></span>"
				+ "</td></tr><tr><td content=\"content\"></td></tr></tbody></table></div></div>";
		
		
		var ele = $(str);
		var textNode = document.createTextNode(systemnameValue);
		ele.find(".tab_title").append(textNode);
		
		$("#agent").append(ele);
		l++;
		addpccInit(systemDIV, pccinfoValue, inputId);
	}
	return false;
}

/**
 * TODO 初始化PCC
 */
function addpccInit(systemDIV, pccinfoValue, inputId) {
	var par = $("#" + inputId).closest("tbody").find("td[content]");
	if (pccinfoValue != "" && pccinfoValue != " " && pccinfoValue != null) {
		var pccArray = pccinfoValue.split(",");
		for ( var i = 0; i < pccArray.length; i++) {
			var divNode = document.createElement("div");
			$(divNode).attr("class","agent_li");
			var textNode = document.createTextNode(pccArray[i]);
			$(divNode).append(textNode);
			par.append(divNode);
//			par.append("<div class=\"agent_li\">"
//							+ pccArray[i]
//							+ "</div>");
		}
	}
}
