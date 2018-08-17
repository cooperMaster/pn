// @create supersnake@2005-08-20

/*************************************************************
[Date]
format				格式化日期
*************************************************************/

Date.prototype.format = function(fmt){
	function __xx(n){var s = "00" + n;return s.substr(s.length-2);}
	
	var week_cn = ["日","一","二","三","四","五","六"];
	
	var tokens = {
		"yyyy"	:	"this.getFullYear()",
		"MM"	:	"__xx(this.getMonth()+1)",
		"M"		:	"this.getMonth()+1",
		"dd"	:	"__xx(this.getDate())",
		"d"		:	"this.getDate()",
		"hh"	:	"__xx(this.getHours())",
		"h"		:	"this.getHours()",
		"mm"	:	"__xx(this.getMinutes())",
		"m"		:	"this.getMinutes()",
		"ss"	:	"__xx(this.getSeconds())",
		"s"		:	"this.getSeconds()",
		"w"		:	"this.getDay()",
		"W"		:	"week_cn[this.getDay()]"
	};
	
	for(key in tokens){
		re = new RegExp(key,"g");
		fmt = fmt.replace(re,eval(tokens[key]));
	}

	return fmt;
}


Date.fromString = function(str){
	str = str.replace(/-/g,"/");
	return new Date(str);
}

function showDate(daycount)
{
	var date = new Date();
	
	var yesDate = new Date(date.getFullYear(),date.getMonth(),date.getDate()+daycount);
	
	return yesDate.getFullYear() + "-" + (yesDate.getMonth()+1) + "-" + (yesDate.getDate());
}

function getToday()
{
	var date = new Date();
	return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}

function getYestoday()
{
	return showDate(-1);
}

/**
 * 获取日期字符串，Split为日期的分隔符 <br/>
 * split  日期的分隔符；<br/>
 * daynum 在当天日期上添加的天数；<br/>
 * 
 * 示例： getDateStr('-'); 	 返回比当前日期的日期字符串，以‘-’号分配；<br/>
 * 示例： getDateStr('-',-5); 返回比当前日期前5天的日期字符串，以‘-’号分配；<br/>
 */
function getDateStr(split,daynum){
	var date = new Date();
	//如果传入了添加的天数
	if(daynum && !isNaN(daynum)){
		date.setDate(date.getDate()+daynum)
	}
	var year = date.getFullYear();
	var month = (date.getMonth()+1)<10 ? "0"+(date.getMonth()+1):(date.getMonth()+1);
	var day  = date.getDate()<10 ? "0" + date.getDate() : date.getDate() 
	if(split)
		return year+"-"+month+"-"+day;
	return year+month+day;
}

/**
 * 在传入的日期上添加i天
 */
function addday(dt,i){
	return Date.fromString(dt)+ i ;
}

function dateSub(start,end) {
	return (Date.fromString(end) - Date.fromString(start))/(1000*3600*24);
}

