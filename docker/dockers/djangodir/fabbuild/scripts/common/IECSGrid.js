/**
 * 公共表格对象<br/>
 * <br/>
 * 如果需要国际化，请在引用的页面导入 Jquery.I18N.JS 插件，如果不导入默认显示中文<br/>
 * @author Bright
 * @date 2013.06.25
 * @param {} iecs_config
 */
var IECSGrid = function(iecs_config) {
	
	var obj = this;
	var iecs_rownum = 0;
	var iecs_render;
	var iecs_tbody;
	var iecs_paging;
	var iecs_paging_info;
	var iecs_params;
	
	//默认
	var _default = {
		renderTo:"iecsgrid",      
		tableClass:"content_tab",
		headerClass:"search_tr1",
		headerHeight:"20",
		headerAlign:"center",
		dataAlign:"center",
		overClass:"tr_o",
		oddClass:"",
		evenClass:"",
		pageable:true,
		pageposition:"top",
		searchform:"",
		queryParams:"",
		complete:"",
		pagetype:"",
		cache:false,
		pageSize:10,
		resize:true,
		locale:{}  //暂时未用
	};
	var iecs_pageconfig = {
		 pg_currentpage:1,
		 pg_size:10,
		 pg_totalpage:0,
		 pg_total:0
	};
	
	//显示的文字信息，国际化更改此配置
	var iecs_messages = {
		frist: "\u9996 \u9875",
		pre  : "\u4e0a\u4e00\u9875",
		next : "\u4e0b\u4e00\u9875",
		last : "\u672b \u9875",
		info : "\u5171\u6709{0}\u6761\u8bb0\u5f55&nbsp;&nbsp;\u5f53\u524d\u7b2c {1} \u9875/\u5171 {2} \u9875 &nbsp;&nbsp;&nbsp;",
		loading : "\u6b63\u5728\u52a0\u8f7d ...",
		notfound : "\u6ca1\u6709\u627e\u5230\u6570\u636e."
	}
	
	iecs_config =$.extend({},_default,iecs_config);//全局配置
	
	
	//查询方法
	this.bindData = function(pms){
		funcs.tableShow(); //SHOW Grid
		iecs_pageconfig.pg_currentpage = 1; //点击查询的时候页码归1
		iecs_config.queryParams = pms;
		funcs.getData();
	};
	
	
	var funcs = {
 
		//初始化表格基本信息
		init:function(){
			iecs_render = jQuery("#" + iecs_config.renderTo);
			iecs_pageconfig.pg_size = iecs_config.pageSize; //初始化每页显示大小
			
			//初始化表格
			var tablethead = "";
			var tablepaging = "";
			if(iecs_config.pageable==true){//分页 
				tablepaging += "<div class='Screening1' id='__iecsgrid_paging' style='display:none' >&nbsp;";
				tablepaging += "<table style='float:right; _margin-top:1px;'  border='0' cellspacing='0' cellpadding='0'>";
				tablepaging += "<tr><td><span id='__iecsgrid_paging_info'></span>&nbsp;</td>";
				tablepaging += "<td><input type='button' id='_page_frist' value='"+iecs_messages.frist+"'>&nbsp;</td>";
				tablepaging += "<td><input type='button' id='_page_pre'  value='"+iecs_messages.pre+"'>&nbsp;</td>";
				tablepaging += "<td><input type='button' id='_page_next' value='"+iecs_messages.next+"'>&nbsp;</td>";
				tablepaging += "<td><input type='button' id='_page_last' value='"+iecs_messages.last+"'>&nbsp;</td>";
				tablepaging += "<td><select id='_pg_choose'></select></td>";
				tablepaging += "</tr></table>";
				tablepaging += "</div>";
			}

			
			//表格
			tablethead += "<table id='__iecstable' class='" + iecs_config.tableClass + "' style='display:none' >";
			tablethead += "<thead class='" + iecs_config.headerClass + "' height='" + iecs_config.headerHeight + "'>";
			var cols = iecs_config.columns;
			for (var i = 0; i < cols.length; i++) {
				tablethead += "<td align='" + (cols[i].headerAlign || iecs_config.headerAlign) + "' width='" + (cols[i].width || "") + "'>" + (cols[i].headerText || "") + "</td>";
			}
			tablethead += "</thead>";
			tablethead += "<tbody id='__iecstable_tbody'></tbody>";
			tablethead += "</table>";
			if(iecs_config.pageposition=="top") 
				tablethead = tablepaging + tablethead;
			else 
				tablethead = tablethead + tablepaging;
			iecs_render.append(tablethead);
			iecs_tbody = iecs_render.find("#__iecstable_tbody");
			iecs_paging = iecs_render.find("#__iecsgrid_paging");
			iecs_paging_info = iecs_render.find("#__iecsgrid_paging_info");
			
			//更改列宽
			if(iecs_config.resize)
			$(iecs_render).find("#__iecstable").colResizer({"bContainer":false, "bDynamic": true})
			
			//绑定事件
			iecs_render.find("#__iecsgrid_paging #_page_frist").click(function(){funcs.page_go(1);})
			iecs_render.find("#__iecsgrid_paging #_page_pre").click(function(){funcs.page_go(iecs_pageconfig.pg_currentpage-1);})
			iecs_render.find("#__iecsgrid_paging #_page_next").click(function(){funcs.page_go(iecs_pageconfig.pg_currentpage+1);})
			iecs_render.find("#__iecsgrid_paging #_page_last").click(function(){funcs.page_go(iecs_pageconfig.pg_totalpage);});
			iecs_render.find("#__iecsgrid_paging #_pg_choose").unbind().change(function(){funcs.page_go($(this).val());});
		},
		
		//获取数据
		getData:function(pms){
			funcs.showLoding();
			
	 		iecs_params = funcs.getParams(pms);
//	 		alert('iecs_config.url: '+iecs_config.url);
			//加载数据
	 		$.ajax({
				type: "post",
				url: iecs_config.url,
				data: iecs_params||"",
				cache:iecs_config.cache==true?true:false,
				dataType: "json",
				success: function(result){
					if(result==null || result.datas==null||result.datas.length==undefined){
					 	//alert("data fail!");
					 	return false;
					}
					
					$(iecs_tbody).empty();
					 iecs_config.data = result.datas;
					 iecs_pageconfig.pg_currentpage = result.currentPage;
					 iecs_pageconfig.pg_totalpage = result.totalPage;
					 iecs_pageconfig.pg_total = result.totalSize;
					 iecs_pageconfig.pg_size = result.pageSize;
					 
					 funcs.showData(); //显示数据
					 
					//完成后调用Complete方法 
					if(iecs_config.complete){
						if(typeof(iecs_config.complete) == 'function'){
							iecs_config.complete();
						}else{
							eval(iecs_config.complete+"()");
						}
					}
				},
				error:function(xmlHttpRequest,status) {
					if(xmlHttpRequest.status==501){
						funcs.getData(pms);
					}else{
//						alert('xmlHttpRequest.status: '+xmlHttpRequest.status+' and status: '+status);
		                 if(confirm("数据访问失败，重新登录 ？")){
			                 	window.parent.location.href = $IECS_PATH+"index_show.jsp";	
			                 }
					}
                }
			});
		},
		
		//显示提示信息
		showLoding:function(showText){
			var collength = iecs_config.columns.length||20; //跨列数
			//showText = showText || "<img src='images/loading.gif'/>";
			showText = showText || iecs_messages.loading;
			$(iecs_tbody).html("");
			$(iecs_tbody).html("<tr><td colspan="+collength+" stlye='font-size:36px:'>"+showText+"</td></tr>");
		},
		
		//获取查询参数
		getParams:function(pms){
			var queryParam = "0=0";
			if(iecs_config.searchform){
				var _searchDiv = $("#"+iecs_config.searchform);
				queryParam += "&"+_searchDiv.serialize()+"";
			}
			if(iecs_config.pageable==true){
				queryParam += "&currentPage="+iecs_pageconfig.pg_currentpage+"&pageSize="+iecs_pageconfig.pg_size;
			}
			if(iecs_config.queryParams){ //外部参数
				queryParam += "&"+encodeURI(iecs_config.queryParams);
			}
			return queryParam;
		},
	
		// 拼装数据行
		drowData:function() {
			var rows = iecs_config.data;
			var cols = iecs_config.columns;
			var rowDatas = ""; 
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				rowDatas += "<tr id='TR"+i+"' data='' rowIndex='" + iecs_rownum++ + "'>";
				for (var j = 0; j < cols.length; j++) {
					var col = cols[j];
					if(iecs_config.rowEvent){
						rowDatas += iecs_config.rowEvent(row);
					}else{
						rowDatas += "<td align='" + (col.dataAlign || iecs_config.dataAlign || "left") + "' >";
						if (col.handler) {
							if(typeof(col.handler) == 'function'){
								rowDatas += col.handler(row,col);
							}else{
								rowDatas += (eval(col.handler + "(row,col)") || "");
							}
						} else {
							if(col.dataField){
								var fields = col.dataField.split(".");
								
								if(fields.length>1){
									var evalval = "row";
									for(var index=0;index<fields.length;index++){
										evalval +="['" +fields[index]+ "']"; 
									}
									rowDatas += (eval(evalval) || "");
								}else{
									rowDatas += (row[col.dataField] || "");
								}
							}
						}
						rowDatas += "</td>";
					};
				}
				rowDatas += "</tr>";
			}
			return rowDatas;
		},
	
		//显示数据
		showData:function() {
			if(iecs_config.data.length==0){
			 	funcs.pagingShow("hide");
				funcs.showLoding(iecs_messages.notfound);
				return false;
			}
			if(iecs_config.pageable==true)
				funcs.updatePaging(); //更新分页信息
		
			$(iecs_tbody).empty(); //  清空数据和分页信息 
			$(iecs_tbody).append(funcs.drowData());//附加行数据
			//alert($(iecs_render).html());
			funcs.colour(); //添加效果
		},
	
		//行添加颜色颜色效果
		colour : function() {
			$(iecs_tbody).each(function() {
				// 数据行奇偶行上色
				$(this).find("tr:odd").addClass(iecs_config.oddClass).end().find("tr:even").addClass(iecs_config.evenClass);
				// 数据行滑动颜色
				$(this).find("tr").each(function() {
					$(this).hover(function() { $(this).addClass(iecs_config.overClass);}, function() { $(this).removeClass(iecs_config.overClass);});
				});
			});
		},
		
		//更新分页信息
		updatePaging:function(){
			var pg = $(iecs_paging);
			
			//显示分页信息
			iecs_paging_info.html(funcs.setPageinfo(iecs_config.pagetype));
			
			var pgchoose = pg.find("#_pg_choose");
			pgchoose.empty();
			for (var i = 1; i <= iecs_pageconfig.pg_totalpage; i++) {
				pgchoose.append("<option value=" + i + ">" + i + "</option>");
			}
			pgchoose.val(iecs_pageconfig.pg_currentpage);
			
			
			var pg_frist = pg.find("#_page_frist"),pg_pre = pg.find("#_page_pre"),
				pg_next=pg.find("#_page_next"),    pg_last=pg.find("#_page_last");
			
			pg.find("input").attr("disabled",false).css("color","#4F4F4F").css("cursor","pointer");
			
			if(iecs_pageconfig.pg_currentpage<=1){
				pg_frist.attr("disabled",true).css("cursor","default");
				pg_pre.attr("disabled",true).css("cursor","default");
			}
			if(iecs_pageconfig.pg_currentpage>=iecs_pageconfig.pg_totalpage){
				pg_next.attr("disabled",true).css("cursor","default");
				pg_last.attr("disabled",true).css("cursor","default");
			} 
		
			//只有一页则不显示分页标签
			if(iecs_pageconfig.pg_totalpage>1){
				funcs.pagingShow("show");
			}else{
				funcs.pagingShow("hide");
			}
		},
		
		//显示分页信息
		setPageinfo:function(type){
			var pageinfo = "";
			if(type=="simple"){
				pageinfo = iecs_messages.simple_info;
				pageinfo= pageinfo.replace("{0}",iecs_pageconfig.pg_totalpage)
			}else{
				pageinfo = iecs_messages.info;
				pageinfo = pageinfo.replace("{0}",iecs_pageconfig.pg_total)
				pageinfo = pageinfo.replace("{1}",iecs_pageconfig.pg_currentpage)
				pageinfo = pageinfo.replace("{2}",iecs_pageconfig.pg_totalpage)
			}
			return pageinfo;
		},
		
		//分页查找
		page_go:function(pageindex){
			if(pageindex >= 1 && pageindex <= iecs_pageconfig.pg_totalpage){
				iecs_pageconfig.pg_currentpage = pageindex;
				funcs.getData();   //重新加载
			}
		},
		
		//加载国际化资源文件
		loadMessages : function(){
			//如果未导入JQueryI18N插件则不使用JS国际化，显示默认中文
			if(typeof($.i18n)!='undefined'){
				//加载JS资源文件
				//Original Part
//				$.i18n.properties({
//					    name:'common',
//					    path:$IECS_PATH+'/messages/',
//					    mode:'map',
//	    				language:Common.Cookie.get('language'),
//					    callback: function() {
//						    iecs_messages.frist = $.i18n.prop("paging.frist");
//							iecs_messages.pre = $.i18n.prop("paging.pre");
//							iecs_messages.next = $.i18n.prop("paging.next");
//							iecs_messages.last = $.i18n.prop("paging.last");
//							iecs_messages.info = $.i18n.prop("paging.info");
//							iecs_messages.simple_info = $.i18n.prop("paging.simple_info");
//							iecs_messages.loading = $.i18n.prop("paging.loading");
//							iecs_messages.notfound = $.i18n.prop("paging.notfound");
//					    }
//				});
				//Original Part
				
				var lang=null;
				if(langJsp!=null){
					lang=langJsp;
				}else{
					lang=Common.Cookie.get('language');
				}
				jQuery.i18n.properties({
					name : 'common',// 资源文件名称
					path : $IECS_PATH+'/messages/',// 资源文件所在目录路径
					mode : 'map',// 模式：变量或 Map
					language : lang,//Common.Cookie.get('language'),// 从cookie获取语言
					cache : true,
					encoding : 'UTF-8',
					callback : function() {
						// 加载完回调
					    iecs_messages.frist = $.i18n.prop("paging.frist");
						iecs_messages.pre = $.i18n.prop("paging.pre");
						iecs_messages.next = $.i18n.prop("paging.next");
						iecs_messages.last = $.i18n.prop("paging.last");
						iecs_messages.info = $.i18n.prop("paging.info");
						iecs_messages.simple_info = $.i18n.prop("paging.simple_info");
						iecs_messages.loading = $.i18n.prop("paging.loading");
						iecs_messages.notfound = $.i18n.prop("paging.notfound");
					}
				});
				
			}
			funcs.init();  //加载完资源后初始化表格
		},
		
		//显示隐藏分页信息
		pagingShow:function(isshow){
			var pgobj = jQuery(iecs_render).find("#__iecsgrid_paging");
			isshow=="hide"?pgobj.hide():pgobj.show();
		},
		
		//显示隐藏table信息
		tableShow:function(isshow){
			var pgobj = jQuery(iecs_render).find("#__iecstable");
			isshow=="hide"?pgobj.hide():pgobj.show();
		}
	}
	
	funcs.loadMessages();//第一次进来则初始化表格信息
};


