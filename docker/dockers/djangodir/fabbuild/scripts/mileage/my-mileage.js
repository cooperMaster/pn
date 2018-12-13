$(function(){
	getMileage();
});

function getMileage(){
	//发送请求
	$.ajax({
		type:"POST",
		url:$ECS_PATH+"mileage/myMileageInfo.do",
//		data:{},
		dataType:'json',
		success:function(data){
			//console.info(data);
			$('#canUseMails').text(data.data.canUseMails);
			$('#hasUseMails').text(data.data.hasUseMails);
			$('#totalEasyMiles').text(data.data.totalEasyMiles);
			$('#totalMiles').text(data.data.totalMiles);
		},
		error:function(data){
			//alert('请求失败');
		}
	});
}
