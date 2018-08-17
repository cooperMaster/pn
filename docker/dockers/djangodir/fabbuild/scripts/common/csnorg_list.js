function selectArea(id) {
		id = id ? id : "areaquery_DIV";
		defaut="<li name=''></li>";
		enddefaut="<li name=''></li>";
		$.ajax({
			url : "selectArea.do",
			data : {
				area : ""
			},
			cache : false,
			async : false,
			type : "POST",
			complete : function(jqXHR, textStatus) {
				var result = JSON.parse(jqXHR.responseText);
				//var strs = new Array();
				//var obj = eval("(" + jqXHR.responseText + ")");
				if (result.length <= 0) {
					return;
				}
				var per=$("#" + id).find("ul");
				per.empty();
				per.append(defaut);
				if(result.length>6){
					$("#" + id).css("height",'150px');
				}
				for ( var i = 0; i < result.length; i++) {
					per.append("<li name='"+result[i].area+"'>"+ result[i].area + "</li>");
				}
			}
		});
	}



function selectOrgName(id) {
	id = id ? id : "orgcodequery_DIV";
	defaut="<li name=''></li>";
	enddefaut="<li name=''></li>";
	$.ajax({
		url : "selectOrgName.do",
		data : {
			area : ""
		},
		cache : false,
		async : false,
		type : "POST",
		complete : function(jqXHR, textStatus) {
			var result = JSON.parse(jqXHR.responseText);
			//var strs = new Array();
			//var obj = eval("(" + jqXHR.responseText + ")");
			if (result.length <= 0) {
				return;
			}
			var per=$("#" + id).find("ul");
			per.empty();
			per.append(defaut);
			if(result.length>6){
				$("#" + id).css("height",'150px');
			}
			for ( var i = 0; i < result.length; i++) {
				per.append("<li name='"+result[i].orgcode+"'>"+ result[i].orgname + "</a></li>");
			}
			per.append(enddefaut);
		}
	});
}


function selectAreaOrgName(value,id) {
	id = id ? id : "orgcodequery_DIV";
	value = value ? value : "澳新";
	defaut="<li name=''></li>";
	enddefaut="<li name=''></li>";
	$.ajax({
		url : "selectAreaOrgName.do",
		data : {
			area : value
		},
		cache : false,
		async : false,
		type : "POST",
		complete : function(jqXHR, textStatus) {
			var result = JSON.parse(jqXHR.responseText);
			//var strs = new Array();
			///var obj = eval("(" + jqXHR.responseText + ")");
			if (result.length <= 0) {
				return;
			}
			
			var per=$("#" + id).find("ul");
			per.empty();
			per.append(defaut);
			if(result.length>6){
				$("#" + id).css("height",'150px');
			}
			for ( var i = 0; i < result.length; i++) {
				per.append("<li name='"+result[i].orgcode+"'>"+ result[i].orgname + "</a></li>");
			}
		}
	});
}