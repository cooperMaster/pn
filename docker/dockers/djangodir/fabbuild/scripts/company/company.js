$(function(){
	// 全局变量
	var company={};
	//获取代理信息
	 
	company.getData=function() {
		$.ajax({
			url: "/IMPS/companyMileage/queryEnterpriseMileage.do",
			type: "post",
			 data: {
			    // operationTypeCode:'',
				// startDate:'',
				// endDate: '',	
			   'skyPearlID': '130001319992'
			    		
			},
			// dataType: "",
			contentType:'application/json',	
			success:function (data) {
				console.log(data);
              
				 
				 
				 
			},
			callback:function () {
			 
			}
		});
	};
	
	// 初始化
	company.init = (function () {
		company.getData();	
		// company.loading_fn();
	})();

	$(".checkBtn").click(function(){	
		
		company.getData();
		$(".shawnShow").show();
		$(".infoPop").show();
	})
})


