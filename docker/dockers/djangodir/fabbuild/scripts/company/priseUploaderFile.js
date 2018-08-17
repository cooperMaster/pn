
var $ImpRoot = "/IMPS";
var _Uploader;
var _agentEndUploader;
var _agentRecoverUploader;

//保存attachID
var attachArr=[];
var sStorage=window.localStorage;
/*containerId  //包含附件div的ID
fileNameDisplayId//添加附件的input里面的id
browseId// 添加附件按钮的id
submitId//上传按钮input里面的id
*/

// 显示attach时才初始化
function initAttachUploadFile(containerId, fileNameDisplayId, browseId, submitId){
  var updataAdd=$(".precessUpdate p div").eq(0).attr("id");
  console.log(updataAdd);
  console.log(toString.call(updataAdd))
  if(updataAdd===undefined||updataAdd.indexOf("flash")===-1){
	if($('#' + containerId + " .hasInitUploadComponent").val() == "1"){
		return ;
	}
	//附件查询
	filesSearch();
  }
  if($('#tempId').val()==""){
		function tempId() { // 随机数
	        var r =(new Date()).getTime();
	        return r;
		}  
		
		$('#tempId').val(tempId())
  }
	var tempId=$('#tempId').val();
	var amaId= $('#supply_top input[name=comeId]').val();
	var urld='';
	if(changeStatus==="1"){
		urld=$ImpRoot + "/file/companySkypearlMA/upload.do";
	}else{
		urld=$ImpRoot + "/file/companySkypearlCA/upload.do";
	}	
	$('#tempId').val(tempId);
    var Uploader = new ImpUploader({
		url :urld,//提交的url
		browse_button : browseId,
		filters: {
			//只允许上传的文件类型
 			mime_types : [
 			  { title : $.i18n.prop("attach.document"), extensions : "pdf,doc,docx,xls,xlsx,txt,jpg,gif,bmp,png,ppt,pptx,rar,zip,ceb,tif" }
 			],
			// 文件大小限制
			max_file_size : '5120kb'
		   //prevent_duplicates : true 
		},
		multipart_params : {
			//"itemNo" : tempId,
			"sid" : $.cookie('JSESSIONID'),
			"module":"companySkypearlCA",	

		},
		multipart:true
	});
	
	//var Uploader = new plupload.Uploader(settings); 
	
	// 选择文件后在文本框中显示文件名
	Uploader.bind('FilesAdded',function(uploader,files){
		console.log(uploader,files);
		var coverHtml='<span id="coverHtml" style="width:88px;height:30px;position:absolute;left:0px;top:0px;z-index:100;opacity:0;"></span>';
		for(var i = 0, len = files.length; i<len; i++){
			$('#' + fileNameDisplayId).val($('#' + fileNameDisplayId).val() + files[i].name + ";");
		};
		if(uploader.files.length>=$("#showFileTable tr").length+5){
			//提示层
			 layer.msg('最多一次只能上传5个文件');
			 $(".precessUpdate p").append(coverHtml);
             return;
		}
	});
	//提示
	/*Uploader.bind('Error', function (up, err) {
	  alert("文件上传失败,错误信息: " + err.message);
	});*/
	// 绑定上传完一个文件后触发的事件
	Uploader.bind('FileUploaded',function(uploader, file, responseObject) {
		var result = null;
		try{
			var str = responseObject.response;
			str = str.replace(/^\s*<pre[^>]*>/i, '').replace(/<\/pre>\s*$/i, '');
			result = eval('(' + str + ')');
		}catch(e){}
		
		// 上传成功
		if(result != null && typeof(result.respCode) != "undefined" && result.respCode == "0000"){
			var attachId = result.attachId;
			var fileName = result.fileName;
			var uploadName = result.uploadName;
			var uploadTime = result.uploadTime;
			var uploadUserId=result['uploadUserId'];
	
				 //任务单的id
				/*$.ajax({
			        type: "POST",
			        url: $ECS_PATH + "adjustment/addAdjustmentAttach.do", 
			        data: {
			        	attachId:attachId,
			        	amaId:tempId,
			        },
			        success: function(data) {
			        	 console.log(data)
			        }
			     
			    });*/
				
			addFileTr(fileName,uploadName,uploadTime,amaId,attachId,uploadUserId,this);//显示在表格中
			
		}
		// 上传失败
		else{
			var tips = (result != null && result.exceptionMsg != undefined && result.exceptionMsg != null && result.exceptionMsg != "") ? result.exceptionMsg : "系统内部错误";
			//提示信息
			if(window.ImpMessageBox != undefined){
				new ImpMessageBox(tips, ImpMessageBoxButtons.OK, null).show();
			}else{
				alert(tips);
			}
		}
	});
	
	

	// 绑定全部文件上传完触发的事件
	Uploader.bind('UploadComplete',function(uploader,files){
		//uploader.files=[];
		$("#coverHtml").remove();
		//启用浏览和上传按钮
		$('#' + browseId).attr("disabled", false);
		$('#' + submitId).attr("disabled", false);
		// 清空文件名显示框
		$('#' + fileNameDisplayId).val("");
	});
	
	
	
	// 绑定点击上传按钮触发的事件
	$('#' + submitId).unbind("click").click(function(){		
		if($('#' + fileNameDisplayId).val().length < 1){
			var tips ="没有可上传的文件";
			if(typeof(ImpMessageBox) != "undefined"){
				
				new ImpMessageBox(tips, ImpMessageBoxButtons.OK, null).show();
			}else{
				alert(tips);
			}
			return false;
		}
		//禁用浏览和上传按钮
		$(this).attr("disabled", true);
		$('#' + browseId).attr("disabled", true);
		// 添加要一起提交的表单参数
		if(caArr){
			tempId=caArr;
		}
		Uploader.settings.multipart_params = {
			"itemNo" : tempId,
			"sid" : $.cookie('JSESSIONID'),
			"module":"companySkypearlCA",			
		};
		
		// 开始上传
		Uploader.start();
	});
	
	// 初始化上传控件
	Uploader.init();
	$('#' + containerId + " .hasInitUploadComponent").val("1");
	//附件查询
	function filesSearch(){
		if(maArr){
			var CA_num=caArr+','+maArr;					
		}else{
			var CA_num=caArr;
		}
		$.ajax({
			url:'/IMPS/companyMileage/file/companySkypearlCA/queryList.do',
			type: "post",
			data: {
				module:"companySkypearlCA",
				itemNos:CA_num,
				locale:$.cookie('language'),
			 },
			dataType: "json",
			success: function(data) {
				var res=data;
				var tableHtml='';
				if(res.length>0){
					for(var i=0;i<res.length;i++){
						tableHtml+='<tr class="del">';
						tableHtml+='<td><a href="/IMPS/file/companySkypearlCA/directDownload.do?id='+res[i].attachId+'&itemNo="><span>'+res[i].fileName+'</span></a></td>';
						tableHtml+='<td>'+res[i].creatorName+'('+res[i].creatorId+')</td>';
						tableHtml+='<td>'+res[i].createTime+'</td>';
						//tableHtml+='<td><a href="/IMPS/file/companySkypearlCA/download.do?id='+res[i].attachId+'&itemNo="><span>下载</span></a>';
						if($('body').attr('status')==="4"){
							tableHtml+='<td><span class="deleteFileHide" onclick=deleteFile("'+res[i].attachId+'","1",this)>删除</span></td></tr>'
						}
						
					}
					$('#showFileTable').append(tableHtml);
				}									
			}
		});
	}
}



