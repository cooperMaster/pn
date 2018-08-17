/**
 * 公共表格对象<br/> <br/> 如果需要国际化，请在引用的页面导入 Jquery.I18N.JS 插件，如果不导入默认显示中文<br/>
 * 
 * @author Bright
 * @date 2013.06.25
 * @param {}
 *            ecs_config
 */
var ECSGrid = function(ecs_config) {
	loadBundles();
	var obj = this;
	var ecs_rownum = 0;
	var ecs_render;
	var ecs_tbody;
	var ecs_paging;
	var ecs_paging_info;
	var ecs_params;
	
	var filterFailTimesMax=2;
	var filterFailTimesCurrent=0;
	
	// 测试用
	var testCurrentPage=1;
	// 默认
	var _default = {
		renderTo:"ecsgrid",      
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
		tableWidthPer:'100%',
		rowOddStyle:"",
		createBnHandler:"",
		createBnExist:false,
		createBnTxt:'',
		createBnStyle:'ta_btn search_icon marginR2 createBn',
		errorHandler:"",
		createBnTitle:"",
		closeBnClass:"closed",
		closeBnHandler:"",
		closeTargetID:"",
		headerHide:false,
		locale:{}  // 暂时未用
	};
	var ecs_pageconfig = {
		 pg_currentpage:1,
		 pg_size:10,
		 pg_totalpage:0,
		 pg_total:0
	};
	
	// 显示的文字信息，国际化更改此配置
	var ecs_messages = {
			frist: $.i18n.prop("paging.first"),//"\u9996 \u9875",
			pre  : $.i18n.prop("paging.pre"),//"\u4e0a\u4e00\u9875",
			next : $.i18n.prop("paging.next"),//"\u4e0b\u4e00\u9875",
			last : $.i18n.prop("paging.last"),//"\u672b \u9875",
			info : $.i18n.prop("paging.info"),//"\u5171\u6709{0}\u6761\u8bb0\u5f55&nbsp;&nbsp;\u5f53\u524d\u7b2c {1} \u9875/\u5171 {2} \u9875 &nbsp;&nbsp;&nbsp;",
			loading : $.i18n.prop("paging.loading"),//"\u6b63\u5728\u52a0\u8f7d ...",
			notfound : $.i18n.prop("paging.notfound")//"\u6ca1\u6709\u627e\u5230\u6570\u636e."
	};
	
	ecs_config =$.extend({},_default,ecs_config);// 全局配置
	
	// 所有的表格信息处理方法都在Json对象func中保存
	// 查询方法//这里的形参，直到最后的getParam或者getData都没用过
	this.bindData = function(pms){
		funcs.tableShow(); // SHOW Grid
		ecs_pageconfig.pg_currentpage = 1; // 点击查询的时候页码归1
		// 把pms作为查询条件记录到ecs_config.queryParams中，在getParam中如果要检测ecs_config.queryParams不为空，那么则添加这个查询条件
		ecs_config.queryParams = pms;
		funcs.hideAndShowPage(true);
		
		//2014-04-14 huzheyi
		filterFailTimesCurrent=0;
		//2014-04-14 huzheyi
		
		funcs.getData();
	};
	
	
	var funcs = {
 
		// 初始化表格基本信息
		init:function(){	
			ecs_render = jQuery("#" + ecs_config.renderTo);
			
			ecs_pageconfig.pg_size = ecs_config.pageSize; // 初始化每页显示大小
			
			// 初始化表格
			var tablethead = "";
			var tablepaging = "";
			if(ecs_config.pageable==true){// 分页
				/*
				 * tablepaging += "<div class='Screening1'
				 * id='__ecsgrid_paging' style='display:none' >&nbsp;";
				 * tablepaging += "<table style='float:right; _margin-top:1px;'
				 * border='0' cellspacing='0' cellpadding='0'>"; tablepaging += "<tr><td><span
				 * id='__ecsgrid_paging_info'></span>&nbsp;</td>";
				 * tablepaging += "<td><input type='button' id='_page_frist'
				 * value='"+ecs_messages.frist+"'>&nbsp;</td>"; tablepaging += "<td><input
				 * type='button' id='_page_pre'
				 * value='"+ecs_messages.pre+"'>&nbsp;</td>"; tablepaging += "<td><input
				 * type='button' id='_page_next'
				 * value='"+ecs_messages.next+"'>&nbsp;</td>"; tablepaging += "<td><input
				 * type='button' id='_page_last'
				 * value='"+ecs_messages.last+"'>&nbsp;</td>"; tablepaging += "<td><select
				 * id='_pg_choose'></select></td>"; tablepaging += "</tr></table>";
				 * tablepaging += "</div>";
				 */
				
				var init_firstPage=ecs_messages.frist==null?'First Page':ecs_messages.frist;
				var init_prePage=ecs_messages.pre==null?'Previous Page':ecs_messages.pre;
				var init_nextPage=ecs_messages.next==null?'Next Page':ecs_messages.next;
				var init_lastPage=ecs_messages.last==null?'Last Page':ecs_messages.last;
				var currentPage=ecs_pageconfig.pg_currentpage==null?0:ecs_pageconfig.pg_currentpage;
				var totalPage=ecs_pageconfig.pg_totalpage==null?0:ecs_pageconfig.pg_totalpage;
				
				var tablePagingContent="<table width='"+ecs_config.tableWidthPer+"' border='0' cellpadding='0' cellspacing='0' class='data_nt'>";
				tablePagingContent+="<tr class='list_parent'>";
				tablePagingContent+="<td style='border:none;' align='left' class='dir_list2'>";
				tablePagingContent+="<div class='__ecsgrid_paging'>";// id='__ecsgrid_paging'
				tablePagingContent+="<span> <a href='#' class='left' id='_page_frist'>"+init_firstPage+"</a> </span>";
				tablePagingContent+="<span><a href='#' class='left' id='_page_pre'>"+init_prePage+"</a> </span>";
				tablePagingContent+="<span> <a href='#' class='right' id='_page_next'>"+init_nextPage+"</a> </span>";
				tablePagingContent+="<span> <a href='#' class='right' id='_page_last'>"+init_lastPage+"</a> </span>";
				tablePagingContent+="<span>&nbsp;&nbsp;&nbsp;"+$.i18n.prop("common.page")+" <input class='page_go' type='text' value='' id='_page_require'/></span>";
				tablePagingContent+="<span><input type='button' class='sumbit' value='"+$.i18n.prop("page.go")+"' id='_page_choose' style='width:auto'/></span>";
				tablePagingContent+="<span>&nbsp;&nbsp;&nbsp;<span id='_page_info'>"+currentPage+"/"+totalPage+"</span> "+$.i18n.prop("common.page")+"</span>";// 1/10
				tablePagingContent+="</div>";
				tablePagingContent+="</td>";
				if(ecs_config.createBnExist){
					tablePagingContent+="<td style='border:none;' align='right'><input class='"+ecs_config.createBnStyle+" createBn' type='button' title='"+ecs_config.createBnTitle+"' value='"+ecs_config.createBnTxt+"'></td>";// onclick='addNewUserShow();'
				}
				
				tablePagingContent+="</tr>";
				
				tablepaging+=tablePagingContent;
				
				/*
				 * tablepaging+="<table width='"+ecs_config.tableWidthPer+"'
				 * border='0' cellpadding='0' cellspacing='0' class='data_nt'>";
				 * tablepaging+="<tr>"; tablepaging+="<td align='left' class='dir_list2'>";
				 * tablepaging+="<div id='__ecsgrid_paging'>"; tablepaging+="<span>
				 * <a href='#' class='left' id='_page_frist'>"+init_firstPage+"</a>
				 * </span>"; tablepaging+="<span><a href='#' class='left'
				 * id='_page_pre'>"+init_prePage+"</a> </span>"; tablepaging+="<span>
				 * <a href='#' class='right' id='_page_next'>"+init_nextPage+"</a>
				 * </span>"; tablepaging+="<span> <a href='#' class='right'
				 * id='_page_last'>"+init_lastPage+"</a> </span>";
				 * tablepaging+="<span>&nbsp;&nbsp;&nbsp;Page <input
				 * class='page_go' type='text' value='' id='_page_require'/></span>";
				 * tablepaging+="<span><input type='button' class='sumbit'
				 * value='Go' id='_page_choose'/></span>"; tablepaging+="<span>&nbsp;&nbsp;&nbsp;1/10
				 * Page</span>"; tablepaging+="</div>"; tablepaging+="</td>";
				 * tablepaging+="</tr>";
				 */
				
				
				
				
				/*
				 * <table width="100%" border="0" cellpadding="0"
				 * cellspacing="0" class="data_nt"> <tr>
				 * <td align="left" class="dir_list2"> <span> <a href="#"
				 * class="left">&lt;</a> </span> <span> <a href="#"
				 * class="right">&gt;</a> </span> <span>&nbsp;&nbsp;&nbsp;Page
				 * <input class="page_go" type="text" value="" /></span> <span><input
				 * type="button" class="sumbit" value="Go" /></span>
				 * <span>&nbsp;&nbsp;&nbsp;1/10 Page</span> </td>
				 * <td align="right"> <input type="button" class="ta_btn
				 * search_icon marginR2 " value="" onclick="addNewUserShow();"
				 * title="Add User" /> </td> </tr> </table>
				 */
				
			}

			
			
			
			
			// 表格
			tablethead += "<table cellpadding=\"0\" cellspacing=\"0\"  width='"+ecs_config.tableWidthPer+"'  id='__ecstable' class='" + ecs_config.tableClass + "' style='display:none' >";
			/*tablethead += "<tr class='" + ecs_config.headerClass + "' height='" + ecs_config.headerHeight + "'>";// <thead>
*/			var cols = ecs_config.columns;
			if(!ecs_config.headerHide){
				tablethead += "<tr class='" + ecs_config.headerClass + "' height='" + ecs_config.headerHeight + "'>";// <thead>
				for (var i = 0; i < cols.length; i++) {
					tablethead += "<th align='" + (cols[i].headerAlign || ecs_config.headerAlign) + "' width='" + (cols[i].width || "") + "'>" + (cols[i].headerText || "") + "</th>";
				}
			}
			tablethead += "</tr>";// </thead>
			
			tablethead += "<tbody id='__ecstable_tbody'></tbody>";
			
			tablethead += "</table>";
			if(ecs_config.pageposition=="top") 
				tablethead = tablepaging + tablethead;
			else if(ecs_config.pageposition=="button")
				tablethead = tablethead + tablepaging;
			else if(ecs_config.pageposition=="both")
				tablethead=tablepaging +tablethead + tablepaging;
			
			
			
			
			ecs_render.append(tablethead);
			
			ecs_tbody = ecs_render.find("#__ecstable_tbody");
			
			ecs_paging = ecs_render.find(".__ecsgrid_paging");// #__ecsgrid_paging
			ecs_paging_info = ecs_render.find("#__ecsgrid_paging_info");
			
			// 更改列宽
			if(ecs_config.resize)
			$(ecs_render).find("#__ecstable").colResizer({"bContainer":false, "bDynamic": true})
			
			// 绑定事件
			ecs_render.find(".__ecsgrid_paging #_page_frist").click(function(){funcs.page_go(this,1);});// #__ecsgrid_paging
			ecs_render.find(".__ecsgrid_paging #_page_pre").click(function(){funcs.page_go(this,parseInt(ecs_pageconfig.pg_currentpage)-1);});// #__ecsgrid_paging
			ecs_render.find(".__ecsgrid_paging #_page_next").click(function(){funcs.page_go(this,parseInt(ecs_pageconfig.pg_currentpage)+1);});// #__ecsgrid_paging
			ecs_render.find(".__ecsgrid_paging #_page_last").click(function(){funcs.page_go(this,ecs_pageconfig.pg_totalpage);});// #__ecsgrid_paging
			// ecs_render.find(".__ecsgrid_paging
			// #_page_choose").click(function(){alert('page_choose');funcs.page_go(ecs_render.find(".__ecsgrid_paging
			// #_page_require").val());});//#__ecsgrid_paging
			// ecs_render.find("#__ecsgrid_paging
			// #_pg_choose").unbind().change(function(){funcs.page_go($(this).val());});//original
			// code for choose control and select change
			
			$.each(ecs_render.find(".createBn"),function(index,createBn){
				var funcHandler=ecs_config.createBnHandler;
				if(typeof(funcHandler)=='function'){
					$(createBn).click(function(){
						funcHandler();
					});
				}else{
					$(createBn).click(function(){
						eval(funcHandler+"()");
					});
				}
			});
			
			$.each(ecs_render.find(".__ecsgrid_paging"),function(index,indi_page){
				var pageObj=$(indi_page);
				pageObj.find("#_page_choose").click(function(){funcs.page_go(this,parseInt(pageObj.find("#_page_require").val()));});
			});
			
			/*
			 * $.each(ecs_render.find(".__ecsgrid_paging
			 * #_page_frist"),function(index,indi_page){ alert('index: '+index);
			 * alert('pageFirst: '+$(indi_page)[0]); });
			 */
			ecs_render.parent().children('div.'+ecs_config.closeBnClass).bind('click',function(){
				$("#"+ecs_config.closeTargetID).html("");
			});
			funcs.hideAndShowPage(false);
			
		},
		
		// 显示消失页码条
		hideAndShowPage:function(hide_show){
			if(!hide_show){
				$.each($('#ecsgrid table.data_nt tr.list_parent .__ecsgrid_paging').not("#__ecstable"),function(index,indi_page){
					if(index==1){
						$(indi_page).hide();
					}else{
						$(indi_page).hide();
					}
				});
				$.each($('.createBn'),function(index,indi_BN){
					if(index==1){
						$(indi_BN).hide();
					}
				});
			}else{
				$.each($('#ecsgrid table.data_nt tr.list_parent .__ecsgrid_paging').not("#__ecstable"),function(index,indi_page){
					if(index==1){
						$(indi_page).show();
					}else{
						$(indi_page).show();
					}
				});
				$.each($('.createBn'),function(index,indi_BN){
					if(index==1){
						$(indi_BN).show();
					}
				});
			}
		},
		
		// 获取数据
		getData:function(pms){
			funcs.showLoding();	
	 		ecs_params = funcs.getParams(pms);
			// 加载数据
	 		$.ajax({
				type: "post",
				url: ecs_config.url,
				data: ecs_params||"",
				cache:ecs_config.cache==true?true:false,
				dataType: "json",
				success: function(result){
					if(result != null && typeof(result.sessionFilterResult)!='undefined'&&result.sessionFilterResult!=null){
						if(!result.sessionFilterResult){
							if(filterFailTimesCurrent<=filterFailTimesMax){
								filterFailTimesCurrent+=1;
//								alert('filterFailTimesCurrent: '+filterFailTimesCurrent);
								funcs.getData(pms);
							}
						}
					}
					
					
					if(result==null || result.datas==null||result.datas.length==undefined){
						if(result != null && typeof(result.errors) != "undefined"){
							if(typeof(ecs_config.errorHandler)=='function'){
								ecs_config.errorHandler(result.errors);
							}else{
								eval(ecs_config.errorHandler+"(" + result.errors + ")");
							}
						}
						funcs.showData();
					 	return false;
					}
					
					$(ecs_tbody).empty();
					 ecs_config.data = result.datas;
					 ecs_pageconfig.pg_currentpage = result.currentPage;
					 
					 // 测试用
					 ecs_pageconfig.pg_currentpage=testCurrentPage;

					 ecs_pageconfig.pg_totalpage = result.totalPage;
					 ecs_pageconfig.pg_total = result.totalSize;
					 ecs_pageconfig.pg_size = result.pageSize;
					 
					 funcs.showData(); // 显示数据
					 
					// 完成后调用Complete方法
					if(ecs_config.complete){
						if(typeof(ecs_config.complete) == 'function'){
							ecs_config.complete();
						}else{
							eval(ecs_config.complete+"()");
						}
					}
				},
				error:function(xmlHttpRequest,state) {
					if(xmlHttpRequest.status==501){
						funcs.getData(pms);
					}else{
//							alert('xmlHttpRequest.status: '+xmlHttpRequest.status+' and state: '+state);
		                 if(confirm("数据访问失败，重新登录 ？")){
		                 	window.parent.location.href = $ECS_PATH+"index_show.jsp";	
		                 }
					}
                }
			});
		},
		
		// 显示提示信息
		showLoding:function(showText){
			var collength = ecs_config.columns.length||20; // 跨列数
			// showText = showText || "<img src='images/loading.gif'/>";
			showText = showText || ecs_messages.loading;
			$(ecs_tbody).html("");
			$(ecs_tbody).html("<tr><td style='border:none;' colspan="+collength+" stlye='font-size:36px:'>"+showText+"</td></tr>");
		},
		
		// 获取查询参数
		getParams:function(pms){
			var queryParam = "0=0";
			if(ecs_config.searchform){
				var _searchDiv = $("#"+ecs_config.searchform);
				// alert('before queryParam: '+queryParam);
				queryParam += "&"+_searchDiv.serialize()+"";
				// alert('after queryParam: '+queryParam);
			}
			if(ecs_config.pageable==true){
				queryParam += "&currentPage="+ecs_pageconfig.pg_currentpage+"&pageSize="+ecs_pageconfig.pg_size;
				// alert('set paging query condition sentence and Query
				// Sentence: ['+queryParam+"]");
			}
			if(ecs_config.queryParams){ // 外部参数
				queryParam += "&"+encodeURI(ecs_config.queryParams);
			}
			// alert('final return queryParam: '+queryParam);
			return queryParam;
		},
		
		// 拼装数据行
		drowData:function() {
			var rows = ecs_config.data;
			var cols = ecs_config.columns;
			var rowDatas = new Array(); 
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
//				rowDatas += "<tr id='TR"+i+"' data='' rowIndex='" + ecs_rownum++ + "'>";
				var trNode = document.createElement("tr");
				trNode.id = "TR"+i;
				$(trNode).attr("data","");
				$(trNode).attr("rowIndex",ecs_rownum++);
				for (var j = 0; j < cols.length; j++) {
					var col = cols[j];
					if(ecs_config.rowEvent){						
//						rowDatas += ecs_config.rowEvent(row);
					}else{						
//						rowDatas += "<td align='" + (col.dataAlign || ecs_config.dataAlign || "left") +"'"+" colIndex="+ j +" >";			
						var tdNode = document.createElement("td");
						$(tdNode).attr("align", col.dataAlign || ecs_config.dataAlign || "left" );
						$(tdNode).attr("colIndex",j);
						
						if (col.handler) {
							var handlerResult = null;
							if(col.handler.func && typeof(col.handler.func) == 'function'){
								handlerResult = col.handler.func(row,col,col.handler.params);
							}else {
								if(typeof(col.handler) == 'function'){
									handlerResult = col.handler(row,col);//可以看出是回调原文件创建单个列的单元
								}else{
									handlerResult = (eval(col.handler + "(row,col)") || "");
								}
							}
							if(Object.prototype.toString.call(handlerResult) === '[object Array]'){
								for(var n = 0; handlerResult.length; n++ ){
									$(tdNode).append(handlerResult[n]);
								}
							}else{
								$(tdNode).append(handlerResult);
							}
						} else {
							if(col.dataField){
								var fields = col.dataField.split(".");
								if(fields.length>1){
//									var evalval = "row";
									var textNode = "";
									for(var index=0;index<fields.length;index++){
//										evalval +="['" +fields[index]+ "']"; 
										
										if(index === 0){
											textNode = row[fields[index]];
										}else{
											textNode += "-"+row[fields[index]];
										}
									}
//									rowDatas += (eval(evalval) || "");
									
//									var textNode = document.createTextNode((eval(evalval) || ""));
									
									$(tdNode).append(document.createTextNode(textNode || ""));
								}else{
//									rowDatas += (row[col.dataField] || "");
									
									var textNode 
									if(col.isNumber){
										textNode = document.createTextNode((row[col.dataField] || 0));
									}else{
										textNode = document.createTextNode((row[col.dataField] || ""));
									}
									$(tdNode).append(textNode);
								}
							}
							if(col.colType){
								if(col.colType === "checkbox"){
									$(tdNode).append("<input type='checkbox'/>")
								}
							}
						}
//						rowDatas += "</td>";	
						$(trNode).append(tdNode);
					};
				}
				rowDatas[i] = trNode;
//				rowDatas += "</tr>";
			}
			
			return rowDatas;
		},
	
		// 增加每个列的操作方法
		appendOperateFunc:function(){
			var col_setting=ecs_config.columns;
			var rows=$('#__ecstable_tbody').find('tr');
			$.each(rows,function(i,indi_row){
				var cols=$(indi_row).find('td');
				if(cols.length>0){
					$.each(cols,function(j,indi_col){
						var indi_colObj=$(indi_col);
						var col_index=indi_colObj.attr('colIndex');
						indi_col_set=col_setting[col_index];
						
						if(indi_col_set){
							var operateType=indi_col_set.operateType;
							var operateFunc=indi_col_set.operatorFunc;
							var value=indi_col_set.paramAttrName;
						
							if(operateType!=null&&$.trim(operateType)!=''){
								indi_colObj.bind(operateType,{param:value,colSet:indi_colObj},function action(event){
									if(typeof(operateFunc)=='function'){
										operateFunc(event.data.colSet.html());
									}else{
										eval(operateFunc+'("'+event.data.colSet.html()+'")');
									}
								});
							}
						}
					});
				}
			});
		},
		
		// 给每行赋予样式
		appendClass:function(){
			var row_array_obj=null;
			if(ecs_config.renderTo){
				row_array_obj=$("#" + ecs_config.renderTo+' table #__ecstable_tbody tr');
			}else{
				row_array_obj=$('table #__ecstable_tbody tr');
			}
			row_array_obj.parents('table#__ecstable').removeClass('data_nt');
//			row_array_obj.parents('table#__ecstable').addClass('data_nt');
			$.each(row_array_obj,function(i,val){
				if(i%2!=0){
					$(val).addClass(ecs_config.rowOddStyle);// 需要修改的地方
				}
			});
		},
		
		// 显示数据
		showData:function() {
			if(ecs_config.data.length==0){
			 	funcs.pagingShow("hide");
				funcs.showLoding(ecs_messages.notfound);
				return false;
			}
			if(ecs_config.pageable==true)
				funcs.updatePaging(); // 更新分页信息
			
			
// var pg_total = $(ecs_paging);//pg
// alert(pg_total.html());
// $.each(pg_total,function(i,indi_pg){
// var pg=$(indi_pg);
// alert('pg_html: \n'+pg.html());
// var pg_frist = pg.find("#_page_frist"),pg_pre = pg.find("#_page_pre"),
// pg_next=pg.find("#_page_next"), pg_last=pg.find("#_page_last");
// alert('first: '+pg_frist.attr('disabled'));
// alert('pre: '+pg_pre.attr('disabled'));
// alert('last: '+pg_last.attr('disabled'));
// alert('next: '+pg_next.attr('disabled'));
// });
			// alert(pg_first.length);
			
			
			$(ecs_tbody).empty(); // 清空数据和分页信息
//			$(ecs_tbody).append(funcs.drowData());// 附加行数据
			var trs = funcs.drowData();
			for(var i = 0; i < trs.length; i++){
				$(ecs_tbody).append(trs[i]);
			}
			funcs.appendOperateFunc();
			
			// 2013-11-15//author zheyi_hu//create//给不同的row赋予不同的样式
			funcs.appendClass();
			funcs.colour(); // 添加效果
		},
	
		// 行添加颜色颜色效果
		colour : function() {
			//alert('colour');
			//alert('in function colour: '+$(ecs_tbody).html());
			$(ecs_tbody).each(function() {
				// 数据行奇偶行上色
				$(this).find("tr:odd").addClass(ecs_config.oddClass).end().find("tr:even").addClass(ecs_config.evenClass);
				// 数据行滑动颜色
				$(this).find("tr").each(function() {
					$(this).hover(function() { $(this).addClass(ecs_config.overClass);}, function() { $(this).removeClass(ecs_config.overClass);});
				});
			});
		},
		
		// 更新分页信息
		updatePaging:function(){
			var pg_total = $(ecs_paging);// pg
			$.each(pg_total,function(i,indi_pg){
				var pg=$(indi_pg);
				var currentPage=ecs_pageconfig.pg_currentpage;
				var totalPage=ecs_pageconfig.pg_totalpage;				
				
				pg.find("#_page_require").val(currentPage);
				pg.find("#_page_info").html(currentPage+"/"+totalPage);
				
				/*
				 * var pgchoose = pg.find("#_pg_choose"); pgchoose.empty(); for
				 * (var i = 1; i <= ecs_pageconfig.pg_totalpage; i++) {
				 * pgchoose.append("<option value=" + i + ">" + i + "</option>"); }
				 * pgchoose.val(ecs_pageconfig.pg_currentpage);
				 */// 暂时不需要
				
				var pg_frist = pg.find("#_page_frist"),pg_pre = pg.find("#_page_pre"),
					pg_next=pg.find("#_page_next"),    pg_last=pg.find("#_page_last");
				
// alert(pg_frist.parent().html());
// alert(pg_pre.parent().html());
// alert(pg_next.parent().html());
// alert(pg_last.parent().html());
				
// alert('find: '+pg.find("input").not(pg.find("#_page_require")).length);
				pg.find("input").not(pg.find("#_page_require")).attr("disabled",false).css("color","#4F4F4F").css("cursor","pointer");
				
				pg_frist.attr('disabled',false).css("cursor","pointer");
				pg_pre.attr('disabled',false).css("cursor","pointer");
				pg_next.attr('disabled',false).css("cursor","pointer");
				pg_last.attr('disabled',false).css("cursor","pointer");
				
// alert('pg_frist: '+pg_frist.attr('disabled'));
// alert('pg_pre: '+pg_pre.attr('disabled'));
// alert('pg_next: '+pg_next.attr('disabled'));
// alert('pg_last: '+pg_last.attr('disabled'));
				
				
				if(ecs_pageconfig.pg_currentpage<=1){
// alert('currentPage index less than 1 and current:
// '+ecs_pageconfig.pg_currentpage);
					pg_frist.attr("disabled",true).css("cursor","default");
					pg_pre.attr("disabled",true).css("cursor","default");
				}
				if(ecs_pageconfig.pg_currentpage>=ecs_pageconfig.pg_totalpage){
// alert('currentPage index large than totalPage and current:
// '+ecs_pageconfig.pg_currentpage+' and totalPage:
// '+ecs_pageconfig.pg_totalpage);
					pg_next.attr("disabled",true).css("cursor","default");
					pg_last.attr("disabled",true).css("cursor","default");
				}
			});
			// 显示分页信息
			ecs_paging_info.html(funcs.setPageinfo(ecs_config.pagetype));
			
		
			// 只有一页则不显示分页标签
			if(ecs_pageconfig.pg_totalpage>1){
				funcs.pagingShow("show");
			}else{
				funcs.pagingShow("hide");
			}
		},
		
		// 显示分页信息
		setPageinfo:function(type){
			var pageinfo = "";
			if(type=="simple"){
				pageinfo = ecs_messages.simple_info;
				pageinfo= pageinfo.replace("{0}",ecs_pageconfig.pg_totalpage)
			}else{
				pageinfo = ecs_messages.info;
				pageinfo = pageinfo.replace("{0}",ecs_pageconfig.pg_total)
				pageinfo = pageinfo.replace("{1}",ecs_pageconfig.pg_currentpage)
				pageinfo = pageinfo.replace("{2}",ecs_pageconfig.pg_totalpage)
			}
			return pageinfo;
		},
		
		// 分页查找
		page_go:function(element,pageindex){
			if($(element).attr('disabled')!='disabled'){
				if(pageindex >= 1 && pageindex <= ecs_pageconfig.pg_totalpage){
					if(pageindex!=ecs_pageconfig.pg_currentpage){							
						ecs_pageconfig.pg_currentpage = pageindex;
						
						// 测试用
						testCurrentPage=pageindex;
						funcs.getData();   // 重新加载
					}
				}
			}
		},
		
		// 加载国际化资源文件
		loadMessages : function(){
			// 如果未导入JQueryI18N插件则不使用JS国际化，显示默认中文
			if(typeof($.i18n)!='undefined'){
				// 加载JS资源文件
//				$.i18n.properties({
//					    name:'common',
//					    path:$ECS_PATH+'messages/',
//					    mode:'map',
//	    				language:Common.Cookie.get('language'),// 'zh'
//					    callback: function() {
//						    ecs_messages.frist = $.i18n.prop("paging.frist");
//							ecs_messages.pre = $.i18n.prop("paging.pre");
//							ecs_messages.next = $.i18n.prop("paging.next");
//							ecs_messages.last = $.i18n.prop("paging.last");
//							ecs_messages.info = $.i18n.prop("paging.info");
//							ecs_messages.simple_info = $.i18n.prop("paging.simple_info");
//							ecs_messages.loading = $.i18n.prop("paging.loading");
//							ecs_messages.notfound = $.i18n.prop("paging.notfound");
//					    }
//				});
				
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
					    ecs_messages.frist = $.i18n.prop("paging.frist");
						ecs_messages.pre = $.i18n.prop("paging.pre");
						ecs_messages.next = $.i18n.prop("paging.next");
						ecs_messages.last = $.i18n.prop("paging.last");
						ecs_messages.info = $.i18n.prop("paging.info");
						ecs_messages.simple_info = $.i18n.prop("paging.simple_info");
						ecs_messages.loading = $.i18n.prop("paging.loading");
						ecs_messages.notfound = $.i18n.prop("paging.notfound");
					}
				});
				//2014-3-12 huzheyi
			}
			funcs.init();  // 加载完资源后初始化表格
		},
		
		// 显示隐藏分页信息
		pagingShow:function(isshow){
			var pgobj = jQuery(ecs_render).find(".__ecsgrid_paging");// #__ecsgrid_paging
			isshow=="hide"?pgobj.hide():pgobj.show();
		},
		
		// 显示隐藏table信息
		tableShow:function(isshow){
			var pgobj = jQuery(ecs_render).find("#__ecstable");
			isshow=="hide"?pgobj.hide():pgobj.show();
			
			//huzheyi 2014-05-13
			changeWidth();
		}
	}
	
	funcs.loadMessages();// 第一次进来则初始化表格信息
};

