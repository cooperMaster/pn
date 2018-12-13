$ECS_PATH = "/IMPS/";
var i18n = {
	// 初始化国际化
	init : function(name) {
		var peropertiesName = name;
		var lang=null;
		
		if(langJsp!=null){
			lang=langJsp;
		}else{
			lang=Common.Cookie.get('language');
		}
		
		$.i18n.properties({
			name : peropertiesName,
			path : $ECS_PATH + 'messages/',
			mode : 'map',
			language :lang /*Common.Cookie.get('language')*/,
			cache : true,
			callback : function() {
				// if(config.callbk) config.callbk();
			}
		});
	},
	// 获取国际化属性，KEy值， DEF 默认值
	prop : function(key, def) {
		var keyValue = $.i18n.prop(key);
		if (keyValue == "[" + key + "]" && def) {
			return def;
		} else {
			return keyValue;
		}
	}
};

$(document).keydown(function (e) {
    var doPrevent;
    if (e.keyCode == 8) {
        var d = e.srcElement || e.target;
        if (d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else
            doPrevent = true;
    }
    else
        doPrevent = false;

    if (doPrevent)
        e.preventDefault();
}); 

window.onbeforeunload   =   function(){
	
	var location_str=window.location.href;
	if(location_str.indexOf("modules/common/download.jsp")==-1&&location_str.indexOf("modules/common/contact.jsp")==-1){

	    var   n   =   window.event.screenX   -   window.screenLeft;   
	    var   b   =   n   >   document.documentElement.scrollWidth-20;   
	    if(b   &&   window.event.clientY   <   0   ||   window.event.altKey)   
	    {   
	        //window.event.returnValue   =   "是否关闭？";
	        $.ajax({
	        	url:"/IMPS/log/logout.do",
	        	type:'POST',
	        	success:function(){},
	        	error:function(xmlHttpRequest, status){
	        		//alert(xmlHttpRequest.status);
					//alert(status);
	        	}
	        });
	    }else{
	           //alert("是刷新而非关闭");   
	   }
	}
};

//huzheyi 20140618
function getPicPathForHome(localSign,pageSite,type,elementObj,position){
//	"${basePath}/advertise/publishAdvertisePic.do?localSign=cn&pageSite=theme&type=3"//background              $('#backgroundImg')
	//${basePath}/advertise/publishAdvertisePic.do?localSign=cn&position=1&pageSite=theme&type=1                  $('#loginAd1Img')
	var param='';
	if(position!=null){
		param='localSign='+localSign+'&position='+position+'&pageSite='+pageSite+'&type='+type;
	}else{
		param='localSign='+localSign+'&pageSite='+pageSite+'&type='+type;
	}
	
	$.ajax({
		url:$ECS_PATH+'advertise/publishAdvertisePic.do?random='+Math.random(),
//		url:$ECS_PATH+'advertise/getPublishAdvertisePic.do?random='+Math.random(),
		type:'get',
		async:true,
		data:param,
		success:function(data){
			elementObj.css('background','url('+data+') center 0 no-repeat ');
		},
		error:function(xmlHttpRequest,state){
			alert('xmlHttpRequest.status: '+xmlHttpRequest.status+' and state: '+state);
		}
	});
}
//huzheyi 20140618


$().ready(function() {
//	$("body").css('background','url(/IMPS/images/child_bg.jpg) center 0 no-repeat');
	$(".closed").click(function(){
		var par = $(this).parent();
		par.hide(function(){
			par.find('span').text('');
		});
		$('#shadow_div').hide();
	});
	
	var initTabPages = function(current) {
		//console.info(current);
		var sel = "#nav ul li .cur";
		var css = "current";
		var obj = $(sel);
		/*
		 * obj.each(function(){ if($(this).hasClass(css)){ current =
		 * obj.index(this); } });
		 */
		current = parseInt(current);
		var init = current;
		//alert(obj.index(this));
		obj.each(function() {
			if (current == obj.index(this)) {
				$(this).addClass(css);
			}
		}).mouseover(function() {
//			if(init != obj.index(this)){
//				obj.removeClass(css);
//			}
			$(this).addClass(css);
		}).mouseout(function() {
			if(init != obj.index(this)){
				$(this).removeClass(css);
			}
//			if(init != obj.index(this)){
//				obj.removeClass(css);
//			}
//			obj.eq(current).addClass(css);
		});

	};
	//initTabPages($("#tab").html());
	
	$("#nav ul li").hover(function(){
		if($(this).find("ul")){
			$(this).find("ul").show();
			
		}
	},function(){
		if($(this).find("ul")){
			$(this).find("ul").hide();
			
		}
	})
	
	$(".secondLevel").hover(function(){
		$(this).find("div").show();
	},function(){
		$(this).find("div").hide();
	})
	
	var $TAB = 0;
	var obj = $("#nav ul li .cur");
	obj.each(function(x,e) {
		if ( $(e).hasClass("current")) {
			$TAB = x;
		}
	});

	$("#nav ul li .cur").mouseover(function(){
		$("#nav ul li .cur").removeClass("current");
		$(this).addClass("current").closest("li").find("ul").show().mouseover(function(){
			$(this).show();
		}).mouseout(function(){
			$("#nav ul li .cur").removeClass("current");
			$("#nav ul li .cur").eq($TAB).addClass("current");
			
			$(this).hide();
		});
	}).mouseout(function(){
		$("#nav ul li .cur").removeClass("current");
		$("#nav ul li .cur").eq($TAB).addClass("current");
		
		$(this).closest("li").find("ul").hide();
	});
	

	

	/**
	 * 校验日期比较
	 */
	// 向jq添加校验方法
	/*$.validator.addMethod("compareDate", function(value, element, params) {
		var beginId = params['begin'];
		var endId = params['end'];
		var a = $(params['begin']).val();
		var b = $(params['end']).val();

		if (!(a && b)) {
			return true;
		}

		var arr = a.split("/");
		var starttime = new Date(arr[2], arr[1]-1, arr[0]);
		var starttimes = starttime.getTime();

		var arrs = b.split("/");
		var lktime = new Date(arrs[2], arrs[1]-1, arrs[0]);
		var lktimes = lktime.getTime();
		
		
		var result = starttimes <= lktimes;
		
		var isBeginErr = $(beginId).hasClass("error");
		var isEndErr = $(endId).hasClass("error");
		var isBeginEle = "#"+element.id == beginId;
		var isEndEle = "#"+element.id == endId;
		if(result){
			//清掉beginID，endID错误信息
			$(beginId).removeClass("error");
			$(endId).removeClass("error");
			
			$(beginId).find(".error").remove();
			$(endId).find(".error").remove();
			return true;
		}else{
			if(isEndEle && isBeginErr){
				return true;
			}else if(isBeginEle && isEndErr){
				return true;
			}else {
				return result;
			}
		}
	}, $.validator.format("开始时间[{0}]不能晚于结束时间[{1}]"));*/
	
	$.validator.addMethod("compareDate", function(value, element, params) {
		var limit = params['limit'];
		var num = 0;
		if(limit){
			num = parseInt(limit);
		}
		var beginId = params['begin'];
		var endId = params['end'];
		var a = $(params['begin']).val();
		var b = $(params['end']).val();

		if (!(a && b)) {
			return true;
		}

		var arr = a.split("/");
//		var starttime = new Date(arr[1], arr[2]-1, arr[0]);
		var starttimes = (new Date(arr[2]+"\/"+arr[0]+"\/"+arr[1])).getTime();
//		var starttimes = starttime.getTime();

		var arrs = b.split("/");
//		var lktime = new Date(arrs[1], arrs[2]-1 + num, arrs[0]);
		var lktimes = (new Date(arrs[2]+"\/"+arrs[0]+"\/"+arrs[1])).getTime();
//		var lktimes = lktime.getTime();
		
		var result = starttimes <= lktimes;
		
		var errClass = "error";
		var isBeginErr = $(beginId).hasClass(errClass);
		var isEndErr = $(endId).hasClass(errClass);
		var isBeginEle = "#"+element.id == beginId;
		var isEndEle = "#"+element.id == endId;
		if(result){
			//清掉beginID，endID错误信息
			$(beginId).removeClass(errClass);
			$(endId).removeClass(errClass);
			
			$("[for ='"+beginId.substring(1)+"']").remove();
			$("[for ='"+endId.substring(1)+"']").remove();
			return true;
		}else{
			if(isEndEle && isBeginErr){
				return true;
			}else if(isBeginEle && isEndErr){
				return true;
			}else {
				return result;
			}
		}

	}, $.validator.format(i18n.prop('common.start.end.time')));

	//2013-12-24
	$("#child_nav ul li").each(function(){
		if($(this).hasClass("current")){
			childcur = $("#child_nav ul li").index(this);
		}
	});
	$("#child_nav ul li").mouseover(function(){
		$("#child_nav ul li").removeClass("current");
		$(this).addClass("current");
	}).mouseout(function(){
		$("#child_nav ul li").removeClass("current");
		$("#child_nav ul li").eq(childcur).addClass("current");
	});
	//2013-12-24
	
	
	
	///IMPS/advertise/publishAdvertisePic.do?localSign=cn&position=1&pageSite=theme&type=4
	//getPicPathForHome('cn','theme',4,$('body'),1);
	
});

function add($this){
	$this.show();
	$("body").append("<div id=\"shadow_div\"></div>")
	$(".closed").click(function(){
		$(this).parent().hide();
		$("#shadow_div").detach();
	});
}

var $limitStr = function(str,num){
	if(str){
		if(str.length <=num){
			return str;
		}else {
			return str.substring(0,num) + '...';
		}
	}
	return "";
};

var $splitStr = function(str,num){
	var split = '</br>';
	var divNode = document.createElement("div");
	if(str){
		if(str.length <=num){
			$(divNode).append(document.createTextNode(str));
//			return str;
		}else {
//			var s = "";
			var srcs = str;
			var i = 0;
			while(srcs.length > num){
				if(i != 0){
					$(divNode).append(split);
				}
				$(divNode).append(document.createTextNode(srcs.substring(0,num)));
//				s += srcs.substring(0,num) + split;
				srcs = srcs.substring(num,srcs.length);
				i++;
			}
//			s += srcs; 
			if( srcs!=null && srcs != ""){
				$(divNode).append(split).append(document.createTextNode(srcs));
			}
			
//			if(s.lastIndexOf(split) == (s.length-split.length)){
//				s = s.substring(0, s.length-split.length);
//			}
//			return divNode;
		}
	}
	return divNode;
};

var $initAttach = function (module, attachs){
	var html = "";
	
	if(attachs && attachs.length>0 && attachs[0].basicInfoId && attachs[0].basicInfoId !=null && attachs[0].basicInfoId !='null' ){
		var id = 'display_' + attachs[0].basicInfoId;
		var selectId = 'select_' + attachs[0].basicInfoId;
		html +="<div>";
//		html +="<input type='text' class='txt download_list' id='"+id+"' readonly='readonly' value='Click to download'/>";
//		html +="<div class='check_content attach_download_list' id='"+selectId+"'>";
		html +="<div class=' attach_download_list' id='"+selectId+"'>";
		html +="<ul>";
		for(var i=0; i<attachs.length; i++){
			var attach = attachs[i];
			if(attach){
				var selectOptId = selectId+"_"+i;
				var fileName = attach.fileName;
				//var downloadPath = attach.downloadPath;
				//var path = attach.path;
				var url = "/IMPS/file/" + module + "/download.do?id=" + attach.id;
				var func = "window.open('"+url+"'); return false;";
				//var type = (path.lastIndexOf(".")>=0?path.substring(path.lastIndexOf("."),path.length):"");
				//var dPath = fileName;
				var title = fileName;
				var a = "<a href='"+url+"' target=_blank'>"+title+"</a>";
				html +="<li class='txt-break' title='"+title+"' id=\""+selectOptId+"\" >"+a+"</li>";
//				html +="<li class='txt-break' title='"+title+"' id=\""+selectOptId+"\" onclick=\" "+func+"\">"+dPath+"</li>";
			}
		}
		html +="</ul>";
		html +="</div>";
		html +="</div>";
	}
	return html;
};