$(function() {
	$("form").bind("submit", function() {
		return false;
	});
	
	$(".tab_div").each(function(){
		var $tab_ul = $(this).find("ul.tabs")
		if($tab_ul.length > 0){
			var $tabs = $tab_ul.find("li");
			var $tabContents = $(this).find(".tabContent");
			if ($tabs.length == 0) return;
			$tabs.each(function(i) {
				$(this).click(function() {
					var onShow = $(this).attr("onShow");
					if(onShow != null){
						eval(onShow);
					}
				});
			});
		}
	});

});



/**
 * TODO 删除附件
 * 
 * @param path
 */



function deleteFile(id,itemNo,_this) {
	var urld="";
	var idArr=[];
	/*if($('#RzTz').val()=='Rz'){ 	
		urld=$ImpRoot + "/file/enterpriseMileage/delete.do";
	}else if($('#RzTz').val()=='Tz' || $('#RzTz').val()==""){
				
	}*/
	if(changeStatus==="1"){//判断是否是修改状态
		urld=$ImpRoot + "/file/companySkypearlMA/deleteFiles.do";
	}else{
		urld=$ImpRoot + "/file/companySkypearlCA/deleteFiles.do";
	}
	new ImpMessageBox("确认删除文件", ImpMessageBoxButtons.OKCANCEL,function(choice){
		if(choice == ImpMessageBoxButtons.OK){			
			if(itemNo==="1"){
				console.log("页面已删除");
				idArr.push(id);
				$(_this).parents('.del').css('display','none');  //删除
				callDeleteFileRepeat(idArr, itemNo,urld,_this);
			}else{
				callDeleteFile(id, itemNo,urld,_this);
			}			
		}
	}).show();
	
}
function callDeleteFileRepeat(idArr, itemNo,urld,_this){
	$(".apply-btn").click(function(){
		callDeleteFile(idArr, itemNo, urld,_this);
	})
}
function callDeleteFile(attachId, itemNo, urld,_this){
	var upJson={};
	if(toString.call(attachId)==="[object Array]"){
		upJson={"attachIds":attachId.join(),"itemNo":caArr}
	}else{
		upJson={"attachIds":attachId,"itemNo":caArr}
	}
	$.ajax({
		type : "post",
		url :  urld,
		data : upJson,
		dataType : "json",
		success : function(result) {
			var attachArrRemove=[];
			for(var i=0;i<attachArr.length;i++){
				if(attachArr[i]!=attachId){
					attachArrRemove.push(attachArr[i]);
				}
			}
			attachArr=attachArrRemove;
			if(result!= null){
				if(typeof(result.respCode) != "undefined" && result.respCode == "0000"){
					$(_this).parents('.del').css('display','none');  //删除
					return ;
				}else if(typeof(result.exceptionMsg) != "undefined"){
					new ImpMessageBox(result.exceptionMsg, ImpMessageBoxButtons.OK, function(choice){}).show();
					return ;
				}
				
			}else{
			
			}
			new ImpMessageBox("Inter server error.", ImpMessageBoxButtons.OK, function(choice){}).show();
		},
		error : function(e) {
			if (confirm(i18n.prop("agent.confirm"))) {
			}
		}
	});
}



