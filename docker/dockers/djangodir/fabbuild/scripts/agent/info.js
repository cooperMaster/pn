var l = 0;
$().ready(function() {
	//2014-04-28 huzheyi
	init();
	//2014-04-28 huzheyi
	if(userType!=4){
		$("#submitGDS").hide();
	}
	$initSelectors("#GDS_SYSTEM_INFO", "#systemName", "",true);
	// if(initial_user=="G"||initial_user=="N"){
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
	var conLeftHeight = $("#child_nav").height();
	var innerHerght = $(window).height();  //窗口高度
	var clientHeight = $(document.body).height(); //页面高度
	if(clientHeight<innerHerght){
		var disparity = innerHerght - clientHeight;
		$("#child_nav").height(conLeftHeight+disparity);
	}
});


//2014-04-28 huzheyi
function init() {

	// 获取用户使用的语言
	var lang = getLanguage();
	// 加载消息文件
	loadBundles('common');//lang
}

function getLanguage() {
	var lang;
// var cookie = Common.Cookie.read('language');

	lang = jQuery.i18n.browserLang();

	Common.Cookie.set('language', lang, 1 * 24);// 时效为一天

	return lang;
}

function loadBundles(fileName) {
//	jQuery.i18n.properties({
//	    name:'user_font',
//	    path:$ECS_PATH + 'messages/',
//	    mode:'map',
//	    language:Common.Cookie.get('language'),
//	    cache:true,
//	    encoding: 'UTF-8',
//	    callback: function() {
//	    	
//		}
//	});
	
	//2014-3-12 huzheyi
	var lang=null;
	if(langJsp!=null){
		lang=langJsp;
	}else{
		lang=Common.Cookie.get('language');
	}
	jQuery.i18n.properties({
		name : fileName,// 资源文件名称
		path : $ECS_PATH + 'messages/',// 资源文件所在目录路径
		mode : 'map',// 模式：变量或 Map
		language : lang,//Common.Cookie.get('language'),// 从cookie获取语言
		cache : true,
		encoding : 'UTF-8',
		callback : function() {
			// 加载完回调
		}
	});
	//2014-3-12 huzheyi
}
//2014-04-28 huzheyi


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
				+ "</span></div><div class=\"fare_content relax\"><span class=\"pcc_closed agentpos\" onclick=\"closegds($(this))\">&nbsp;</span>"
				+ "<table class=\"nt\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"
				+ "<tbody><tr><td><p>PCC:</p><span><input class=\"txt min_wid\" maxlength=\"10\" type=\"text \">"
				+ "<input class=\"blue_btn marginL15\" type=\"button\" onclick=\"addpcc($(this))\" id=\""
				+ inputId
				+ "\" value=\""+$.i18n.prop("common.addPcc")+"\"><p class=\"pccClass\" style=\" color: #ff0000;\"></p></span>"
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
//			par.append("<div class=\"agent_li\"><span class=\"agent_li_content\">"
//							+ pccArray[i]
//							+ "</span><span class=\"pcc_closed\" onclick=\"closepcc($(this))\">&nbsp;</span></div>");
			
			var divNode = document.createElement("div");
			$(divNode).attr("class","agent_li");
			
			var spanNode = document.createElement("span");
			$(spanNode).attr("class","agent_li_content");
			var textNode = document.createTextNode(pccArray[i]);
			$(spanNode).append(textNode);
			$(divNode).append(spanNode);
			
			var spanNode2 = document.createElement("span");
			$(spanNode2).attr("class","pcc_closed");
			$(spanNode2).attr("onclick","closepcc($(this))");
			$(divNode).append(spanNode2);
			
			par.append(divNode);
		}
	}
}

/**
 * TODO 新增DGS
 */
function addgds($this) {
	var system = $("#agent").find(".fare_div");
	var len = system.length;
	var list = $.trim($this.parent().find("input.check_list").val());
	var systemDIV = "systemDIV" + l;
	if (list != "" && list != " ") {
		if(len>=20){
			$("#gdsEr").html("Up to 20 can be added to the GDS");
			return;
		}
		for ( var i = 0; len > i; i++) {
			var id = system[i].id;
			//var systemName = $("#" + id).find(".tab_title")[0].innerText; 不兼容火狐
			var systemName = $("#" + id).find(".tab_title").html();
			if($.trim(systemName)===$.trim(list)){
				$("#gdsEr").html($.i18n.prop("systemInfo.gds")+list+$.i18n.prop("systemInfo.alreadyExist"));//"System Info GDS : "//" has already existed "
				return false;
			}
		}
		var str = "<div class=\"fare_div\" id=\""
				+ systemDIV
				+ "\"><div class=\"fare_tab borderB\"><span class=\"tab_title current\">"
				+ list
				+ "</span></div><div class=\"fare_content relax\"><span class=\"pcc_closed agentpos\" onclick=\"closegds($(this))\">&nbsp;</span>"
				+ "<table class=\"nt\" width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"
				+ "<tbody><tr><td><p>PCC:</p><span><input class=\"txt min_wid\" maxlength=\"10\" type=\"text \">"
				+ "<input class=\"blue_btn marginL15\" type=\"button\" onclick=\"addpcc($(this))\" value=\""+$.i18n.prop("common.addPcc")+"\">" 
				+ "<p class=\"pccClass\" style=\" color: #ff0000;\"></p></span>"
				+ "</td></tr><tr><td content=\"content\"></td></tr></tbody></table></div></div>";
		$("#agent").append(str);
		$("#gdsEr").html("");
		l++;
	}
	return false;
}