//加载国际化信息
function loadBundles() {
//Original Part
//	jQuery.i18n.properties({
//	    name:'common',// 资源文件名称
//	    path:$ECS_PATH + 'messages/',// 资源文件所在目录路径
//	    mode:'map',// 模式：变量或 Map 
//	    language:Common.Cookie.get('language') ,//从cookie获取语言
//	    cache:true,
//	    encoding: 'UTF-8',
//	    callback: function() {}
//	});
//Original Part
	
	var lang=null;
	if(langJsp!=null){
		lang=langJsp;
	}else{
		lang=Common.Cookie.get('language');
	}
	jQuery.i18n.properties({
		name : 'common',// 资源文件名称
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

//huzheyi 2014-05-13
function changeWidth(){
	var lang=null;
	if(langJsp!=null&&typeof(langJsp)!='undefined'){
		lang=langJsp;
	}else{
		lang=Common.Cookie.get('language');
	}
	if(lang.lastIndexOf('zh')>=0){
		$("#_page_choose").css("width","auto");
	}else if(lang.lastIndexOf('en')>=0){
		$("#_page_choose").css("width","auto");
	}
}
//huzheyi 2014-05-13

// 更改列宽
!function(a){a.fn.colResizer=function(b){function k(b,d){var e=a(b.target),f=b.pageX,g=e.offset(),h=g.left,i=h+e.outerWidth();return d?f<=h+c.range:f>=i-c.range}function l(a){return k(a,!0)}function m(a){return k(a,!1)}function n(b){f&&(a(b.target),a.browser.mozilla?a("body").css("-moz-user-select","none"):a(document).bind("selectstart",function(){return!1}),h=a("#"+c.sLineIdPrefix+"_left"),i=a("#"+c.sLineIdPrefix+"_right"),0===h.length&&(h=a("<div></div>"),h.css(c.resize_line_border),h.css("position","absolute"),h.css("width","0px"),h.appendTo("body"),h.attr("id",c.sLineIdPrefix+"_left"),i=h.clone(),i.appendTo("body"),i.attr("id",c.sLineIdPrefix+"_right")),h.css({top:g.offset().top,left:g.offset().left,height:a("table").innerHeight()}),i.css({top:g.offset().top,left:b.pageX,css:"col-resize",height:a("table").innerHeight()}),a(document).bind("mousemove",o),a(document).bind("mouseup",p),h.show(),i.show(),e=!0)}function o(a){e&&a.pageX-g.offset().left>c.minWidth&&(i.css("left",a.pageX),c.bDynamic&&q())}function p(){e&&(e=!1,i.hide(),h.hide(),a.browser.mozilla?a("body").css("-moz-user-select",""):a(document).unbind("selectstart"),a(document).unbind("mousemove",o),a(document).unbind("mouseup",p),q())}function q(){var a=parseInt(i.css("left"),10)-g.offset().left-g.width();g.width(g.width()+a)}var c,e,f,g,h,i,j;return a.fn.colResizer.defaults={resize_line_border:{"border-style":"solid","border-color":"#efefef","border-width":"0 1px 0 1px"},minWidth:20,range:2,bContainer:!0,bDynamic:!1,sLineIdPrefix:"table_resize_reference"},c=a.extend({},a.fn.colResizer.defaults,b),e=!1,f=!1,j=function(b){var d=c.bContainer?b.children("table"):b,h=d.find("tr:first"),i=h.find("th");i=i.length?i:h.find("td"),i.mousemove(function(b){var c=a(b.target);if(e)o(b);else if(l(b)){if(g=c.prev(),0==g.length)return;f=!0,c.css("cursor","col-resize")}else m(b)?(g=c,f=!0,c.css("cursor","col-resize")):(f=!1,c.css("cursor","default"))}),i.mousedown(function(a){n(a)})},this.each(function(){if(a.nodeName(this,"table"))if(c.bContainer){var b=a(this).wrap("<div/>").parent();j(b)}else j(a(this))})}}(jQuery);
