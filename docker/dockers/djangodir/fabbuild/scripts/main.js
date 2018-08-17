$(function(){
	//导航*轻松里程计划下拉菜单
	$(".qslclj").hover(
		function(){
			$(this).children("ul").stop(true).slideDown().css({
				"background":"#fff",
				"text-align":"left",
				"border":"1px solid #ddd"
				});
		},
		function(){
			$(this).children("ul").stop(true).slideUp();
		}
	);
	//
	$(".checkbox-moreinfo").bind("change",function(){
		if(!$(this).is(":checked")){
			$('.agreeContent').hide();
			$(".moreinfo").hide();
			$('#skyPearlId').attr('readonly',true);
			$('#signInId').attr('readonly',true);
			$('#birthday').attr('readonly',true);
		}else{
//			$(this).attr('disabled',true);
			$('.agreeContent').show();
			$(".moreinfo").show();
			$('#skyPearlId').attr('readonly',false);
			$('#signInId').attr('readonly',false);
			$('#birthday').attr('readonly',false);
			
		}
	});
	//左侧栏导航鼠标经过改变背景
	var index = $(".nav-second li.current").index();

	$(".nav-second li").bind("mouseover",function(){
		$(this).addClass("current").siblings().removeClass("current");
	});
	$(".nav-second li").bind("mouseout",function(){
		$(".nav-second li").eq(index).addClass("current").siblings().removeClass("current");
	});


	//select下拉选择切换后对表格项预筛选
	$("#state").change(function(){
		var state = $(this).val();
		if(state == "accumulated"){
			$(".not-accumulated").closest("tr").hide();
			$(".accumulated").closest("tr").show();
		}else if(state == "not-accumulated"){
			$(".accumulated").closest("tr").hide();
			$(".not-accumulated").closest("tr").show();
		}else if(state == "all"){
			$(".accumulated").closest("tr").show();
			$(".not-accumulated").closest("tr").show();
		}
	});

})