// 更改列宽
!function(a){a.fn.colResizer=function(b){function k(b,d){var e=a(b.target),f=b.pageX,g=e.offset(),h=g.left,i=h+e.outerWidth();return d?f<=h+c.range:f>=i-c.range}function l(a){return k(a,!0)}function m(a){return k(a,!1)}function n(b){f&&(a(b.target),a.browser.mozilla?a("body").css("-moz-user-select","none"):a(document).bind("selectstart",function(){return!1}),h=a("#"+c.sLineIdPrefix+"_left"),i=a("#"+c.sLineIdPrefix+"_right"),0===h.length&&(h=a("<div></div>"),h.css(c.resize_line_border),h.css("position","absolute"),h.css("width","0px"),h.appendTo("body"),h.attr("id",c.sLineIdPrefix+"_left"),i=h.clone(),i.appendTo("body"),i.attr("id",c.sLineIdPrefix+"_right")),h.css({top:g.offset().top,left:g.offset().left,height:a("table").innerHeight()}),i.css({top:g.offset().top,left:b.pageX,css:"col-resize",height:a("table").innerHeight()}),a(document).bind("mousemove",o),a(document).bind("mouseup",p),h.show(),i.show(),e=!0)}function o(a){e&&a.pageX-g.offset().left>c.minWidth&&(i.css("left",a.pageX),c.bDynamic&&q())}function p(){e&&(e=!1,i.hide(),h.hide(),a.browser.mozilla?a("body").css("-moz-user-select",""):a(document).unbind("selectstart"),a(document).unbind("mousemove",o),a(document).unbind("mouseup",p),q())}function q(){var a=parseInt(i.css("left"),10)-g.offset().left-g.width();g.width(g.width()+a)}var c,e,f,g,h,i,j;return a.fn.colResizer.defaults={resize_line_border:{"border-style":"solid","border-color":"#efefef","border-width":"0 1px 0 1px"},minWidth:20,range:2,bContainer:!0,bDynamic:!1,sLineIdPrefix:"table_resize_reference"},c=a.extend({},a.fn.colResizer.defaults,b),e=!1,f=!1,j=function(b){var d=c.bContainer?b.children("table"):b,h=d.find("tr:first"),i=h.find("th");i=i.length?i:h.find("td"),i.mousemove(function(b){var c=a(b.target);if(e)o(b);else if(l(b)){if(g=c.prev(),0==g.length)return;f=!0,c.css("cursor","col-resize")}else m(b)?(g=c,f=!0,c.css("cursor","col-resize")):(f=!1,c.css("cursor","default"))}),i.mousedown(function(a){n(a)})},this.each(function(){if(a.nodeName(this,"table"))if(c.bContainer){var b=a(this).wrap("<div/>").parent();j(b)}else j(a(this))})}}(jQuery);
