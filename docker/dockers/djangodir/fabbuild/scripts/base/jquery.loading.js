/*
 * 加载等待框
 */
$.iecs_loading_message = {
	msg:"loading_msg"/*"\u6b63\u5728\u52a0\u8f7d\uff0c\u8bf7\u7a0d\u5019 . . . "*/
};

//$.i18n.prop("loading_msg");

function loadingmsg(){
	if(typeof($.i18n)!='undefined'){
		//加载JS资源文件
//Original Part
//		$.i18n.properties({
//			    name:'common',
//			    path:$ECS_PATH+'messages/',
//			    mode:'map',
//				language:Common.Cookie.get('language'),
//			    callback: function() {
//				    $.iecs_loading_message.msg = "";
//			    }
//		});
//Original Part
		
		//2014-3-12 huzheyi
		var lang=null;
		if(langJsp!=null){
			lang=langJsp;
		}else{
			lang=Common.Cookie.get('language');
		}
		jQuery.i18n.properties({
			name : 'common',// 资源文件名称
			path : $ECS_PATH+'messages/',// 资源文件所在目录路径
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
}

$.imps_newsHideLoading=function(options){
	var $this = jQuery(document.body);
	var settings = {};
   	jQuery.extend(settings, options);
   	//需要附加在别的容器上显示Loading,值为对象
	if(settings.renderTo){
		$this = $("#"+settings.renderTo);
	}
	$this.find('#iecs-loading-indicator').remove();
	$this.find('#iecs-loading-indicator-overlay' ).remove();
	return $this;
};

$.imps_newsShowLoading=function(options){
	loadingmsg();
	var $this = jQuery(document.body);
	
	var settings = {renderTo: ''};
	jQuery.extend(settings, options);
	
	//需要附加在别的容器上显示Loading,值为对象
	if(settings.renderTo){
		$this = $("#"+settings.renderTo);
	}
   	
   	var loadingDiv = jQuery('<div></div>'); //等待框
	var overlayDiv = jQuery('<div></div>'); //遮罩层
	 
	jQuery(loadingDiv).attr('id', 'iecs-loading-indicator');
	
	if(settings.message) jQuery(loadingDiv).html(settings.message);
	
	jQuery(overlayDiv).css('display', 'none');
	$this.append(overlayDiv);
	jQuery(overlayDiv).attr('id', 'iecs-loading-indicator-overlay');
	jQuery(overlayDiv).addClass('loading-indicator-overlay loading-indicator');
	
	//获取宽度和调试
	var overlay_width;
	var overlay_height;
	var border_top_width = $this.css('border-top-width');
	var border_left_width = $this.css('border-left-width');
	border_top_width = isNaN(parseInt(border_top_width)) ? 0 : border_top_width;
	border_left_width = isNaN(parseInt(border_left_width)) ? 0 : border_left_width;
	var overlay_left_pos = $this.offset().left + parseInt(border_left_width);
	var overlay_top_pos = $this.offset().top + parseInt(border_top_width);
	overlay_width = parseInt($(window).width());
	overlay_height = parseInt($(window).height());
	
	//overlay
	jQuery(overlayDiv).css('width', '100%');
	jQuery(overlayDiv).css('height', '100%');
	jQuery(overlayDiv).css('left', 0 + 'px');
	jQuery(overlayDiv).css('top', 0 + 'px' );
	jQuery(overlayDiv).css('z-index', '99999');
	
	//show 
	jQuery(overlayDiv).show();
	return $this;
};

$.imps_showLoading = function(options) {
	loadingmsg();
	var $this = jQuery(document.body);
	
	var settings = {renderTo: ''};
	jQuery.extend(settings, options);
	
	//需要附加在别的容器上显示Loading,值为对象
	if(settings.renderTo){
		$this = $("#"+settings.renderTo);
	}
   	
   	var loadingDiv = jQuery('<div></div>'); //等待框
	var overlayDiv = jQuery('<div></div>'); //遮罩层
	 
	jQuery(loadingDiv).attr('id', 'iecs-loading-indicator');
	jQuery(loadingDiv).addClass('loading-indicator');
	
	if(settings.message) jQuery(loadingDiv).html(settings.message);
	//else jQuery(loadingDiv).html($.i18n.prop($.iecs_loading_message.msg));
	
	
	jQuery(overlayDiv).css('display', 'none');
	$this.append(overlayDiv);
	jQuery(overlayDiv).attr('id', 'iecs-loading-indicator-overlay');
	jQuery(overlayDiv).addClass('loading-indicator-overlay');
	
	//获取宽度和调试
	var overlay_width;
	var overlay_height;
	var border_top_width = $this.css('border-top-width');
	var border_left_width = $this.css('border-left-width');
	border_top_width = isNaN(parseInt(border_top_width)) ? 0 : border_top_width;
	border_left_width = isNaN(parseInt(border_left_width)) ? 0 : border_left_width;
	var overlay_left_pos = $this.offset().left + parseInt(border_left_width);
	var overlay_top_pos = $this.offset().top + parseInt(border_top_width);
	overlay_width = parseInt($(window).width());
	overlay_height = parseInt($(window).height());
	
	//overlay
	jQuery(overlayDiv).css('width', overlay_width.toString() + 'px');
	jQuery(overlayDiv).css('height', overlay_height.toString() + 'px');
	jQuery(overlayDiv).css('left', overlay_left_pos.toString() + 'px');
	jQuery(overlayDiv).css('top', overlay_top_pos.toString() + 'px' );
	jQuery(overlayDiv).css('position', 'fixed');
	jQuery(overlayDiv).css('z-index', '99999');

	//loading
	jQuery(loadingDiv).css('display', 'none');
	jQuery(loadingDiv).css('position', 'fixed');
	jQuery(loadingDiv).css('z-index', '99999');
	jQuery(loadingDiv).css('width', '230px');
	jQuery(loadingDiv).css('height', '70px');
	jQuery(loadingDiv).css('line-height', '70px');
	//jQuery(loadingDiv).css('border', 'double red 1px');
	jQuery(loadingDiv).css('padding', '0px 5px 0px 65px');
	$this.append(loadingDiv);
	
	//alert('html: '+$this.html());

	jQuery(loadingDiv).css('left', (overlay_left_pos + ((jQuery(overlayDiv).width() - parseInt(jQuery(loadingDiv).width())) / 2)).toString()  + 'px');	 	
	jQuery(loadingDiv).css('top', (overlay_top_pos + ((jQuery(overlayDiv).height() - parseInt(jQuery(loadingDiv).height())) / 2)).toString()  + 'px');	 
	
	//show 
	jQuery(overlayDiv).show();
	jQuery(loadingDiv).show(); 
	
	return $this;
};

$.imps_hideLoading = function(options) {
	var $this = jQuery(document.body);
	var settings = {};
   	jQuery.extend(settings, options);
   	//需要附加在别的容器上显示Loading,值为对象
	if(settings.renderTo){
		$this = $("#"+settings.renderTo);
	}
	$this.find('#iecs-loading-indicator').remove();
	$this.find('#iecs-loading-indicator-overlay' ).remove();
	return $this;
};
