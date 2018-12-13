/* created by zgw on 2017/06/12 */

//全局变量表示修改状态
var changeStatus='';
var maArr='';
var caArr='';
$(document).ready(function() {
	var priseCardMage = {};// 全局变量
	  var radioclick=1
	 $("[name='sex-one']").click(function() {//定义单选框的点击事件 suyu
        if (radioclick%2==0) {
            $(this).prop("checked",false);
        }
        radioclick++;
        var $cr = $("[name='sex-one']");
        if ($cr.is(":checked")) {
            $(".show_click").css("display", "none");
        }
        else {
            $(".show_click").css("display", "block");
        }
	})
 
 	//查找验证
	function isIdCardNum(num) {
	num = num.toUpperCase();
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。            
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		//alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
		return false;
	}
	//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
	//下面分别分析出生日期和校验位 
	var len, re;
	len = num.length;
	if (len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re);
		//检查生日日期是否正确
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2]))
			&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
			&& (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			//alert('输入的身份证号里出生日期不对！');
			return false;  
		} else {
			//将15位身份证转成18位 
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。          
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return num;
		}
	}
	if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re);
		//检查生日日期是否正确 
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2]))
			&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
			&& (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			//alert(dtmBirth.getYear());
			//alert(arrSplit[2]);
			//alert('输入的身份证号里出生日期不对！');
			return false;
		} else {
			//检验18位身份证的校验码是否正确。 
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1)) {
				//alert('18位身份证的校验码不正确！应该为：' + valnum);
				return false;
			}
			return num;
		}
	}
	return false;
}
	//非空判断
	function unthis(th){
		    var attrR=$(th).attr('readonly')||'';
		    if(attrR.length==0){
				var val = th.val().length;
				if($('.err').length){
					th.parent().find('.err').remove();		
				}
				if(val==0){
				   var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>不能为空,必填项</p>";
				   th.parent().append(html);	
				}else{
					th.parent().find('.err').remove();	
				}	
		    }
    }
	$('.link-man').on('blur',function(){
		var _this=$(this);
		unthis(_this);
	});
	$('.link-man').on('focus',function(){
		var _this=$(this);
		unthis(_this);
	});
	$('.link-man').on('onchange',function(){
		var _this=$(this);
		unthis(_this);
	});
	$('.link-man').on('keyup',function(){
		var _this=$(this);
		unthis(_this);
	});
	//手机判断
	function phoneun(th){
		var attrR=$(th).attr('readonly')||'';
		if(attrR.length==0){
			var val = th.val().length;
			var value=th.val();
			if($('.err').length){
				th.parent().find('.err').remove();	
			}
			if(val==0){
			   var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>不能为空,必填项</p>";
			   th.parent().append(html);
			}else{
				var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
			    var falg = reg.test(value) //true
				if(falg){
					th.parent().find('.err').remove();
				}else{
					var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>请输入11位手机号</p>";
					th.parent().append(html);
				}
			}	
		}
	}
	$('.phone').on('blur',function(){
		var _this=$(this);
		phoneun(_this);
	});
	$('.phone').on('focus',function(){
		var _this=$(this);
		phoneun(_this);
	});
	$('.phone').on('onchange',function(){
		var _this=$(this);
		phoneun(_this);
	});
	$('.phone').on('keyup',function(){
		var _this=$(this);
		phoneun(_this);
	});
	//身份证验证
	function idun(th){
		var attrR=$(th).attr('readonly')||'';
		if(attrR.length==0){
			var val = th.val().length;
			var value=th.val();
			if($('.err').length){
				th.parent().find('.err').remove();	
			}
			if(val==0){
			   var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>不能为空,必填项</p>";
			   th.parent().append(html);
			}else{
				var this_val=$('.id_type').val();
				if(this_val=='身份证'){
					th.attr('maxlength','18');
					var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
				    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
					if(regEn.test(value) || regCn.test(value)) {
						var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>不支持输入'-,/,#'等特殊字符</p>";
						th.parent().append(html);
					}else{
						isIdCardNum(value)
						if(isIdCardNum(value)) { 
							th.parent().find('.err').remove();
						}else{
							var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>必须是身份证号</p>";
							th.parent().append(html);
						}
					}
				}else{
					th.attr('maxlength','20');
					var regEn =/[^\w\/]/ig;
					if(regEn.test(value)) {
						var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>只能输入数字和字母</p>";
						th.parent().append(html);
					}
				}
			}	
		}
	}
	$('.id-number').on('blur',function(){
		var _this= $(this);
		idun(_this);
	});
	$('.id-number').on('focus',function(){
		var _this= $(this);
		idun(_this);
	})
	$('.id-number').on('onchange',function(){
		var _this= $(this);
		idun(_this);
	})
	$('.id-number').on('keyup',function(){
		var _this= $(this);
		idun(_this);
	})
	
	priseCardMage.loading_fn = function() {
		$(".loading").toggle();
	};
	
		
	// 查询申请流程
	priseCardMage.queryAccountTrace_fn = function() {
		priseCardMage.loading_fn();
		$.ajax({
			url: "/IMPS/companyMileage/searchAccountTrace/" + priseCardMage.settlementCode + "/trace.do?applyno=" + priseCardMage.CA_num,
			type: "post",
			data: "",
			dataType: "json",
			success: function(data) {
				
				console.log(data);
				
				priseCardMage.loading_fn();
				if (data.response) {
					
					var html = "";
					for (var i=0,len=data.response.length; i<len; i++) {
						html = html + "<tr";
						if (i % 2 != 0) {
							html = html + " class='gray-bg'"
						}
						var rust=data.response[i].message||'';
						html = html + "><td>" + (i+1) + "</td><td>"+data.response[i].name_+"</td><td>" + data.response[i].pro_username +"("+data.response[i].pro_user+")"+"</td><td>"+data.response[i].starttime+"</td><td>"+data.response[i].status+"</td><td><span style='display:block;width:200px;word-break: break-all; word-wrap:break-word;'>"+rust+"</span></td></tr>"
					}
					$(".handle-history-detail table tbody").html(html);
					$(".handle-history-detail").show().css("margin-top", -$(".handle-history-detail").outerHeight()/2);
					$(".shade").show();
				} else {
					alert(data.msg);
				}
			}
		});
	};

	// 返回操作
	priseCardMage.queryAccountTrace_num = function() {
		priseCardMage.loading_fn();
		$.ajax({
			url: "/IMPS/companyMileage/searchAccountTrace/" + $('body').attr('go') + "/trace.do?applyno=" + $('body').attr('number_m'),
			type: "post",
			data: "",
			dataType: "json",
			success: function(data) {
				
//				console.log(data);
				
				priseCardMage.loading_fn();
				if (data.response) {
					var html = "";
					var demo = "";
					var demo1 = "";
					var demo2= "";
					var demo3 = "";
					var title_text="";
					var arr=[];
					var arr1=[];
					var arr2=[];
					var arr3=[];
					for (var i=0,len=data.response.length; i<len; i++) {
							var names=data.response[i].name_||'';
							if(names=='销售单位一级审批'){
								title_text=data.response[i].message||'';
								arr.push(title_text);
								if(arr[0].length>0){
								demo='<div class="box1"><h3>'+names+'</h3><textarea name="" class="agree" readonly="readonly">'+arr[0]+'</textarea></div>';}
							}else if(names=='销售单位二级审批'){
								title_text=data.response[i].message||'';
								arr1.push(title_text);
								if(arr1[0].length>0){
								demo1='<div class="box2"><h3>'+names+'</h3><textarea name="" class="agree" readonly="readonly">'+arr1[0]+'</textarea></div>';}
							}else if(names=='总部一级审批'){
								title_text=data.response[i].message||'';
								arr2.push(title_text);
								if(arr2[0].length>0){
								demo2='<div class="box3"><h3>'+names+'</h3><textarea name="" class="agree" readonly="readonly">'+arr2[0]+'</textarea></div>';}
							}else if(names=='总部二级审批'){
								title_text=data.response[i].message||'';
								arr3.push(title_text);
								if(arr3[0].length>0){
								demo3='<div class="box4"><h3>'+names+'</h3><textarea name="" class="agree" readonly="readonly">'+arr3[0]+'</textarea></div>';}
							}else{
								
							}
							//html+='<div><h3>'+names+'</h3><textarea name="" class="agree" readonly="readonly">'+title_text+'</textarea></div>';

					}
                    //console.log(demo)
					html=demo+demo1+demo2+demo3
					$('.title_Re').html(html);
                    $('.h3_text').show();
				} else {
					alert(data.msg);
				}
			}
		});
	};
	
	// 获取结算号
	priseCardMage.getSettlement_fn = function() {
		$.ajax({
			url: "/IMPS/modules/agent/selectByAgentId.do",
			type: "post",
			data: {
				agentid: "",
				csrftoken: token
			},
			dataType: "json",
			success: function(data) {
				 console.log(data);			
				var returnValue = data.settlementcode || "";// 结算号
				$('.userid').val(data.userguid)  //userid号
				// alert($('.userid').val())
				$('.settlement-code').val(data.settlementcode);
				 $('.agent-name').val(data.agentname);
				$('.lower-agent').val(data.bindingName)        //绑定名称
				// $('.id-number').val(data.postcode);//身份证
				$('.org-name').val(data.orgname);   //销售单位
			    $('.phone').val(data.phone);  //电话
			    
				$('.link-man').val(data.lastname+data.fristname); //联系人
				var inputBgval=$('.input-bg').val(data.userType);  //证件类型
				if(inputBgval=="1"){
					$('.input-bg').val('回乡证')
				}else if(inputBgval=="2"){
					$('.input-bg').val('护照')
				}else if(inputBgval=="3"){
					$('.input-bg').val('军官证')
				}else{
					$('.input-bg').val('身份证')
				}
				
				$('.link-man,.id-number').css('background','#fff');
				$('body').attr('id_num',data.orgcode)
				$(".link-man").attr("readonly",false);
				$(".phone").attr("readonly",false);
				$(".phone").css('background','#fff');
//				$('.link-man').attr("readonly",true);
				priseCardMage.settlementCode = data.settlementcode || "";
				priseCardMage.agentname = data.agentname ||"";
				priseCardMage.postcode = data.postcode ||"";
				priseCardMage.orgname = data.orgname ||"";
				priseCardMage.phone = data.phone ||"";
				priseCardMage.linkman = data.fristname + data.lastname ||"";
				priseCardMage.userguid=data.userguid; 
				if (returnValue != "") {
					priseCardMage.getLinkman_fn(returnValue);
				}
			}
		});
	};

	// 获取联系人信息
	priseCardMage.getLinkman_fn = function(code) {
//		alert(11111)
		$.ajax({
			url: "/IMPS/companyMileage/searchCompanyApply/" + code + "/apply.do",
			// type: "psot",
			data: "",
			dataType: "json",
			success: function(data) {
				priseCardMage.loading_fn();
				if (data.response==null) {

					$(".hint, .board-title:eq(0), .board-title:eq(2), .apply-card, .apply-btn").show();
					
					return false
				}
				if (data.response) {
					$('body').attr('status',data.status);
					  $('#id').val(data.response.id)
					   $('#channelId').val(data.response.channelId)
					   $('#orgCode').val(data.response.orgCode)
					   $('#agreeJion').val(data.response.agreeJion)
					   $('#skyPearlID').val(data.response.skyPearlID)
					   $('#bindName').val(data.response.loweragent)
					   $('#agentName').val(data.response.agentName)
					   $('#process_business_ID_CA').val(data.response.process_business_ID_CA)
					   $('#branchOffice').val(data.response.branchOffice)
					   $('#userGUID').val(data.response.userGUID)
					   $('.link-man').val(data.response.linkMan)
					priseCardMage.userGUID = data.response.userGUID || "";
					priseCardMage.CA_num = data.response.process_business_ID_CA || "";
					priseCardMage.MA_num = data.response.process_business_ID_MA || "";
					priseCardMage.skyPearlID = data.response.skyPearlID || "";
					priseCardMage.idType = data.response.id_type || "";
					priseCardMage.idNum = data.response.id_number || "";
					priseCardMage.lowerAgent = data.response.bindName || "";
					priseCardMage.branchOffice = data.response.branchOffice || "";
					priseCardMage.id = data.response.id || "";
					priseCardMage.agentName = data.response.agentName || "";
					priseCardMage.linkMan = data.response.linkMan || "";
					priseCardMage.phone = data.response.phone || "";
					priseCardMage.processStatus = data.response.processStatus || "";
					$('body').attr('number_m',data.response.process_business_ID_CA);
					maArr=priseCardMage.MA_num;
					caArr=priseCardMage.CA_num;

					if ( priseCardMage.skyPearlID ==null) {
						
						$(".hint, .board-title:eq(0), .board-title:eq(2), .apply-card").show();
						
						// $("#page-content").show()
					   }
					
					if (priseCardMage.skyPearlID != "") {
						// 显示账号查看
						
						$(".board-title:eq(1),.board-title:eq(2),.card-msg, .change-btn, .handle-history-btn").show();
						$(".card-msg input:first").val(priseCardMage.skyPearlID);
						$(".precessUpdate").hide();
						$(".id-number, .certificate-type input").attr("readonly", true).removeClass("input-bg");
						$("#linkMan1,#phone1,.link-man,.id-number,.card-msg input").attr("readonly", true);
						$("#linkMan1,#phone1,.link-man,.id-number,.card-msg input").css("backgroundColor", "#f7f7f7");
						

					} else {
						// 显示申请明珠卡
						$(".hint, .board-title:eq(0), .board-title:eq(2), .apply-card").show();
						if (priseCardMage.CA_num != "") {
							// 判断是否已有申请单
							$(".progress-btn").show();
							$(".id-number, .certificate-type input").attr("readonly", true).removeClass("input-bg");
							$("#linkMan1,#phone1,.link-man,.id-number,.card-msg input").attr("readonly", true);
							$("#linkMan1,#phone1,.link-man,.id-number,.card-msg input").css("backgroundColor", "#f7f7f7");			
							$(".precessUpdate").hide();						
						} else {
							$(".apply-btn").show();
						}
					}
					$('body').attr('go',priseCardMage.settlementCode);
					$("input.settlement-code").val(priseCardMage.settlementCode);
					$("input.agent-name").val(priseCardMage.agentName);
					$("input.lower-agent").val(priseCardMage.lowerAgent);
					$("input.org-name").val(priseCardMage.branchOffice);
					//$("input.link-man").val(priseCardMage.linkMan);
					$("input.phone").val(priseCardMage.phone);
					$("input .userGUID").val(priseCardMage.userguid);
					if (priseCardMage.idType != "") {
						$("input.id-number").val(priseCardMage.idNum);
						$(".certificate-type ul li[value='" + priseCardMage.idType + "']").addClass("gray-bg");
						$(".certificate-type input").val($(".certificate-type li.gray-bg").text());
					}
					if(data.response.processStatus===0||data.response.status===1){
						//$(".change-btn").hide();
					}
					var statusData = data.status||''
					if(statusData=='4'){
						$('body').attr('what',data.response.id_number);
					}
					if(statusData=='4'||statusData.length==0){
						

					}else{
						var str=$('.id-number').val();
						var a='';
						for(var i=0;i<str.length;i++){
							if(i<str.length-4){
								a+='*';
							}else{
								 a+=str[i];
							}
						}
						var str1 = a;
					    $('.id-number').val(str1);
					}
				}
			}
		});
	};
	// 申请企业明珠卡
	// 申请企业明珠卡
	 
	priseCardMage.applyCard_fn = function() {
		var val=$('input:radio[name="sex-one"]:checked').val();
		 if(val==null){//是否选择了同意按钮   suyu
			                 $('.show_click').html("需同意加入企业里程计划才可申请明珠卡账户");
			                 return false;
			          }else{
	    $('.show_click').hide();	 
		priseCardMage.loading_fn();
		var url = priseCardMage.getParameter_fn(".apply-card ul");
		//var attr=sStorage.attachArr.split(",")
		//console.log(attr);
		url = "/IMPS/companyMileage/applyAccount/" + priseCardMage.settlementCode + "/applyca.do";
/*	    var str = $('.id-number').val();
	    
		var str1 = str.replace(/(\d+)(\d{4})/, function (x, y, z, p) {//证件号码*效果
			var i = "";
			while (i.length < y.length) { i += "*" }
			return i + z;
		})
	    $('.id-number').val(str1);*/
		var str = $('.id-number').val();
		$('.id-number').attr('go',str);
		var str = $(".id_type").val();
		var val = '';
		if(str=='身份证'){
			val = 1;
		}else if(str=='护照'){
			val = 2;
		}else if(str=='军官证'){
			val = 3;
		}else{
			val = 4;
		}
		
		$.ajax({
			url: url,
			type: "post",
			data: {
			 	userGUID: $(".userid").val(),
			 	linkMan: $(".link-man").val(),
			 	phone: $(".phone").val(),
			 	id_type:val,
			 	agreeJion:true,
			 	settlementCode: $(".settlement-code").val(),
				id_number:$('.id-number').attr('go'),
				orgCode:$('body').attr('id_num'),
			 	attachIds:attachArr.join(),
			 },
			 //data:"",
			dataType: "json",
			success: function(data) {		
				priseCardMage.loading_fn();
				if (data.response) {
					if(data.code=='000'){
						alert('提交成功')
						window.location.reload();	
					}
				} else {
					if(data.msg!='重新提交成功'){
						alert(data.msg);
					}
				}
				if(data.msg=='重新提交成功'){
					alert(data.msg);
					window.location.reload();
				}else{
					
				}
			}
		});
			 };
	};

	//校验表单是否发送ajax
	function ajaxForm(formId){
		var error=$("#"+formId+" p.error");
		console.log(error)
		for(var n=0;n<error.length;n++){
			if(error.eq(n).is(':visible')){	
				return false;
			}
		};
	}
	// 修改联系人信息
	priseCardMage.changeLinkMan_fn = function () {
		priseCardMage.loading_fn();
		/*if(!ajaxForm("agentfrom_insert_update")&&ajaxForm("agentfrom_insert_update")!=undefined){
			priseCardMage.loading_fn();
			return false;
		};*/
		

		var url = priseCardMage.getParameter_fn(".apply-card .card-msg");
		url = "/IMPS/companyMileage/modifyAccount/" + priseCardMage.settlementCode + "/applyma.do";
		
		$.ajax({	
			url: url,
			type: "post",
			data: {
				userGUID: $('.userGUID').val(),
				linkMan: $('.link-man').val(),
				phone: $('.phone').val(),
				process_business_ID_CA: $('.process_business_ID_CA').val(),
				id_type: 1,
				id: $('.id').val(),
				skyPearlID: $('.skyPearlID').val(),
				branchOffice: $('.branchOffice').val(),
				bindName: $('.bindName').val(),
				agentName: $('.agentName').val(),
				channelId: $('.channelId').val(),
				orgCode: $('.orgCode').val(),
				id_number: $('.id-number').val(),
				agreeJion: true,
				settlementCode: priseCardMage.settlementCode,
				attachIds:attachArr.join()
			},
			dataType: "json",
			success: function (data) {
				priseCardMage.loading_fn();
				if (data.code == "000") {
					window.location.reload();
				} else {
					alert(data.msg);
				}
			}
		});
	};	


	// 查看操作记录
	priseCardMage.getHandleHistory_fn = function() {
		priseCardMage.loading_fn();
		$(".board-title:last").addClass("titCurrent");
		$(".accessory").hide();
		$.ajax({
			url: "/IMPS/companyMileage/searchMAList/" + priseCardMage.settlementCode + "/listma.do",
			type: "post",
			data: "",
			dataType: "",
			success: function(data) {
				priseCardMage.loading_fn();
				if (data.response) {
					var html = "";
					for (var i=0,len=data.response.length; i<len; i++) {
						var num = data.response[i].process_business_ID_MA || "",// 申请单号
							man = data.response[i].userGUID || "",// 操作人
							time = data.response[i].start_time || "";// 操作时间

						html = html + "<tr";
						if (i % 2 != 0) {
							html = html + " class='gray-bg'";
						}
						html = html + "><td>" + (num) + "</td><td>" + data.response[i].linkMan +"("+man+")"+"</td><td>" + time + "</td><td><a href='javascript:void(0);' class='click-show'>详情</a></td></tr>"
					}
					$(".card-msg, .board-title, .change-btn, .handle-history-btn").hide();
					$(".handle-history-table tbody").html(html);
					$(".board-title:last, .return-btn, .handle-history-table").show();
				} else {
					alert(data.msg);
				}
			}
		});
	};
    
	//查询申请流程 111
    priseCardMage.queryAccountTrace=function(applyno) {
		priseCardMage.loading_fn();
		$.ajax({
			url: "/IMPS/companyMileage/searchAccountTrace/" + priseCardMage.settlementCode + "/trace.do",
			type: "post",
			data: {
				applyno:applyno
			},
			dataType: "json",
			success: function(data) {
				console.log(data);
				priseCardMage.loading_fn();
				if (data.response) {
					var html = "";
					for (var i=0,len=data.response.length; i<len; i++) {
						html = html + "<tr";
						if (i % 2 != 0) {
							html = html + " class='gray-bg'"
						}
						var rust=data.response[i].message||'';
						html = html + "><td>" + (i+1) + "</td><td>"+data.response[i].name_+"</td><td>" + data.response[i].pro_username +"("+data.response[i].pro_user+")"+"</td><td>"+data.response[i].starttime+"</td><td>"+data.response[i].status+"</td><td>"+rust+"</td></tr>"
					}
					$(".handle-history-detail table tbody").html(html);
					$(".handle-history-detail").show().css("margin-top", -$(".handle-history-detail").outerHeight()/2);
					$(".shade").show();
				} else {
					alert(data.msg);
				}
			}
		});
	};
	//点击详情
    priseCardMage.queryAccountTrace=function(applyno) {
		priseCardMage.loading_fn();
		$.ajax({
			url: "/IMPS/companyMileage/searchAccountTrace/" + priseCardMage.settlementCode + "/trace.do",
			type: "post",
			data: {
				applyno:applyno
			},
			dataType: "json",
			success: function(data) {
				console.log(data);
				
				priseCardMage.loading_fn();
				if (data.response) {
					var html = "";
					for (var i=0,len=data.response.length; i<len; i++) {
						html = html + "<tr";
						if (i % 2 != 0) {
							html = html + " class='gray-bg'"
						}
						var rust=data.response[i].message||'';
						html = html + "><td>" + (i+1) + "</td><td>"+data.response[i].name_+"</td><td>" + data.response[i].pro_username +"("+data.response[i].pro_user+")"+ "</td><td>"+data.response[i].starttime+"</td><td>"+data.response[i].status+"</td><td><span style='display:block;width:200px;word-break: break-all; word-wrap:break-word;'>"+rust+"</span></td></tr>"
					}
					$(".handle-history-detail table tbody").html(html);
					$(".handle-history-detail").show().css("margin-top", -$(".handle-history-detail").outerHeight()/2);
					$(".shade").show();
				} else {
					alert(data.msg);
				}
			}
		});
	};

	// 封装参数
	priseCardMage.getParameter_fn = function(tar) {
		var par = "";

		$(tar).find("input").each(function() {
			var inputName = $(this).attr("name"),
				inputVal = $(this).val();

			if (inputName == "id_type") {
				inputVal = $(this).parent().siblings("ul").find("li.gray-bg").attr("value");
			}

			if (inputVal) {
				par = par + "&" + inputName + "=" + inputVal;
			}
		});
		return par;
	};

	// 常用变量
	priseCardMage.settlementCode = "";// 结算号
	priseCardMage.userGUID = "";
	priseCardMage.id = "";
	priseCardMage.fristName = "";// 姓
	priseCardMage.lastName = "";// 名
	priseCardMage.linkMan = "";// 联系人
	priseCardMage.phone = "";// 电话
	priseCardMage.agentName = "";// 代理名称
	priseCardMage.lowerAgent = "";// 捆绑名称
	priseCardMage.branchOffice = "";// 销售单位
	priseCardMage.CA_num = "";// CA单号
	priseCardMage.skyPearlID = "";// 企业明珠卡号
	priseCardMage.idType = "";// 证件类型（1：身份证 ；2：护照；3：军官证；4：回乡证）
	priseCardMage.idNum = "";// 证件号码
	priseCardMage.processStatus = "";
	
  
	// 初始化
	priseCardMage.init = (function() {
		priseCardMage.getSettlement_fn();
		priseCardMage.loading_fn();
	})();

	// dom操作
	$(document).on("focus", ".certificate-type input", function() {
		// 证件类型下拉框显示

		if ($(this).hasClass("input-bg")) {
			$(this).parent().siblings("ul").show();
		}
	})
	.on("click", ".certificate-type li", function() {
		// 选择证件类型

		var thisText = $(this).text();
		var thisValue = $(this).attr('value');
		$(this).siblings().removeClass("gray-bg");
		$(this).addClass("gray-bg");
		$(this).parent().siblings("label").find("input").val(thisText);
		$('.id-number').val('')
		if(thisValue==1){
 
		}else{

		}
		//console.log($('.id-number').attr('name'))
	});

	// 证件类型下拉框隐藏
	$(".certificate-type input").keydown(function(e) {
		e = e || window.event;
		var $this = $(this);
		// 判断tab键事件
		if (e.keyCode == 9) {
			$this.parent().siblings("ul").hide();
		}
	});
	$(document).on("click", function(e) {
		e = e || window.event;
		if (e.target.tagName != "INPUT" || !$(e.target).parent().parent().hasClass("certificate-type")) {
			$(".certificate-type ul").hide();
		}
	});

	// tab切换
	$(".board-title").click(function() {
		if (!$(this).hasClass("titCurrent")) {
			var thisIndex = $(this).index();
			$(".board-title:visible").toggleClass("titCurrent");
			$(".content-main").children().hide();
			$(".content-main").children().eq(thisIndex).show();
		}
	});

	// 关闭详情弹窗
	$(".close-btn").click(function() {
		$(".shade, .handle-history-detail").removeAttr("style");
		$(".handle-history-detail table tbody").html("");
	});

	// 点击申请明珠卡提交按钮
	$(".apply-btn").click(function() {
/*		if(!ajaxForm("agentfrom_insert_update")&&ajaxForm("agentfrom_insert_update")!=undefined){
			priseCardMage.loading_fn();
			return false;
		};*/
		var n=$('.apply-card').find('.err').length;
		var num=0;
	    var attrR=$('.link-man').attr('readonly')||'';
	    if(attrR.length==0){
			var val = $('.link-man').val().length;
			if($('.err').length){
				$('.link-man').parent().find('.err').remove();		
			}
			if(val==0){
			   var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>不能为空,必填项</p>";
			   $('.link-man').parent().append(html);
			   num=1
			}else{
				$('.link-man').parent().find('.err').remove();
				num=0
			}	
	    }
	    var attrR1=$('.phone').attr('readonly')||'';
		if(attrR1.length==0){
			var val = $('.phone').val().length;
			var value=$('.phone').val();
			if($('.err').length){
				$('.phone').parent().find('.err').remove();	
			}
			if(val==0){
			   var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>不能为空,必填项</p>";
			   $('.phone').parent().append(html);
			   num=1
			}else{
				var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
			    var falg = reg.test(value) //true
				if(falg){
					$('.phone').parent().find('.err').remove();
					num=0
				}else{
					var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>必须是手机号</p>";
					$('.phone').parent().append(html);
					num=1
				}
			}	
		}
		var attrR2=$('.id-number').attr('readonly')||'';
		if(attrR2.length==0){
			var val = $('.id-number').val().length;
			var value=$('.id-number').val();
			if($('.err').length){
				$('.id-number').parent().find('.err').remove();	
			}
			if(val==0){
			   var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>不能为空,必填项</p>";
			   $('.id-number').parent().append(html);
			   num=1
			}else{
				var this_val=$('.id_type').val();
				if(this_val=='身份证'){
					$('.id-number').attr('maxlength','18');
					var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
				    regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
					if(regEn.test(value) || regCn.test(value)) {
						var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>不支持输入'-,/,#'等特殊字符</p>";
						$('.id-number').parent().append(html);
					}else{
						isIdCardNum(value)
						if(isIdCardNum(value)) { 
							$('.id-number').parent().find('.err').remove();
						}else{
							var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>必须是身份证号</p>";
							$('.id-number').parent().append(html);
						}
					}
				}else{
					$('.id-number').attr('maxlength','20');
					var regEn =/[^\w\/]/ig;
					if(regEn.test(value)) {
						var html="<p style='color:red;position: absolute;bottom: -28px;font-size: 12px;' class='err'>只能输入数字和字母</p>";
						$('.id-number').parent().append(html);
					}
				}
			}	
		}
		var u=0;
		var tboy=$('body').attr('what')||''
		if(tboy.length>0){
			if($('body').attr('what')===$('.id-number').val()){
				//console.log($('body').attr('what')+'---------------'+$('.id-number').val())
	
			}else{
				var text=$('.id_type ').val();
				if(text=='身份证'){
				    $.ajax({ 
				        type : "POST", //提交方式 
				        url : "/IMPS/companyMileage/findIdNumber.do",//路径 
				        async:false,
				        data : { 
				        	number : $('.id-number').val()
				        },//数据，这里使用的是Json格式进行传输 
				        success : function(data) {//返回数据根据结果进行相应的处理 
			                 if(data.length>0){
			                	 u=1
			                	 alert(data) 
			                 }
				        } 
				       });
				}
			}	
		}
		if(tboy==''){
			//var text=$('.id_type ').val();
			//if(text=='身份证'){
			    $.ajax({ 
			        type : "POST", //提交方式 
			        url : "/IMPS/companyMileage/findIdNumber.do",//路径 
			        async:false,
			        data : { 
			        	number : $('.id-number').val()
			        },//数据，这里使用的是Json格式进行传输 
			        success : function(data) {//返回数据根据结果进行相应的处理 
		                 if(data.length>0){
		                	 u=1
		                	 alert(data) 
		                 }
			        } 
			       });
			//}

		}
		var c=0;
		//审批人校验
	    $.ajax({ 
	        type : "POST", //提交方式 
	        url : "/IMPS/companyMileage/checkPerson.do",//路径 
	        async:false,
	        data : { 
	        	roleName : '销售单位一级审批',
	        	orgCode : $('body').attr('id_num'),
	        	settlementCode :$('.settlement-code').val()
	        },//数据，这里使用的是Json格式进行传输 
	        success : function(data) {//返回数据根据结果进行相应的处理 
                 if(data.length>1){
                	 c=1
                	 alert(data) 
                 }
	        } 
	       });
		//alert(u)
		if(u==1||c==1){
			return false;
		}
		
		if(n==0&&num==0){
			priseCardMage.applyCard_fn();	
		}
		
	});

	// 点击查询进度按钮查询申请流程信息
	$(".progress-btn").click(function() {
		priseCardMage.queryAccountTrace_fn();
	});

	// 点击操作记录按钮
	$(".handle-history-btn").click(function() {
		priseCardMage.getHandleHistory_fn();
	});

	// 点击操作记录返回按钮
	$(".return-btn").click(function() {
		$(".board-title").eq(2).show();
		$(".board-title").eq(1).addClass("titCurrent").siblings().removeClass("titCurrent");
		$(".content-main").children().hide();
		$(".content-main").children().eq(1).show();
		$(".board-title:last, .return-btn, .handle-history-table").hide();
		$(".card-msg, .board-title:eq(1), .change-btn, .handle-history-btn").show();
		$(".handle-history-table tbody").html("");
	});

	// 点击修改按钮
	$(".change-btn").click(function() {
		$(".apply-card").prepend($(".card-msg").clone());
		$(".board-title:eq(1), .card-msg, .handle-history-btn, .change-btn, .apply-card>ul:last").hide();
		$(".board-title:eq(0), .board-title:eq(2), .apply-card, .giveUp-btn, .change-submit-btn, .apply-card .card-msg").show();
		$(".apply-card .card-msg .link-man, .apply-card .card-msg .phone, .apply-card .card-msg .certificate-type input, .apply-card .card-msg .id-number").attr("readonly", false);   //.addClass("input-bg")加下拉選項
		$(".apply-card .card-msg .certificate-type").append($(".apply-card>ul:last .certificate-type ul").clone());
		changeStatus="1";
		$(".precessUpdate").show();
		$(".deleteFileHide").show();
		
		$(".board-title").eq(0).addClass("titCurrent").siblings().removeClass("titCurrent");
		$(".content-main").children().hide();
		$(".content-main").children().eq(0).show();

	});

	// 点击放弃按钮
	$(".giveUp-btn").click(function() {
		$(".board-title:eq(0), .board-title:eq(2), .apply-card, .giveUp-btn, .change-submit-btn").hide();
		$(".board-title:eq(1), .card-msg, .handle-history-btn, .change-btn, .apply-card>ul:last").show();
		$(".apply-card .card-msg .link-man, .apply-card .card-msg .phone, .apply-card .card-msg .certificate-type input, .apply-card .card-msg .id-number").attr("readonly", true).removeClass("input-bg");
		$(".apply-card>ul:first").remove();
		$(".accessory").hide();
		$(".board-title").eq(2).removeClass("titCurrent");
		$(".board-title").eq(0).addClass("titCurrent");
		changeStatus='';
		$(".deleteFileHide,.precessUpdate").hide();
		$(".board-title").eq(2).show();
		
		$(".board-title").eq(1).addClass("titCurrent").siblings().removeClass("titCurrent");
		$(".content-main").children().hide();
		$(".content-main").children().eq(1).show();

	});

	// 点击修改提交按钮
	$(".change-submit-btn").click(function() {
		priseCardMage.changeLinkMan_fn();
	});
	//点击查看详情
	$('body').delegate('.click-show','click',function(){
		var num=$(this).parents('tr').find('td').eq(0).text();
		priseCardMage.queryAccountTrace(num)
	});
	//返回
	setTimeout(function(){
		var a=$('.button-area').find('.change-submit-btn').is(":visible");
		if(!a){
			var b=$('body').attr('status');
			if(b==4){
				priseCardMage.queryAccountTrace_num();
				
				$(".progress-btn").hide();
				$(".apply-btn").show();
				$('.id_type').addClass('input-bg');
				$(".precessUpdate").show();
				$('.link-man,.phone,.id_type,.id-number').removeAttr('readonly').css('background',"#fff");
			}
		}
	},200)


});
//function count() {
//    var len =100;
//    var value = document.getElementById("link-man").value;
//    if (getStringUTFLength(value) >= len) {
//        document.getElementById("link-man").value = leftUTFString(document.getElementById("link-man").value, len);
//    }
//    
//} 
////文本框限制输入字符
//function getStringUTFLength(str) {
//    return str.replace(/[\u4E00-\u6FA5]/g, "**").length
// }
// function leftUTFString(str, len) {
//     if (getStringUTFLength(str) <= len) {
//         return str;
//     }
//     var value = str.substring(0, len);
//     while (getStringUTFLength(value) > len) {
//         value = value.substring(0, value.length - 1);
//     }
//     return value;
// }
 function strtexrt(th){
	    var th=$(th);
		var thisText = th.val(),// 获取输入的字符串
		textLen = 0,
		maxInput = thisText,
		maxText = th.attr("maxlength");

	for (var i = 1; i <= thisText.length; i++) {
		maxInput = thisText;
		textLen = maxInput.substring(0, i).replace(/[^\x00-\xff]/g, "aa").length;
		if (textLen >= maxText) {
			thisText = thisText.substring(0, i);
			break;
		}
	}
    th.val(thisText);
 }