/**
 * TODO 新增PCC
 */
function addpcc($this) {
	var par = $this.closest("tbody").find("td[content]");
	var pccLen = par.find(".agent_li").length;
	var pcc_list =par.find(".agent_li_content");
	var PCCer = $this.closest("tbody").find(".pccClass");
	var val = $.trim($this.prev().val());
	if (val != "" && val != " ") {
		if(pccLen>=50){
			PCCer.html("Up to 50 can be added to the PCC");
			return false;
		}
		for ( var k = 0; pccLen > k; k++) {
			if($.trim(pcc_list.eq(k).html())===val){
				PCCer.html($.i18n.prop("systemInfo.pcc")+val+$.i18n.prop("systemInfo.alreadyExist"));//"PCC : "//" has already existed "
				return false;
			}
		}
		par.append("<div class=\"agent_li\"><span class=\"agent_li_content\">"
						+ val
						+ "</span><span class=\"pcc_closed\" onclick=\"closepcc($(this))\">&nbsp;</span></div>");
		PCCer.html("");
	}
}

function closepcc($this) {
	$this.closest(".agent_li").detach();
}

function closegds($this) {
	$("#gdsEr").html("");
	$this.closest(".fare_div").detach();
}

function SubmitSystem() {
	var system = $("#agent").find(".fare_div");
	var len = system.length;
	var data = new Array();
	if (len < 1) {
		$("#gdsEr").html("Please add a GDS.");
		return false;
	}
	for ( var i = 0; len > i; i++) {
		var id = system[i].id;
		var pcc_list = $("#" + id).find(".agent_li");
		var systemName = $("#" + id).find(".tab_title").html();
		var pccClass = $("#" + id).find(".pccClass");
		
		var pcc_value = "";
		var pcclen = pcc_list.length;
		if(pcclen===0){
			pccClass.html($.i18n.prop('systemInfo.addPCC'));//$.i18n.prop('systemInfo.addPCC');
			return
		}
		for ( var k = 0; pcclen > k; k++) {
			if (k === 0) {
				//pcc_value = pcc_value + pcc_list[k].innerText;
				pcc_value = pcc_value + $("#" + id).find(".agent_li").eq(k).find(".agent_li_content").html();
			} else {
				//pcc_value = pcc_value + "," + pcc_list[k].innerText;
				pcc_value = pcc_value + "," + $("#" + id).find(".agent_li").eq(k).find(".agent_li_content").html();
			}
		}
		data[i] = {
			systemname : systemName,
			pccinfo : pcc_value
		};
	}
	$.imps_showLoading("");
	$.ajax({
		type : "post",
		url : "insertSystemInfo.do",
		data : {
			systemInfo : JSON.stringify(data)
		},
		dataType : "json",
		success : function(result) {
			$.imps_hideLoading("");
			if (result) {
				//$.imps_hideLoading("");
				$("#reset_success_show_Submit").show();
				setTimeout("$('#reset_success_show_Submit').hide(1000);", 2000);
				if (initial_user == "A"||initial_user == "Y") {
					window.location.href = "../../modules/user/modifypsd.jsp";
				}
			}else{
				$("#reset_unsuccess_show_Submit").show();
				setTimeout("$('#reset_unsuccess_show_Submit').hide(1000);", 2000);
			}
		},
		error : function(e) {
			// $.imps_hideLoading("");
		}
	});
}

/**
 * TODO 初始化拉框
 */
var $initSelectors = function(selectDivId, txtInputId, valInputId, readonly) {
	var selectDiv = $(selectDivId);
	var isHoverDiv = false;
	$(txtInputId).attr('readonly', readonly).click(function() {
		if (!selectDiv.is(":hidden")) {
			selectDiv.hide();
			return false;
		}

		// 构造下拉内容css
		var $this = $(this);
		var pos = $this.position();
		var hei = $this.outerHeight();
		var wid = Number($this.outerWidth() - 2);
		var top = Number(pos.top) + Number(hei) - 1;
		var left = pos.left;
		selectDiv.css({
			"top" : top,
			"left" : left,
			"width" : wid
		}).show();

		selectDiv.hover(function() {
			isHoverDiv = true;
			$(this).show();
		}, function() {
			isHoverDiv = true;
			$(this).hide();
		});

		// 附加下拉内容css，用作显示隐藏判断用
		var li = selectDiv.find("li");
		var selectLi = true;
		li.bind("click", function() {
			if (selectLi === true) {
				selectLi = false;
				var txt = $(this).html();
				$this.val($.trim(txt));
				// $(valInputId).val($(this).attr("name"));
				selectDiv.hide();
			}
		}).hover(function() {
			$(this).addClass("selected_");
		}, function() {
			$(this).removeClass("selected_");
		});
		// return true;
	}).blur(function() {
		var li = selectDiv.find("li");
		var isSelecting = false;
		li.each(function() {
			if (!isSelecting) {
				isSelecting = $(this).hasClass("selected_");
			}
		});

		if (!isSelecting && !isHoverDiv) {
			selectDiv.hide();
		}
		return false;
	});
};