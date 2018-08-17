$(function(){

 	loadBundles();
 	getRewardRule();
 	
 	var conLeftHeight = $("#child_nav").height();
	var innerHerght = window.innerHeight;  //窗口高度
	var clientHeight = document.body.clientHeight; //页面高度
	if(clientHeight<innerHerght){
		var disparity = innerHerght - clientHeight;
		$("#child_nav").height(conLeftHeight+disparity);
	}
 	
});

function getRewardRule(){
	//发送请求
	$.ajax({
		type:"POST",
		url:"/IMPS/publishingRule/showPublishingRuleDetail.do",
		data:{},
		dataType:'json',
		success:function(data){
			//奖励规则
			var temp="";
			if (typeof data !== "undefined" && data !== null && data !== "" && data.length !== 0) {
				temp=data.ruleDetail;
				temp=temp.replace(/IMPM/,'IMPS');
			}
			
			var pObj = "";
            var files = data.files;
            pObj += '<div style="margin-bottom:20px;">';
            pObj += '<div style="text-align:right">';
            if(files!== null || files.length !== 0){
            	for(var i =0;i<files.length;i++){
                	var fileName = files[i].fileName;
                	var fileSize = ( files[i].fileSize ) / 1024 / 1024;
                	var fileId = files[i].attachId;
                	pObj += '<a style="color:#337ab7;display:inline-block" href="/IMPS/file/milePlan/download.do?id='+fileId+'">'+fileName+'('+fileSize.toFixed(2)+'M)</a></br>';
                }
            }
            pObj += '</div>';
            pObj += '</div>';
            $('#content-file').append(pObj);
			
			$('#content-main').html(temp);
		},
		error:function(data){
			
		}
	});
}
//加载国际化信息
function loadBundles() {

    var lang = null;
    if (langJsp != null) {
        lang = langJsp;
    } else {
        lang = Common.Cookie.get('language');
    }
    var propertiesName = 'rule';
    jQuery.i18n.properties({
        name: propertiesName, // 资源文件名称
        path: $ECS_PATH + 'messages/', // 资源文件所在目录路径
        mode: 'map', // 模式：变量或 Map
        language: lang, //Common.Cookie.get('language'),// 从cookie获取语言
        cache: true,
        encoding: 'UTF-8',
        callback: function() {
            // 加载完回调
        }
    });
}