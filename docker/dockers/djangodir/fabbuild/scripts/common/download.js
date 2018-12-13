$(document).ready(function (){
	
	var module = "";
	if($queryData.module == "1"){
		module = "price";
	}else if($queryData.module == "2"){
		module = "policy";
	}else {
		module = "service";
	}
	
	$.imps_showLoading("");
	$.ajax({
		type : "get",
		dataType : "json",
		async : false,
		url : $ECS_PATH + "/modules/download.do?download=Y",
		data : {
			id : $queryData.id,
			module : module
		},
		complete : function(data) {
			
			if (data && data.responseText) {
				
				var json = null;
				
				try{
					json = JSON.parse(data.responseText);
				}catch(e){
					//debugger;
//					alert(e);
				}
				
				if(json != null && json.errors){
					$("#errors").html(json.errors);
					window.location.href = $BASE_PATH + "index_show.jsp";
						return ;
				}

				if (json && json.datas && json.datas[0]) {
					var obj = json.datas[0];
					
					var title = obj.title;
					var contentPath = obj.contentPath;

					var srcUrl = "/IMPS/file/" + module + "/download.do?id=" + obj.contentPath;
					var isPdf = obj.contentType == '0';
//					if (isPdf && !contentPath ) {
//						alert("Sorry, file not found!");
//					}
					
					var content = obj.content;

					// html类型
					var getContent = function() {
						if(content && content != "null"){
							return content.replace(new RegExp(/(src="\/IMPM\/file\/)/g),'src="\/IMPS/file\/');
						}
						return "";
						
					};

				

					if (isPdf) {// pdf类型
						try {
							//检查是否支持pdf
							new PDFObject({ 
								url: $ECS_PATH + "/scripts/common/simple.pdf"
							})
							;
							
							if($queryData.pdf){
								srcUrl =  $queryData.pdf;
							}
							
							//获取pdf文件的高度
							var pdfHeight = 0;
							$.ajax({
								type: "post",
								async: false,
								url: $ECS_PATH + "/modules/download.do?download=R",
								data: {"id" : obj.contentPath, "module" : module},
								success: function(data){
									if(data != null && typeof(data.pageCount) != "undefined" && data.pageCount > 0){
										pdfHeight = data.pageCount * 1320;
										$('#content').css('height',pdfHeight+'px');
									}
								}	
							});
							
							//$('#content').css('height',pdfObj.get('height'));
//							$('#content').css('height','11750px');
							
							getPdf(srcUrl);
						
						} catch (e) {
							$('#content').html("It appears you don't have Adobe Reader or PDF support in this web browser. " +
									"<br/><a href='javascript:void(0);' onclick=\"window.open('http://get.adobe.com/reader/')\" style='color:red;'>" +
									"Click here to download the Adobe Reader."
									+"</a>"
									+"<br/><a href='javascript:void(0);' onclick=\"window.open('"+srcUrl+"')\" style='color:red;'>" +
									"Click here to download the pdf."
									+"</a>"
									) ;
							$.imps_hideLoading("");
							return ;
						}
					
					} else if (content) {// 文本类型 html
						$('#content').html(getContent()) ;
					}
					
					
//					if(!isPdf){
//						$(".download_right").hide();//hide download btn
//					}else {
//						$(".download_right").hide();
//						$("#downLoadLink").attr("href",srcUrl);
//					}
					var titleTextNode = document.createTextNode(title);
					$("#title").html("");
					$("#title").append(titleTextNode);
					
					
					$("#isPdf").html(isPdf);
					
					var attachsDiv = $initAttach(module, obj.attachs);
					$("#attachs").html(attachsDiv);
					
				}
			}
			$.imps_hideLoading("");
		}
	});

});



function getPdf(src){
	var pdfObj = 
	"<object width='100%' height='100%' data='"+src+"' type='application/pdf'>"
	+"<param name='src' value='"+src+"'>"
	+"</object>";
	$("#content").html(pdfObj);
}