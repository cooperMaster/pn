
//查出省
function selectState(value,id) {
	id = id ? id : "statequery_DIV_INSERT_UPDATE";
	value = value ? value : "";
	defaut="<li name=''></li>";
	enddefaut="<li name=''></li>";
	$.ajax({
		url : "selectState.do",
		data : {
			postcode : value
		},
		cache : false,
		async : false,
		type : "POST",
		complete : function(jqXHR, textStatus) {
			var result = JSON.parse(jqXHR.responseText);
			var strs = new Array();
			var obj = eval("(" + jqXHR.responseText + ")");
			var per=$("#" + id).find("ul");
			var per_city=$("cityquery_DIV_INSERT_UPDATE").find("ul");
			per_city.empty();
			per_city.append(defaut);
			//$("#cityinp").val("");
			//$("#city").val("");
			if (result.length <= 0) {
				per.empty();
				per.append(defaut);
				//$("#stateinp").val("");
				//$("#state").val("");
				return;
			}
			per.empty();
			per.append(defaut);
			/*if(result.length>6){*/
			if(result.length>2){
				$("#" + id).css("height",'150px');
			}
			for ( var i = 0; i < result.length; i++) {
				per.append("<li name='"+result[i].state+"'>"+ result[i].state + "</li>");
			}
			per.append(enddefaut);
		}
	});
}

//查出州
function selectCity(value,postcode,id) {
	id = id ? id : "cityquery_DIV_INSERT_UPDATE";
	value = value ? value : "";
	defaut="<li name=''></li>";
	enddefaut="<li name=''></li>";
	$.ajax({
		url : "selectCityByState.do",
		data : {
			state : value,postcode:postcode
		},
		cache : false,
		async : false,
		type : "POST",
		complete : function(jqXHR, textStatus) {
			var result = JSON.parse(jqXHR.responseText);
			var strs = new Array();
			var obj = eval("(" + jqXHR.responseText + ")");
			var per=$("#" + id).find("ul");
			if (result.length <= 0) {
				per.empty();
				per.append(defaut);
				return;
			}
			per.empty();
			per.append(defaut);
			if(result.length>6){
				$("#" + id).css("height",'150px');
			}
			for ( var i = 0; i < result.length; i++) {
				per.append("<li name='"+result[i].suburb+"'>"+ result[i].suburb + "</li>");
			}
			per.append(enddefaut);
		}
	});
}



function seletctPostcodeByOrgcode(orgcode,id){
	defaut="<li name=''></li>";
	enddefaut="<li name=''></li>";
	var datas = {
			orgcode:orgcode
	}; 
	$.ajax({
		type : "post",
		url : "seletctPostcodeByOrgcode.do",
		data : datas,
		dataType : "json",
		success : function(result) {
			if(result===null||result===""){
			}else{
				var per=$("#" + id).find("ul");
				if (result.length <= 0) {
					per.empty();
					//per.append(defaut);
					return;
				}
				per.empty();
				per.append(defaut);
				if(result.length>6){
					$("#" + id).css("height",'150px');
				}
				for ( var i = 0; i < result.length; i++) {
					per.append("<li name='"+result[i].postcode+"' >"+ result[i].postcode+ "</li>");
				}
				per.append(enddefaut);
			}
		},
		error : function(e) {
		}
	});
}


/**
 * TODO PostCode查询省
 * @param value
 * @param id
 */
function selectStateCity(result,id) {
		id = id ? id : "cityquery_DIV_INSERT_UPDATE";
		defaut="<li name=''></li>";
		enddefaut="<li name=''></li>";
			var per=$("#" + id).find("ul");
			if (result.length <= 0) {
				per.empty();
				//per.append(defaut);
				return;
			}
			per.empty();
			per.append(defaut);
			if(result.length>6){
				$("#" + id).css("height",'150px');
			}
			for ( var i = 0; i < result.length; i++) {
				per.append("<li name='"+result[i].suburb+"'>"+ result[i].suburb + "</li>");
			}
			per.append(enddefaut);
}

/**
 * TODO PostCode查询省
 * @param value
 * @param id
 */
function selectPostCodeState(result,id) {
	id = id ? id : "statequery_DIV_INSERT_UPDATE";
	defaut="<li name=''></li>";
	enddefaut="<li name=''></li>";
			if(result.length>0){
				var per=$("#" + id).find("ul");
				var per_city=$("cityquery_DIV_INSERT_UPDATE").find("ul");
				per_city.empty();
				per_city.append(defaut);
				
				if (result.length <= 0) {
					per.empty();
					//per.append(defaut);
					return;
				}
				per.empty();
				per.append(defaut);
				if(result.length>6){
					$("#" + id).css("height",'150px');
				}
				for ( var i = 0; i < result.length; i++) {
					per.append("<li name='"+result[i].state+"'>"+ result[i].state + "</li>");
				}
				per.append(enddefaut);
			}
}
