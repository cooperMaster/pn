	var ImpMessageBoxButtons = {
		OK : 1,
		OKCANCEL : 2,
		YES : 3,
		YESNO : 4,
		YESNOCANCEL : 5,
		
		CANCEL : 11,
		NO : 12
	};
	
	var ImpMessageBoxTips = null;
	
	if($.i18n == undefined){
		ImpMessageBoxTips = 	{
			OK : "确定",
			YES : "是",
			NO : "否",
			CANCEL : "取消"
		};
	}else{
		ImpMessageBoxTips = 	{
			OK : ($.i18n.map["ImpMsgBox.ok"] == null ? null : $.i18n.prop("ImpMsgBox.ok")) || "确定",
			YES : ($.i18n.map["ImpMsgBox.yes"] == null ? null : $.i18n.prop("ImpMsgBox.yes")) || "是",
			NO : ($.i18n.map["ImpMsgBox.no"] == null ? null : $.i18n.prop("ImpMsgBox.no")) || "否",
			CANCEL : ($.i18n.map["ImpMsgBox.cancel"] == null ? null : $.i18n.prop("ImpMsgBox.cancel")) || "取消"
		};
	}

	String.prototype._formatStr = function(){ 
		var _str = this;
		for(var i = 0; i < arguments.length; i++){
			_str = eval("_str.replace(/\\{"+ i +"\\}/ig,'" + arguments[i] + "')");
		}
		return _str;
	};
	
	var ImpMessageBoxBase = {
		containerStr : '<div id="{0}" style="display: none;">'
				+ '<div id="_ImpMsgBox_mask" class="msgBox_mask"></div>'
				+ '<div style="z-index: {1};"	class="_ImpMsgBox_dialog tab_div resetwidUI">'
				+ '<div class="impMsgBtn _ImpMsgBox_closeBtn msgBox_btn_close" impMsgBtnVal="'+ ImpMessageBoxButtons.CANCEL +'"></div>'
				+ '<table cellpadding="0" cellspacing="0" border="0" class="nt2" width="100%">'
				+ '<tr>'
				+ '<td><span class="_ImpMsgBox_content msgBox_content"></span></td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td style="height: 60px;" align="center">'
				+ '<div  class="_ImpMsgBox_BBs msgBox_btn_optons"></div>'
				+ '</td>' + '</tr>' + '</table>' + '</div>' + '</div>',

		buttonModuleStr : '<input type="button" impMsgBtnVal="{0}" class="impMsgBtn nobgbtn msgBox_btn_margin" value="{1}"/>'
			
	};

	var ImpMessageBox = function(_message, _button, _callBack, top) {
		var _mainId = new Date().getTime() + '_ImpMsgBox_container';
		var _containStr = '' + ImpMessageBoxBase.containerStr;
		if(top != null && top != ""){
			_containStr = _containStr._formatStr(_mainId, top);
		}else{
			_containStr = _containStr._formatStr(_mainId, "99999");
		}
		var _btnStr = ImpMessageBoxBase.buttonModuleStr;
		switch (_button) {
		case ImpMessageBoxButtons.OK:
			_btnStr = _btnStr._formatStr(ImpMessageBoxButtons.OK, ImpMessageBoxTips.OK);
			break;
		case ImpMessageBoxButtons.OKCANCEL:
			_btnStr = _btnStr._formatStr(ImpMessageBoxButtons.OK, ImpMessageBoxTips.OK)
					+ _btnStr._formatStr(ImpMessageBoxButtons.CANCEL, ImpMessageBoxTips.CANCEL);
			break;
		case ImpMessageBoxButtons.YES:
			_btnStr = _btnStr._formatStr(ImpMessageBoxButtons.YES, ImpMessageBoxTips.YES);
			break;
		case ImpMessageBoxButtons.YESNO:
			_btnStr = _btnStr._formatStr(ImpMessageBoxButtons.YES, ImpMessageBoxTips.YES)
					+ _btnStr._formatStr(ImpMessageBoxButtons.NO, ImpMessageBoxTips.NO);
			break;
		case ImpMessageBoxButtons.YESNOCANCEL:
			_btnStr = "<nobr>"
					+ _btnStr._formatStr(ImpMessageBoxButtons.YES, ImpMessageBoxTips.YES)
					+ _btnStr._formatStr(ImpMessageBoxButtons.NO , ImpMessageBoxTips.NO)
					+ _btnStr._formatStr(ImpMessageBoxButtons.CANCEL, ImpMessageBoxTips.CANCEL)
					+ "</nobr>";
			break;
		default:
			_btnStr = _btnStr._formatStr(ImpMessageBoxButtons.OK, ImpMessageBoxTips.OK);
			break;
		};
		$(window.top.document).find("body").append(_containStr);
//		document.write(_containStr);
		$(window.top.document).find('#' + _mainId + ' ._ImpMsgBox_content').html(_message);
		$(window.top.document).find('#' + _mainId + ' ._ImpMsgBox_BBs').html(_btnStr);
		$(window.top.document).find('#' + _mainId + ' .impMsgBtn').click({callBackFun: _callBack, containId: _mainId}, function(event){
			$(window.top.document).find('#' + _mainId).remove();
			try{
				var btnType = $(this).attr("impMsgBtnVal");
				event.data.callBackFun(btnType);
			}catch(e){}
		});
		
		this.show = (_mainId,function() {
			$(window.top.document).find('#' + _mainId).show();
		});
		
	};
	
	// new ImpMessageBox("test", ImpMessageBoxButtons.OKCANCEL,function(v){alert(v);}).show();
	
	
	