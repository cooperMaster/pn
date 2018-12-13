$(function() {
	
	init();
	
	var city = new Array();
	city[$.i18n.prop('contact.perth')] = $("#table_id_Perth").html();//"Perth"
	city[$.i18n.prop('contact.brisbane')] = $("#table_id_Brisbane").html();//"Brisbane"
	city[$.i18n.prop('contact.melbourne')] = $("#table_id_Melbourne").html();//"Melbourne"
	city[$.i18n.prop('contact.sydney')] = $("#table_id_Sydney").html();//"Sydney"
	city[$.i18n.prop('contact.auckland')] = $("#table_id_Auckland").html();//"Auckland"
	
	city["Perth"] = $("#table_id_Perth").html();//"Perth"
	city["Brisbane"] = $("#table_id_Brisbane").html();//"Brisbane"
	city["Melbourne"] = $("#table_id_Melbourne").html();//"Melbourne"
	city["Sydney"] = $("#table_id_Sydney").html();//"Sydney"
	city["Auckland"] = $("#table_id_Auckland").html();//"Auckland"

	var changeCss = function(){
		$("#table_id").find("tr").find("td:eq(0)").addClass("contact-title");
	};

	var changeInfo = function(cityName) {
		$("#table_id").html(city[cityName]);
		changeCss();
	};

	var changeCity = function (country){
		var html = $("#city_" + country).html();
		$("#citySelect").html(html);
		$initSelector("#citySelect","#city","",{handler:changeInfo});
		
		var cityName = $("#city_" + country).find("li:eq(0)").html();//下拉第一个城市
		cityName = $.trim(cityName);
		$("#city").val(cityName);
		changeInfo(cityName);
	};
	
	$initSelector("#countrySelect","#country","", {handler:changeCity});
	$("#country").val($.i18n.prop('contact.australia'));//"Australia"
	changeCity("Australia");
	
});

function init() {
	// 获取用户使用的语言
	var lang = getLanguage();
	// 加载消息文件
	loadBundles('common');
}

function getLanguage() {
	var lang;
	lang = jQuery.i18n.browserLang();
	Common.Cookie.set('language', lang, 1 * 24);// 时效为一天
	return lang;
}

function loadBundles(fileName) {
	var lang=null;
	if(langJsp!=null){
		lang=langJsp;
	}else{
		lang=Common.Cookie.get('language');
	}
	
	Common.Cookie.set('language', lang, 1 * 24);// 时效为一天
	
	var propertiesName='common';
	if(fileName!=null&&$.trim(fileName)!=''){
		propertiesName=fileName;
	}
	
	jQuery.i18n.properties({
		name : propertiesName,// 资源文件名称
		path : $ECS_PATH + 'messages/',// 资源文件所在目录路径
		mode : 'map',// 模式：变量或 Map
		language : lang,//Common.Cookie.get('language'),// 从cookie获取语言
		cache : true,
		encoding : 'UTF-8',
		callback : function() {
			// 加载完回调
		}
	});
}