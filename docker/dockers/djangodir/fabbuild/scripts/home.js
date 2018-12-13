var downloadSkyPerl=null;
var downloadFAQ=null;
var downloadTicket=null;

$().ready(function() {
	
//	getSkyPerlDownLoadPath();
	getFAQDownLoadPath();
	getTicketDownLoadPath();
	
	i18n.init("price_font");// 国际化
	i18n.init("common");// 国际化

	new FormHelper('', {
		currentIndex : 1,// 当前显示的选项卡
		formId : "priceForm",

		conditionRadioIds : [ 'query0', 'query1,#query3', 'query2' ],// 查询条件选项卡ID拼接字符串,例如#query0,#query1,#query2
		conditionRadioName : "fares",// 查询条件选项卡Radio名

		submitBtnId : "#submitBtn",// 表单提交按钮ID
		resetBtnId : "#resetBtn",// 表单重置按钮ID

		// function 默认值设置
		initDefaultValue : function() {
			$("#priceTypeDisplay").val($("#priceTypeSelect").find("li:first-child").html());
			$("#regionDisplay").val($("#regionSelect").find("li:first-child").html());
			initDestRegion();
		},
		initValidation : function() {
			$("#priceForm").validate({
				onfocusout: false,
				onkeyup: false,
				rules : {
//					destination : {
//						required : true,
//						maxlength : 30
//					},
//					region:{
//						required: true
//					},
					title : {
						required : true,
						/*maxlength : 30*///huzheyi 2013-05-9
						maxlength : 100,
						titleMaxLength : 100//huzheyi 2014-05-15
					}
				},
				messages : {
//					destination : {
//						required : i18n.prop('price.query.info_required.destination'),
//						maxlength : $.validator.format(i18n.prop('price.query.info_maxlength.destination'))
//					},
//					region:{
//						required: i18n.prop("price.query.info_required.region")
//					},
					title : {
						required : i18n.prop('price.query.info.title'),
						maxlength : $.validator.format(i18n.prop('price.query.info_maxlength.title')),
						titleMaxLength : $.validator.format(i18n.prop('price.query.info_maxlength.title'))//huzheyi 2014-05-15
					}
				}
			});
		},
		submit : function() {
			//目的地
			var val = $( "#destination").val();
			if(val == "" || val == null){
				$("#destinationValue").val(null);
			}
			var exist = false;
			if(val){
				val = $.trim(val);
				for(var i=0; i<cities.length;i++){
					if($.trim(cities[i].info1) == val 
							|| $.trim(cities[i].info2) == val		
							|| $.trim(cities[i].info3) == val		
							|| $.trim(cities[i].info4) == val		
					){//如果存在cities里
						exist = true;
						$("#destinationValue").val($.trim(cities[i].info4));
						break;
					}
				}
				if(!exist){
					$("#destinationValue").val(val);//不存在cities,将destination的值赋给destinationValue
				}
			}
			$("#priceForm").submit();
		},

		autoSubmit : false,
		extInitFunc : [new function() {
			$initSelector("#priceTypeSelect","#priceTypeDisplay","#priceType");
			$initSelector("#regionSelect","#regionDisplay","#region");
			$initSelector("#destRegionSelect","#destRegionDisplay","#destRegion",
					{handler:function(value){
						initDestRegion(value);
			}});
			}]
	}

	);

	/*var availableTags= $cities;
    $( "#destination" ).autocomplete({
 	   delay: 0,
 	   source: availableTags
    });*/

	//huzheyi 20140618
//	getPicPath('cn','theme',2,$('#homeAd1Img'),1);
//	getPicPath('cn','theme',2,$('#homeAd2Img'),2);
//	getPicPath('cn','theme',2,$('#homeAd3Img'),3);
	//huzheyi 20140618
	//huzheyi 20150306
	/*
	if(position!=null){
		param='localSign='+localSign+'&position='+position+'&pageSite='+pageSite+'&type='+type;
	}else{
		param='localSign='+localSign+'&pageSite='+pageSite+'&type='+type;
	}
	//param='localSign=cn&pageSite=theme&type=2&position=1'
	//param='localSign=cn&pageSite=theme&type=2&position=2'
	//param='localSign=cn&pageSite=theme&type=2&position=3'
	*/
	//huzheyi 20150306
});

