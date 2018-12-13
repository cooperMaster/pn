$().ready(function() {
	i18n.init("price_font");//国际化
	
	//huzheyi 2014-05-12
	adjustFrom_to_width();
	
	var clone = function(myObj) {
		if (typeof (myObj) != 'object')
			return myObj;
		if (myObj == null)
			return myObj;

		var myNewObj = new Object();
		if (myObj instanceof Array) {
			myNewObj = new Array();
		}
		for ( var i in myObj)
			myNewObj[i] = clone(myObj[i]);

		return myNewObj;
	};
	
	//有效运价Gird配置初始化
	var validPriceGridConfig = {
	/*	queryParams	: "isValid=1",*/
		tableClass : "nt",
		oddClass : "gray",
		renderTo : "validPriceList",
		searchform : "priceForm",
		pageposition:"button",
		url : $ECS_PATH + "/modules/price.do?channel=all",
		complete : "$initDowloadList",
		columns : [ {
			headerText : "",
			dataField : "importance",
			handler : $handleImportanceFlag
		}, {
			headerText : i18n.prop('price.title'),
			dataField : "title",
			handler : $handleTitleLink
		}, {
			headerText : i18n.prop('price.sale_valid_period'),
			dataField : "saleValidDate",
			handler : {
				func : $handleDate,
				params : {
					begin: "saleValidBeginStr",
					end : "saleValidEndStr"
				}
			}
		}, {
			headerText : i18n.prop('price.travel_valid_period'),
			dataField : "travelValidDate",
			handler : {
				func : $handleDate,
				params : {
					begin: "traceValidBeginStr",//traceValidBeginStr
					end : "traceValidEndStr"//traceValidEndStr
				}
			}
		}, {
			headerText : i18n.prop('price.remark'),
			dataField : "remark",
			handler : $handleRemark
		},{
			headerText : i18n.prop('price.journey'),
			dataField : "journey",
			handler : $handleJourney,
			width:80
		},{
			headerText : i18n.prop('price.cabin'),
			dataField : "cabin",
			handler : $handleCabin,
			width:150
		}, {
			headerText : i18n.prop('price.last_update_time'),
			dataField : "lastUpdateTime",
			handler: $dateFormatChange
		}, {
			headerText : i18n.prop('price.download'),
			dataField : "contentPath",
			handler : {func: $handleDownloadLink, params : {"module" : "price"}}
		} ]

	};
	
	//无效运价Grid配置初始化
	var invalidPriceGridConfig = clone(validPriceGridConfig);
	invalidPriceGridConfig.renderTo = "invalidPriceList";
	/*invalidPriceGridConfig.queryParams	= "isValid=0";*/
	
//	alert('here');
	var validPriceGrid = new ECSGrid(validPriceGridConfig);
	var invalidPriceGrid = new ECSGrid(invalidPriceGridConfig);
	
	
	var config = {
		currentIndex : quickSearchForm.fares,// 当前显示的选项卡
		formId : "priceForm",

		conditionRadioIds : ["query0","query1","query2","query3,#query4"],// 查询条件选项卡ID拼接字符串,例如#query0,#query1,#query2
		conditionRadioName : "fares",// 查询条件选项卡Radio名

		submitBtnId : "#submitBtn",// 表单提交按钮ID
		resetBtnId : "#resetBtn",// 表单重置按钮ID

		// function 默认值设置
		initDefaultValue : function() {
			
			
			//快捷查询
			if(quickSearchForm){
//				$("#destinationValue").val(quickSearchForm.destinationValue);
				
				if(quickSearchForm.destRegion != "" && quickSearchForm.destRegion != null){
					$("#destRegionDisplay").val($("#destRegionSelect").find("li[name='"+ quickSearchForm.destRegion +"']").text());
				}
				if(quickSearchForm.priceType != "" && quickSearchForm.priceType != null){
					$("#priceTypeDisplay").val($("#priceTypeSelect").find("li[name='"+ quickSearchForm.priceType +"']").text());
				}
				//二级菜单
				if( quickSearchForm.region != "" && quickSearchForm.region != null){
					$("#destRegionDisplay").val($("#destRegionSelect").find("li[name='region']").text());
					$("#regionDisplay").val($("#regionSelect").find("li[name='"+ quickSearchForm.region +"']").text());
					initDestRegion('region');
				}
				
				
//				if(quickSearchForm.destRegionDisplay != "" &&  quickSearchForm.destRegionDisplay != null){
//					$("#destRegionDisplay").val(quickSearchForm.destRegionDisplay);
//				}
//				$("#destination").val(quickSearchForm.destination);
//				$("#priceType").val(quickSearchForm.priceType);
//				$("#priceTypeDisplay").val($("#priceTypeSelect").find("li[name='" + quickSearchForm.priceType  +  "']").text());
//				if(quickSearchForm.destRegion != ""){
//					
//				}
//				$("#priceTypeDisplay").val(quickSearchForm.priceTypeDisplay);
//				$("#title").val($("#quickSearchForm_title").val());
//				document.getElementById("title").innerHTML = quickSearchForm.title;
			}
			
			$("#saleValidEnd").val(new Date().format("MM/dd/yyyy"));
			
//			if($("#priceTypeDisplay").val() == ""){
//				$("#priceTypeDisplay").val($("#priceTypeSelect").find("li:first-child").html());//初始化运价类型默认值
//			}
//			if($("#cabinDisplay").val() == ""){
//				$("#cabinDisplay").val($("#cabinSelect").find("li:first-child").html());
//			}
//			if($("#journeyDisplay").val() == ""){
//				$("#journeyDisplay").val($("#journeySelect").find("li:first-child").html());
//			}
//			if($("#regionDisplay").val() == ""){
//				$("#regionDisplay").val($("#regionSelect").find("li:first-child").html());
//			}
		},
		
		invalids : {errMsg:i18n.prop('price.query.info.sale_valid_period'), errIds:["#saleValidBegin","#saleValidEnd"]},
		
		initValidation : function() {
			
			$("#priceForm").validate({
				onfocusout: false,
				onkeyup: false,
//				 onclick: true,
			rules : {
					//destination : {
					//	required : true,
					//	/*maxlength : 30 original*/
					//	maxlength : 100//huzheyi 2014-05-09
					//},
					//							priceType : {
					//								required : false
					//							},
//					region:{
//						required: true
//					},
					title : {
						required : true,
						/*maxlength : 30 original*/
						maxlength : 100,//huzheyi 2014-05-09
						titleMaxLength : 100
					},
					saleValidBegin : {
						required : true,
						compareDate : {
							begin : '#saleValidBegin',
							end : '#saleValidEnd'
						}
					},
					saleValidEnd : {
						required : true,
						compareDate : {
							begin : '#saleValidBegin',
							end : '#saleValidEnd'
						}
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
					//							priceType : {
					//								required : ''
					//							},
					title : {
						required : i18n.prop('price.query.info.title'),
						maxlength : $.validator.format(i18n.prop('price.query.info_maxlength.title')),
						titleMaxLength : $.validator.format(i18n.prop('price.query.info_maxlength.title'))//huzheyi 2014-05-15
					},
					saleValidBegin : {
						required : i18n.prop('price.query.info.sale_valid_begin_date'),
						compareDate : $.validator.format(i18n.prop('price.query.info.sale_valid_period'))
					},
					saleValidEnd : {
						required : i18n.prop('price.query.info.sale_valid_end_date'),
						compareDate : $.validator.format(i18n.prop('price.query.info.sale_valid_period'))
					}
				}
			});
		},
		
		submit : function(){
			
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
			
			validPriceGrid.bindData("isValid=1");
			invalidPriceGrid.bindData("isValid=0");
		},
		
		extInitFunc : [
		               //初始化运价类型下拉
		               new function() {
							$initSelector("#priceTypeSelect","#priceTypeDisplay","#priceType");
							$initSelector("#destRegionSelect","#destRegionDisplay","#destRegion",
									{handler:function(value){
										initDestRegion(value);
							}});
							$initSelector("#cabinSelect","#cabinDisplay","#priceCabin");
							$initSelector("#journeySelect","#journeyDisplay","#priceJourney");
							$initSelector("#regionSelect","#regionDisplay","#region");
							
						},
		               // 切换结果选选卡
		               new function() {
			           		$("#fare_tab .tab_title").click(function() {
			        			var num = Number($("#fare_tab .tab_title").index(this));
			        			$("#fare_tab .tab_title").removeClass("current");
			        			$(this).addClass("current");
			        			var con = $(this).parent().parent().find(".fare_content");
			        			con.hide();
			        			con.eq(num).show();
			        			if(num == 0){
				           			$("#crumbs_levleIII_current").show();
				           			$("#crumbs_levleIII_archived").hide();
			        			}else{
				           			$("#crumbs_levleIII_current").hide();
				           			$("#crumbs_levleIII_archived").show();
			        			}
			        		});
			           		if($("#price_tab_subTab").val() == "archived" ){
			           			$("#fare_tab .tab_title").eq(1).click();
			           		}else{
			           		}
		        		},
		        		new function(){
		        			initDestRegion($("#destRegion").val());
		        		}
						]

	};
	new FormHelper('', config);
	
	/*	var availableTags= $cities;
       $( "#destination" ).autocomplete({
    	   delay: 0,
    	   source: availableTags
       });*/
	
	/*$("#destination,#title,#saleValidBegin,#saleValidEnd").click(function(){
		$removeErr('#' + $(this).attr('id'));
	});*/
	
});

//huzheyi 2014-05-12
function adjustFrom_to_width(){

	var lang=null;
	if(typeof(langJsp)!='undefined' && langJsp != null){
		lang=langJsp;
	}else{
		lang=Common.Cookie.get('language');
	}

	if(lang.toLowerCase().lastIndexOf('zh_cn')>=0){
		$("#fromDate").attr("width","9%");
		$("#toDate").attr("width","9%");
	}else if(lang.toLowerCase().lastIndexOf('en')>=0){
		$("#fromDate").attr("width","4%");
		$("#toDate").attr("width","3%");
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

//>>>>>>> .r267
