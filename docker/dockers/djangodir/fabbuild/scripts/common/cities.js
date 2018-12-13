var hotarea = "";
//定义地区代码
(function($) {//自定义插件 by 
	$.fn.extend({
		//城市控件
		showhotarea : function() {
			if (!$("#msgboxbody").length) {
				$("body").append("<div id=\"msgboxbody\"></div>")
			}
			var tt = $("#msgboxbody");
			if (!tt.find("div.tooltip").length) {
				if (hotarea == "") {
					var $this = $(this);
					var dt = cities;
					var htl = "";
					var htr = "";
					$.each(hotCity, function(i, n) {
						var d = n;
						if (dt[d].info7 == "China"){
							if(dt[d].info4 == 'SHA'){
								htl += '<a href="javascript:void(0)" title="' + dt[d].info1 + '" v="' + dt[d].info4 + '" v2="' + dt[d].info8 + '" id="shanghai_SHA2">' + dt[d].info1 + '</a>';
							}else if(dt[d].info4 == 'PVG'){
								htl += '<a href="javascript:void(0)" title="' + dt[d].info1 + '" v="' + dt[d].info4 + '" v2="' + dt[d].info8 + '" id="shanghai_PVG2">' + dt[d].info1 + '</a>';
							}else{
								htl += '<a href="javascript:void(0)" title="' + dt[d].info1 + '" v="' + dt[d].info4 + '" v2="' + dt[d].info8 + '">' + dt[d].info1 + '</a>';
							}
						}else{
							htr += '<a href="javascript:void(0)" title="' + dt[d].info1 + '" v="' + dt[d].info4 + '" v2="' + dt[d].info8 + '">' + dt[d].info1 + '</a>';
						}
					})
					htl = '<div class="citylist"><div class="citylistleft">&nbsp;</div><div class="citylistright">' + htl + '</div></div>';
					htr = '<div class="citylist"><div class="citylistleft">&nbsp;</div><div class="citylistright">' + htr + '</div></div>';
					var reg = [];
					var sreg = [];
					var html = [];
					reg[0] = /^[abcde]/;
					reg[1] = /^[fghij]/;
					reg[2] = /^[klmnp]/;
					reg[3] = /^[qrstu]/;
					reg[4] = /^[vwxyz]/;
					sreg[0] = "abcde";
					sreg[1] = "fghij";
					sreg[2] = "klmnp";
					sreg[3] = "qrstu";
					sreg[4] = "vwxyz";
					html[0] = "";
					html[1] = "";
					html[2] = "";
					html[3] = "";
					html[4] = "";
					var xreg = [];
					var xhtml = [];
					xreg[0] = "亚洲";
					xreg[1] = "欧洲";
					xreg[2] = "北美";
					xreg[3] = "大洋洲";
					xreg[4] = "国际";
					xhtml[0] = "";
					xhtml[1] = "";
					xhtml[2] = "";
					xhtml[3] = "";
					xhtml[4] = "";
					var xyreg = [];
					var sxyreg = [];
					var xyhtml = new Array();
					xyreg[0] = /^[abcde]/;
					xyreg[1] = /^[fghij]/;
					xyreg[2] = /^[klmnp]/;
					xyreg[3] = /^[qrstu]/;
					xyreg[4] = /^[vwxyz]/;
					sxyreg[0] = "abcde";
					sxyreg[1] = "fghij";
					sxyreg[2] = "klmnp";
					sxyreg[3] = "qrstu";
					sxyreg[4] = "vwxyz";
					for (var $a = 0; $a < 5; $a++) {
						xyhtml[$a] = new Array();
						for (var $b = 0; $b < 5; $b++) {
							xyhtml[$a][$b] = new Array();
							for (var $c = 0; $c < 26; $c++) {
								xyhtml[$a][$b][$c] = "";
							}
						}
					}
					var xxhtml = [];
					var xxyyhtml = [];
					for (var $z = 0; $z < 26; $z++) {
						xxhtml[$z] = "";
					}
					for (var $x = 0; $x < 5; $x++) {
						$.each(dt, function(i, n) {
							var d = n;
							if (d.info7 == "China" && d.info4 != "HKG" && d.info4 != "MFM") {
								if (reg[$x].exec((d.info2).toLowerCase())) {
									var letter = ((d.info2).toLowerCase()).charAt(0);
									if (reg[$x].exec(letter)) {
										var num = letterChangeNum(letter);
										if(d.info4 == 'SHA'){
											xxhtml[num] += '<a href="javascript:void(0)" title="' + d.info1 + '" v="' + d.info4 + '" v2="' + d.info8 + '" id="shanghai_SHA">' + d.info1 + '</a>';
										}else if(d.info4 == 'PVG'){
											xxhtml[num] += '<a href="javascript:void(0)" title="' + d.info1 + '" v="' + d.info4 + '" v2="' + d.info8 + '" id="shanghai_PVG">' + d.info1 + '</a>';
										}else{
											xxhtml[num] += '<a href="javascript:void(0)" title="' + d.info1 + '" v="' + d.info4 + '" v2="' + d.info8 + '">' + d.info1 + '</a>';
										}
									}
								}
							} else {
								if (d.info6 == xreg[$x]) {
									for (var $y = 0; $y < xyreg.length; $y++) {
										if (xyreg[$y].exec((d.info2).toLowerCase())) {
											var letter = ((d.info2).toLowerCase()).charAt(0);
											if (xyreg[$y].exec(letter)) {
												var num = letterChangeNum(letter);
												xyhtml[$x][$y][num] += '<a href="javascript:void(0)" title="' + d.info1 + '" v="' + d.info4 + '" v2="' + d.info8 + '">' + d.info1 + '</a>';
											}
										}
									}
								}
							}
						});

						htl += '<div class="citylist" style="display:none">';
						for (var $n = 0; $n < sreg[$x].length; $n++) {
							var num = letterChangeNum((sreg[$x].charAt($n)).toLowerCase());
							if (xxhtml[num] != "") {
								htl += '<div class="citylistleft">' + (sreg[$x].charAt($n)).toUpperCase() + '</div><div class="citylistright">' + xxhtml[num] + '</div>';
							}
						}
						htl += '</div>\r\n';

						htr += '<div class="ahottag" style="display:none;"> <div class="citylistleft">&nbsp;</div> <a href="javascript:void(0)">ABCDE</a> <a href="javascript:void(0)">FGHIJ</a> <a href="javascript:void(0)">KLMNP</a> <a href="javascript:void(0)">QRSTU</a>  <a href="javascript:void(0)">VWXYZ</a><div style="Clear:both;"></div></div>';
						for (var $y = 0; $y < xyreg.length; $y++) {
							htr += '<div class="acitylist" style="display:none">';
							for (var $m = 0; $m < sxyreg[$y].length; $m++) {
								var num = letterChangeNum((sxyreg[$y].charAt($m)).toLowerCase());
								if (xyhtml[$x][$y][num] != "") {
									htr += '<div class="citylistleft">' + (sxyreg[$y].charAt($m)).toUpperCase() + '</div><div class="citylistright">' + xyhtml[$x][$y][num] + '</div>';
								}
							}
							htr += '</div>\r\n';
						}
					}
					hotarea = '<div class="tooltip">' + '<div class="shadow">' + '<div class="frame">' + '<div class="kbox">' + '<div class="stit"> <span style="display: block; height:8px;">&nbsp;</span> <a href="javascript:void(0)" class="atag current">China</a> <a href="javascript:void(0)" class="atag"  style="width: 150px;">International/Regional</a></div>' + '<div class="uo" id="guonei">' + '<div class="hottag" > <a href="javascript:void(0)" class="currentxb">Hot City</a> <a href="javascript:void(0)">ABCDE</a> <a href="javascript:void(0)">FGHIJ</a> <a href="javascript:void(0)">KLMNP</a> <a href="javascript:void(0)">QRSTU</a> <a href="javascript:void(0)">VWXYZ</a><div style="Clear:both;"></div></div>' + '<div class="hotcity">' + htl + '</div>' + '</div>' + '<div class="uo" style="display:none;" id="guoji">' + '<div class="hottag"> <a href="javascript:void(0)" class="currentxb">Hot City</a><a href="javascript:void(0)">Asia</a><a href="javascript:void(0)">Europe</a><a href="javascript:void(0)">America</a><a href="javascript:void(0)">Oceania</a><a href="javascript:void(0)">Others</a></div>' + '<div class="hotcity">' + htr + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
				}
			}
			$(this).click(function(event) {//点击触
				var this_id = $(this).attr("id");
				tt.html(hotarea);
				if(this_id == 'hotel_fromcity' || this_id == 'hotel_area' || this_id == 'holiday_fromcity' || this_id == 'holiday_areafrom' || this_id == 'holiday_arrivecity' || this_id == 'holiday_areaarrive' || this_id == 'gedixinxi2_city' || this_id == 'gedixinxi2_area'){
					$("#shanghai_SHA").replaceWith("<a v2='undefined' v='SHA' title='上海' href='javascript:void(0)'>上海</a>");
					$("#shanghai_PVG").replaceWith(" ");
					$("#shanghai_SHA2").replaceWith("<a v2='undefined' v='SHA' title='上海' href='javascript:void(0)'>上海</a>");
					$("#shanghai_PVG2").replaceWith(" ");
				}
				var target = $(this).parent().find("input");
				var areahtml = "";
				var tip = tt.find("div.tooltip");
				var ess = target.parents(".jqmWindow");
				var position;
				var baseposi = tip.offset();
				var tx = target.position();
				var top = tx.top + target.height() + 8;
				var left = tx.left;
				//-tip.width()+target.width()+12;
				if (ess.length) {
					position = ess.offset();
					left = left + position.left - 300;
					top = top + position.top;
				}
				tip.css({
					"top" : top + "px",
					"left" : left + "px"
				});
				tip.find(".arrowt div").css("left", "5px");
				tip.show();
				tip.find("A.close").click(function() {
					tip.hide();
				})
				var stita = tip.find(".stit a");
				stita.each(function(x) {
					$(this).click(function() {
						stita.removeClass("current");
						$(this).addClass("current");
						tip.find(".uo").hide();
						tip.find(".uo").eq(x).show();
					});
				});
				tip.find(".citylist a").click(function() {
					var hideresult_city = target.parent().find(".hideresult");
					target.parent().find("input").eq(0).focus().val($(this).text());
					if (hideresult_city.attr("id").indexOf("holiday") >= 0) {
						hideresult_city.val($(this).attr("v2"));
					} else {
						hideresult_city.val($(this).attr("v"));
					}
					tip.hide();
				});
				tip.find(".acitylist a").click(function() {
					var hideresult_city = target.parent().find(".hideresult");
					target.parent().find("input").eq(0).focus().val($(this).text());
					/*target.parent().find(".hideresult").val($(this).attr("v"));*/
					if (hideresult_city.attr("id").indexOf("holiday") >= 0) {
						hideresult_city.val($(this).attr("v2"));
					} else {
						hideresult_city.val($(this).attr("v"));
					}
					tip.hide();
				});
				tip.find("#guonei .hottag a").each(function(x) {
					$(this).click(function() {
						var guonei_hot = $(this).parent().parent().find(".hotcity .citylist");
						tip.find("#guonei .hottag a").removeClass("currentxb");
						$(this).addClass("currentxb");
						guonei_hot.hide();
						guonei_hot.eq(x).show();
					});
				});
				tip.find("#guoji .hottag a").each(function(x) {
					$(this).click(function() {
						var hot_tag = $(this).parent().parent().find(".hotcity .ahottag");
						var hot_city = $(this).parent().parent().find(".hotcity .citylist");
						var hot_acity = $(this).parent().parent().find(".hotcity .acitylist");
						tip.find("#guoji .hottag a").removeClass("currentxb");
						$(this).addClass("currentxb");
						if (x == 0) {
							hot_tag.hide();
							hot_acity.hide();
							hot_city.hide();
							hot_city.eq(x).show();

						} else {
							tip.find("#guoji .ahottag a").removeClass("currentxb");
							tip.find("#guoji .ahottag").eq(x - 1).find("a").eq(0).addClass("currentxb");
							hot_tag.hide();
							hot_acity.hide();
							hot_city.hide();
							hot_tag.eq(x - 1).show();
							var num = (x - 1) * 5;
							hot_acity.eq(num).show();
						}
					});
				});
				tip.find("#guoji .ahottag a").each(function(x) {
					$(this).click(function() {
						var guoli_acity = $(this).parent().parent().find(".acitylist");
						tip.find("#guoji .ahottag a").removeClass("currentxb");
						$(this).addClass("currentxb");
						guoli_acity.hide();
						guoli_acity.eq(x).show();
					});
				});
				$(document).bind('mousedown', _checkmouse);
				$(this)._checkmouse

			});
			var _checkmouse = function(e) {
				e = e || window.event;
				e.stopPropagation();
				var el = e.srcElement || e.target;
				var cal = tt.find(".tooltip")[0];
				while (true) {
					if (el == cal) {
						return true;
					} else if (el == $this) {
						return true;
					} else if (el == document) {
						tt.find(".tooltip").hide();
						return true;
					} else {
						el = $(el).parent()[0];
					}
				}
			}
		},
	});
})(jQuery);
/*定义全局变量*/
window.cities = [];
window.hotCity = [];
$(function() {
	$("input.autocomplete").autocomplete(cities, {
		minChars : 1,
		max : 100,
		autoFill : false,
		formatItem : function(row, i, max) {
			return "<span  class=\"rt\">" + row.info1 /*+ "</span>" + "<span class=\"lt\">" + row.info1 + "</span>"*/;
		},
		formatMatch : function(row, i, max) {
			return row.name + "," + row.info1 + "," + row.info2 + "," + row.info3 + "," + row.info4;
		},
		formatResult : function(row) {
			return row.info1;
		}
	}).result(function(event, data, formatted) {
		var hidden = $(this).parent().find(".hideresult");
		if (hidden.attr("id").indexOf("holiday") >= 0) {
			hidden.val(data.info8);
		} else {
			hidden.val(data.info4);
		}

	});

	$("input.autocomplete").click(function() {
		if ($(this).val() == "") {
			$(this).val("");
		}
		$(this).addClass("current");
	}).focus(function() {
		if ($(this).val() == "") {
			$(this).val("");
		}
		$(this).addClass("current");
	}).keyup(function() {
		var citynum = $("#ac_results").find("li").length;
		if (citynum <= 0) {
			$("#ac_results").find("ul").html("<li><span style=\"color:#FF0000\">"+$.i18n.prop("common.invalidinput")+"<span></li>");//Invalid input!
			$("#ac_results").show();
		}
	}).blur(function() {
		$(this).removeClass("current");
		var cityx = $(this).parent().find(".hideresult");
		var $this = $(this);
		var dt = cities;
		if (cityx.val() == "" && $(this).val() != "") {//解决输入的时候autocomplete的问题
			$.each(dt, function(i, n) {
				var d = n;
				if ($this.val() == d.info1) {
					cityx.val(d.info4);
					return false;
				}
			});
		}
	})/*.showhotarea()*/;
});

//把字母变为数字
function letterChangeNum(letter) {
	return letter.toLowerCase().charCodeAt()-97;
}