//function getSkyPerlDownLoadPath(){
//	$.ajax({
//		url:"/IMPS/modules/commonInfo.do",
//		data:"skyPear=Y",
//		// dataType:"script",
//		Type:"POST",
//		success:function(msg){
//			downloadSkyPerl=msg;
//		},error:function(xmlHttpRequest, status){
//			alert("xmlHttpRequest.state: "+xmlHttpRequest.state);
//			alert("status: "+status);
//		}
//	});
//}

function getFAQDownLoadPath(){
//	$.ajax({
//		url:"/IMPS/modules/commonInfo.do",
//		data:"faq=Y",
//		// dataType:"script",
//		Type:"POST",
//		success:function(msg){
//			downloadFAQ=msg;
//			$("#faq").attr("href",msg);
//		},error:function(xmlHttpRequest, status){
//			alert("xmlHttpRequest.state: "+xmlHttpRequest.state);
//			alert("status: "+status);
//		}
//	});
	
//	$("#faq").attr("href",downloadPath_faq);
	$("#faq").attr("href",basePath+'/quickLinkFile/download.do?id=4');
}

function getTicketDownLoadPath(){
//	$.ajax({
//		url:"/IMPS/modules/commonInfo.do",
//		data:"ticket=Y",
//		// dataType:"script",
//		Type:"POST",
//		success:function(msg){
//			downloadTicket=msg;
//			$("#ecoc").attr("href",msg);
//		},error:function(xmlHttpRequest, status){
//			alert("xmlHttpRequest.state: "+xmlHttpRequest.state);
//			alert("status: "+status);
//		}
//	});
	
//	$("#ecoc").attr("href",downloadPath_ticket);
	$("#ecoc").attr("href",basePath+'/quickLinkFile/download.do?id=5');
}

function downloadTicketFile(){
	if(downloadTicket&&$.trim(downloadTicket)!=''){
		window.open(downloadTicket, 'Register');
	}
}

//function downloadSkyPerlFile(){
//	if(downloadSkyPerl&&$.trim(downloadSkyPerl)!=''){
//		window.open(downloadSkyPerl, 'Register');
//	}
//}

function downloadFAQFile(){
	if(downloadFAQ&&$.trim(downloadFAQ)!=''){
		window.open(downloadFAQ, 'Register');
	}
}
function initDestRegion(value){
	if(value == "region"){
		$("#priceDestinationValDiv").hide().find("input,select");
		$("#destination").attr("name",null);
		$("#destinationValue").attr("name",null);
		$("#priceRegionValDiv").show().find("input,select");
		$("#region").attr("name","region");
	}else{
		$("#priceDestinationValDiv").show("input,select");
		$("#destination").attr("name","destination");
		$("#destinationValue").attr("name","destinationValue");
		$("#priceRegionValDiv").hide().find("input,select");
		$("#region").attr("name",null);
	}
}

function getPicPath(localSign,pageSite,type,elementObj,position){
//"${basePath}/advertise/publishAdvertisePic.do?localSign=cn&pageSite=theme&type=3"//background              $('#backgroundImg')
//${basePath}/advertise/publishAdvertisePic.do?localSign=cn&position=1&pageSite=theme&type=1                  $('#loginAd1Img')
//var param='';
//if(position!=null){
//	param='localSign='+localSign+'&position='+position+'&pageSite='+pageSite+'&type='+type;
//}else{
//	param='localSign='+localSign+'&pageSite='+pageSite+'&type='+type;
//}
//
//$.ajax({
////	url:basePath+'/advertise/publishAdvertisePic.do?random='+Math.random(),
//	url:basePath+'/advertise/getPublishAdvertisePic.do?random='+Math.random(),//huzheyi 20150306
//	type:'get',
//	async:true,
//	data:param,
//	success:function(data){
//		elementObj.attr('src',data);
//	},
//	error:function(xmlHttpRequest,state){
//		alert('xmlHttpRequest.status: '+xmlHttpRequest.status+' and state: '+state);
//	}
//});
}