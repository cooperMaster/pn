
//查询结果表格对象
var maintable;
var $ECS_PATH = "/IMPS/";
var title = null;
$(document).ready(function(){
	
	
//	$("#title").val(searchValue);
//	title = searchValue;
	
	//var searchValue = searchValue;
	
	//分页查询表格初始化
	initGrid();
	//防止提交
	$("#search_submit").bind("submit", function() {
		return false;
	});
	
	//分页查询点击
	$("#search_submit").click(function(){
		//title校验
		if ($("#title").val().length == 0) {
			document.getElementById('xxx_empty_length').style.display = '';
			document.getElementById('xxx_max_length').style.display = 'none';
		}
		else if ($("#title").val().length >0 && $("#title").val().length <= 30) {
			document.getElementById('xxx_empty_length').style.display = 'none';
			document.getElementById('xxx_max_length').style.display = 'none';
			$.imps_showLoading("");
			document.getElementById('xxx_empty_result').style.display = 'none';
			maintable.bindData();
		} else {
			document.getElementById('xxx_empty_length').style.display = 'none';
			document.getElementById('xxx_max_length').style.display = '';
			
		}
	});
	if(searchValue){
		document.getElementById('xxx_empty_result').style.display = 'none';
		$("#search_submit").trigger('click');
	}else{
		document.getElementById('xxx_empty_result').style.display = '';
	}
});

//分页查询初始化
function initGrid(){
	maintable = new ECSGrid({
		url:$ECS_PATH+ "stage/common/searchList.do",
		searchform:"search_value_form",
		renderTo:"ecsgrid",
		tableClass:"data_nt hr",
		headerClass:"",
		pageposition:"button",
		tableClass: "nt",
		oddClass: "gray",
		createBnExist:false,
		dataAlign:"left",
		evenClass:"lightblue",
		complete:"searchComplete",
		errorHandler:errorsHandler,
		headerHide:true,
		columns:[
		   { dataField: "title",handler:"titleHandler",width:125}
		]
	});
}

function errorsHandler(errors){
	if(errors == null || errors.length === undefined || errors.length == 0){
		return false;
	}
	for(var i = 0; i < errors.length; i++){
		//if(errors[i])
	}
}
//搜索完毕回调
function searchComplete(){
	 $.imps_hideLoading("");
}
//查询回调标题列处理
function titleHandler(row,col){
	//边框主 div
	 var border_div=$('<div></div>');
	 border_div.addClass("fare_content borde_top");
	 
	 var content_div=$('<div></div>');
	 content_div.addClass("search_content");
	 
	 
	 //包含每条搜索信息的div
	 var search_div = $('<div></div>');
	 search_div.addClass("search_div");
	 
	 //搜索出来的title div
	 var title_div = $('<div></div>');
	 title_div.addClass("search_title");
	 title_div.attr("align","left");
	/* var span1= '<a href="#" onClick="searchInfoShow(\''+ row["id"]+'\');">'+ row["title"] +'</a>';*/
	 url = $ECS_PATH + 'modules/common/download.jsp?id='+ row["id"] +"&module=" + row["type"];
	 
	 function test($1){  
		 return "<font color='red'>"+$1+"</font>";
	 }
	 var key = $("#title").val();
	 //处理正则表达式本身的特殊字符、忽略大小写、替换全部
	 var reg = new RegExp(key.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig"); 
	 //var reg=new RegExp(key, "i");
	 var str = row["title"];
	 var newstr= str.split(reg);
	 
	 var spanNode = document.createElement("div");
	 var fontNode = document.createElement("font");
	 $(fontNode).attr("color","red");
	 var textNode = document.createTextNode(key);
	 $(fontNode).append(textNode);
	 
	 $(spanNode).append(document.createTextNode(newstr[0]));
	 
	 for(var i = 1; i < newstr.length; i++){
		 $(spanNode).append(fontNode.cloneNode(true));
		 var textNode = document.createTextNode(newstr[i]);
		 $(spanNode).append(textNode);
	 }
	 
	 
	 
	 var span1 = document.createElement("a");
	 span1.href = url;
	 span1.target = "_blank";
	 span1.id = "result";
	 $(span1).append(spanNode);

//		 "<a href='"+url+"'target='_blank' id='result'>"+newstr+"</a>";
	 
	 
	 // Highlight key words. // Note the second argument. 
	
	 title_div.append(span1);
	 
	 //搜索出来的publishdate div
	 var date_div = $('<div></div>');
	 date_div.addClass("search_time");
	 date_div.attr("align","right");
	 var  span2= "<span>"+"--"+row["publishDate"]+"</span>";
	 date_div.append(span2);
	 //搜索出来的 内容
	 
	 search_div.append(title_div);
	 search_div.append(date_div);
	 content_div.append(search_div);
	 border_div.append(content_div);
	 
	 //SearchHighlight("result",title); 
	 
	 return  border_div.html();
}

/*function SearchHighlight(idVal,keyword) 
{ 
     var pucl = document.getElementById(idVal); 
     if("" == keyword) return; 
     var temp=pucl.innerHTML; 
     var htmlReg = new RegExp("\<.*?\>","i"); 
     var arrA = new Array(); 
     //替换HTML标签 
     for(var i=0;true;i++) 
     { 
         var m=htmlReg.exec(temp); 
         if(m) 
         { 
             arrA[i]=m; 
         } 
         else 
         { 
             break; 
         } 
         temp=temp.replace(m,"{[("+i+")]}"); 
     } 
     words = unescape(keyword.replace(/\+/g,' ')).split(/\s+/); 
     //替换关键字 
     for (var w=0;w<words.length;w++) 
     { 
         var r = new RegExp("("+words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&")+")","ig"); 
       temp = temp.replace(r,"<b style='color:Red;'>$1</b>"); 
     } 
     //恢复HTML标签 
     for(var i=0;i<arrA.length;i++) 
    { 
         temp=temp.replace("{[("+i+")]}",arrA[i]); 
     } 
         pucl.innerHTML=temp; 
} */
