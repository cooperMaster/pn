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
		}
	});
}