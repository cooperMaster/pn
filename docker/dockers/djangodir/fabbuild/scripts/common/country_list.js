function selectCountry(id) {
		id = id ? id : "country";
		defaut="<li name=''></li>";
		enddefaut="<li name=''></li>";
		$.ajax({
			url : "selectCountry.do",
			data : {
				area : ""
			},
			cache : false,
			async : false,
			type : "POST",
			complete : function(jqXHR, textStatus) {
				var result = JSON.parse(jqXHR.responseText);
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
					//per.append("<li name='"+result[i].code+"' ispostcode='"+result[i].ispostcode+"'  >"+ result[i].name + "</li>");
					per.append("<li name='"+result[i].code+"' ispostcode='"+result[i].ispostcode+"' isorgcode='"+result[i].isorgcode+"' >"+ result[i].name + "</li>");
				}
				per.append(enddefaut);
			}
			
		});
	}
