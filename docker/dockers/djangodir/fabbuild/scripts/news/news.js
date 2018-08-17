var timeout_obj=null;
var index_home=true;
var loadOptions=null;
$().ready(function() {
	index_home=true;
	if($News_Path.indexOf('_home')>=0){
		index_home=false;
		$("#news").append("<div class='child_news_head'>"+$.i18n.prop("news.Whatisnews")+"</div>");
	}else if($News_Path.indexOf('_index')>=0){
		index_home=true;
		$("#news").append("<div class='news_head'>"+$.i18n.prop("news.Whatisnews")+"</div>");
	}
	if(index_home){
		get_news_info(index_home);
	}else{
		loadOptions={renderTo:'child_news'};
		$.imps_newsShowLoading(loadOptions);
		timeout_obj=window.setTimeout("get_news_info(index_home)", 3000);
	}
}
);


function get_news_info(index_home){
	$.ajax({
		type : "POST",
		dataType : "json",
		url : $ECS_PATH + "/publish/" + $News_Path,
		data : '',
		complete : function(data) {
			//$News_Path.indexOf('_home')>=0
			var divNode = document.createElement("div");
			divNode.id = "scrollDiv";
			var ulNode = document.createElement("ul");
			
			var json = null;
			if (data && data.responseText) {
				json = JSON.parse(data.responseText);
				
				if (json && json.length>0) {
					for ( var i = 0; i < json.length; i++) {
						var title =  json[i].title;
						var lastUpdateTime = json[i].lastUpdateTime;
						var importance = json[i].importance;
						var id = json[i].id;
						var type = json[i].type;
						var moduleInex = "-1";
						if(type){
							if(type=="F"){
								moduleInex = "1";
							}else if(type=="P"){
								moduleInex = "2";
							}else if(type=="S"){
								moduleInex = "3";
							}
						}
						var url = $BASE_PATH + 'modules/common/download.jsp?id='+ id +"&module=" + moduleInex;
						var liNode = document.createElement("li");
						liNode.name = "newLi";
						if(importance == "1"){
							liNode.className = "hot";
						}
						$(liNode).append("<a href=\""+url+"\"  target='_blank'><span class='news_time2'></span></a><span class='news_time'>"+lastUpdateTime+"</span>");
						var textNode = document.createTextNode($limitStr(title,35));
						$(liNode).find(".news_time2").append(textNode);
						$(ulNode).append(liNode);
					}
				}
			}
			
			if($News_Path.indexOf('_index')>=0){
				$(ulNode).append("<div class='cls'></div>") ;
			}
			$(divNode).append(ulNode);
			$("#news").append(divNode);
			//防止转义
			if (json && json.length>0) {
				$("#newList li").each(function(x,ele){
					$(this).attr("title",json[x].title);
				});
			}
			
			if(timeout_obj!=null){
				window.clearTimeout(timeout_obj);
			}
			if(loadOptions!=null){
				$.imps_newsHideLoading(loadOptions);
			}
			
		}
	});
}


(function($){
	$.fn.extend({
	        Scroll:function(opt,callback){
	                //参数初始化
	                if(!opt) var opt={};
	                var _this=this.eq(0).find("ul:first");
	                var        lineH=_this.find("li:first").height(), //获取行高
	                        line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), //每次滚动的行数，默认为一屏，即父容器高度
	                        speed=opt.speed?parseInt(opt.speed,10):500, //卷动速度，数值越大，速度越慢（毫秒）
	                        timer=opt.timer?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
	                if(line==0) line=1;
	                var upHeight=0-line*lineH;
	                //滚动函数
	                scrollUp=function(){
	                        _this.animate({
	                                marginTop:upHeight
	                        },speed,function(){
	                                for(i=1;i<=line;i++){
	                                        _this.find("li:first").appendTo(_this);
	                                }
	                                _this.css({marginTop:0});
	                        });
	                }
	                //鼠标事件绑定
	                _this.hover(function(){
	                        clearInterval(timerID);
	                },function(){
	                        timerID=setInterval("scrollUp()",timer);
	                }).mouseout();
	        }        
	})
	})(jQuery);

