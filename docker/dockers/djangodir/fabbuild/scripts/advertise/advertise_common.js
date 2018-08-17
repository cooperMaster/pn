function init_advertise_content(advertisePosition,type){
	$.ajax({
		url:'/IMPS/advertise/publishAdvertiseDetail.do?localSign=cn&position='+advertisePosition+'&type='+type,
		type:'post',
		asyn:true,
		success:function(data){
			if(data){
				var advertiseTitle=data.advertiseTitle;
				var advertiseContent=data.advertiseContent;
				
				$('#advertiseTitle').html(advertiseTitle);
				$('#advertiseContent').html(reconstrucContent(advertiseContent));
			}
		},
		error:function(xmlHttpRequest,state){
			alert('error function and xmlHttpRequest.status: '+xmlHttpRequest.status+' and state: '+state);
		}
	});
}

function reconstrucContent(content){
	var contentResult='';
	
	var contentList=content.split('<br/>');
	if(contentList!=null&&contentList.length>0){
		for(var index=0;index<contentList.length;index++){
			if(index==0){
				contentResult+='<p name="pic" style="text-align: left;"><span style="line-height: 1.5;">'+contentList[index]+'</span></p>';
			}else{
				contentResult+='<P>'+contentList[index]+'</P>';	
			}
		}
	}else{
		contentResult=content;
	}
	
	return contentResult;
}