function showApplytimenum(time){ //时间处理
	var tag = time;
	if(tag==null){
		return "";
	}
	var newDate = new Date(tag)
	var date= newDate.format('yyyy-MM-dd h:m:s')

	return date;
}

//在表格中显示刚上传的文件
function addFileTr(fileName,uploadName,uploadTime,amaId,attachId,uploadUserId){
		var showHtml='<tr class="del">';
		if(changeStatus==="1"){
			showHtml+='<td><a href="/IMPS/file/companySkypearlMA/directDownload.do?id='+attachId+'&itemNo='+amaId+'"><span>'+fileName+'</span></a></td>';
		}else{
			showHtml+='<td><a href="/IMPS/file/companySkypearlCA/directDownload.do?id='+attachId+'&itemNo='+amaId+'"><span>'+fileName+'</span></a></td>';
		}
		showHtml+='<td>'+uploadName+'('+uploadUserId+')</td>';
		showHtml+='<td>'+uploadTime+'</td>';
		if(changeStatus==="1"){
			showHtml+='<td><span class="deleteFileHide" onclick=deleteFile("'+attachId+'","'+amaId+'",this)>删除</span></td></tr>'
		}else{
			showHtml+='<td><span class="deleteFileHide" onclick=deleteFile("'+attachId+'","'+amaId+'",this)>删除</span></td></tr>'
		}
		
	    $('#showFileTable').prepend(showHtml);
	    //h5存储attachId，做提交用
	    attachArr.push(attachId);
	    //console.log(attr); //输出1,2,3
}
