/**
 * Simple packaging of Plupload
 */

	var $ECS_PATH = "/IMPS/";
	
	/**
	 * Uploader 其它参数见plupload.dev.js, 额外添加的参数：
	 * @constructor
	 * @param {boolean} [settings.show_errors = true] 显示错误信息
	 * @param {boolean} [settings.remove_before_selection = true] 显示错误信息
	 */
	var ImpUploader = function(settings){
		var _defaultSettings = {
			browse_button : 'upload_file_browse',
			flash_swf_url : $ECS_PATH + 'scripts/base/plupload/Moxie.swf',
			filters: {
				  mime_types : [ //只允许上传的文件类型
// 				    { title : "Text Documents(*.txt)", extensions : "txt" }, 
// 				    { title : "Adobe Acrobat Documents(*.pdf)", extensions : "pdf" },
// 				    { title : "Office Documents(*.doc;*docx;*.xls;*.xlsx)", extensions : "doc,docx,xls,xlsx" },
				    { title : "All Documents(*.*)", extensions : "*" }
				  ],
				  max_file_size : '5120kb', 
				  prevent_duplicates : true 
			},
//			container: "upload_file_container",
			runtimes:"flash,html4,html5",
			//file_data_name: 'multipartFile',
			multi_selection : false,
			multi_files : false,
			//extra params
			show_errors : true,
			remove_before_selection : true
		};
		settings =$.extend({},_defaultSettings, settings);
		
		var uploader = new plupload.Uploader(settings);
		
		if(!settings.remove_before_selection){
			uploader.bind('Browse',function(uploader){
				if(!settings.multi_files){
					// 选择文件前把queue中的文件去掉
					var files = uploader.files;
					for(var i = 0; i < uploader.files.length; i++){
						uploader.removeFile(files[i]);
					}
				}
			});
		}
	
		if(settings.show_errors){
			uploader.bind('Error',function(uploader,errObject){
				if(typeof(ImpMessageBox) != "undefined"){
					if(errObject.message.indexOf('size')!=-1){
						new ImpMessageBox("附件大小不能超过5M", ImpMessageBoxButtons.OK, null).show();
						return false;
					}
					new ImpMessageBox(errObject.message, ImpMessageBoxButtons.OK, null).show();
				}else{
					alert(errObject.message);
				}
			});
		}

		//上传文件后
		uploader.bind('FileUploaded',function(uploader,file,responseObject){
			var status = responseObject.status;
			switch (status) {
			case 200 : 
				break;
				
			case 302 : 
				var tips = "会话已过时。页面将会跳转到登录页面，请重新登录。";
				if($.i18n != undefined){
					tips = ($.i18n.map["ecsgrid.timeout"] == null ? null : $.i18n.prop("ecsgrid.timeout")) || tips;
				}
				if(typeof(ImpMessageBox) != "undefined"){
					new ImpMessageBox(tips, ImpMessageBoxButtons.OKCANCEL,
					function(result) {
						if (result == ImpMessageBoxButtons.OK)
						window.location.href = $ECS_PATH;
					},"100000").show();
				} else {
					if (confirm(tips)) {
						window.location.href = $ECS_PATH;
					}
				}
				break;

				case 500:
					var tips = "系统错误，请稍后重试或联系系统管理员";
					if($.i18n != undefined){
						tips = ($.i18n.map["system.error"] == null ? null : $.i18n.prop("system.error")) || tips;
					}
					if(typeof(ImpMessageBox) != "undefined"){
						new ImpMessageBox(tips, ImpMessageBoxButtons.OK, null, "100000").show();
					} else {
						alert(tisp);
				
					}
					break;

				default:
					
				}
			});

			return uploader;

		
	};