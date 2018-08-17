var DatePicker = function() {
	var splitMark=null;
	/*
	
	$func用来获得Element对象
	addEvent用来进行添加方法
	getPos用来获得控件位置
	initPicker用来进行控件初始化
	
	*/
	var $func = function(i) {
		return document.getElementById(i)
	}, addEvent = function(o, e, f) {
		/*2013-12-13*/
		$(o).bind(e,f);
		
	}, getPos = function(el) {
		for (var pos = {
			x : 0,
			y : 0
		}; el; el = el.offsetParent) {
			pos.x += el.offsetLeft;
			pos.y += el.offsetTop;
		}
		return pos;
	}

	
	var initPicker = function(n, config) {
		window[n] = this;
		Date.prototype._fd = function() {
			var d = new Date(this);
			d.setDate(1);
			return d.getDay()
		};
		Date.prototype._fc = function() {
			var d1 = new Date(this), d2 = new Date(this);
			d1.setDate(1);
			d2.setDate(1);
			d2.setMonth(d2.getMonth() + 1);
			return (d2 - d1) / 86400000;
		};closeDatePicker = function(){
			$('.ui-datepicker').remove('#'+$(this.box).attr('id'));
			$('.datePickerMaskClass').remove('#'+$(this.mask).attr('id'));
		};
		this.n = n;
		this.flag=false;
		this.showFirst=false;
		this.config = config;
		this.D = new Date;
		this.el = $func(config.inputId);
		this.el.dateid = this.n + 'DatePicker';
		this.update();
		this.bind(config);
		this.inputVal = this.el.value;
		this.check();
		this.render();
		$(this.el).attr('datepickerID',$(this.box).attr('id'));
		$(this.el).attr('maskID',$(this.mask).attr('id'));
	}
	initPicker.prototype = {
			render : function(){
					var _this = this;
					var className = _this.el.className;
					_this.el.className = className + " datebox";
			},
			validate : function(strValue) {
				var objRegExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;

				if(!objRegExp.test(strValue)) {
					return false; 
				}
				else{
					if(splitMark){
						this.splitMark=RegExp.$1;}
					
					var arrayDate = strValue.split(RegExp.$1); 
					var intDay = parseInt(arrayDate[0],10); 
					var intYear = parseInt(arrayDate[2],10); 
					var intMonth = parseInt(arrayDate[1],10); 

					if(intMonth > 12 || intMonth < 1) { 
						return false; 
					} 

					var arrayLookup = { '1' : 31,'3' : 31, '4' : 30,'5' : 31,'6' : 30,'7' : 31, 
							'8' : 31,'9' : 30,'10' : 31,'11' : 30,'12' : 31} ;

					if(arrayLookup[parseInt(arrayDate[1])] != null) { 
						if(intDay <= arrayLookup[parseInt(arrayDate[1])] && intDay != 0) 
							return true; 
					} 

					if (intMonth-2 ==0) { 
						var booLeapYear = (intYear % 4 == 0 && (intYear % 100 != 0 || intYear % 400 == 0)); 
						if( ((booLeapYear && intDay <= 29) || (!booLeapYear && intDay <=28)) && intDay !=0) 
							return true; 
					} 
				} 
				return false; 
			},
			inputVal : '',
			
		    getInputVal : function(){
		        return this.inputVal;
		    },
		    
		    
		    setInputVal : function(v){
		        this.inputVal = v;
		    },
			
		    check : function (){ 
				var objRegExp = /^\d{1,2}(\-|\/|\.)\d{1,2}\1\d{4}$/;

		    	var _this = this;
				addEvent(_this.el, 'change', function() {
					var val = _this.el.value;
						if(val != ""){
					    	if(!_this.validate(val)){//检验日期是否合法,如果非法，重置为上次合法日期
								_this.el.value = _this.inputVal;
					    	}else{
								if(splitMark){
									this.splitMark=RegExp.$1;}
								var current_date_array=_this.inputVal.split(RegExp.$1);
					    		_this.inputVal = val;
								var now_date_array=_this.inputVal.split(RegExp.$1);
								if(current_date_array.length==now_date_array.length && now_date_array.length==3){
									_this.update(now_date_array[2]-current_date_array[2],now_date_array[1]-current_date_array[1],now_date_array[0]);
								}
					    	}
						}
					    })
		    },
			update : function(y, m, d) {
			var final_year=y;
			var final_month=m;
			var final_date=null;
			var con = [], week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], D = this.D, _this = this;
			var cookie_lang = '';//Common.Cookie.get('language');
			if(cookie_lang=='zh_CN'){ 
				week = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'];
			}else if(cookie_lang=='ko_KR'){
				week = ['\uc77c','\ud654', '\uc6d4', '\uc218', '\ubaa9', '\uae08', '\ud1a0'];
			}else{
				week = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
			}
			
			fn = function(a, b) {
				if(b=='<<')
				return '<a dateid="' + _this.n
						+ 'DatePicker" class="ui-datepicker-prevyear ui-corner-all" onclick="'
						+ _this.n + '.update(' + a + ')" title="previous year"><span class="ui-icon ui-icon-circle-triangle-w">' + b + '</span></a>';
				if(b=="<")
				return '<a dateid="' + _this.n
						+ 'DatePicker" class="ui-datepicker-prev ui-corner-all" onclick="'
						+ _this.n + '.update(' + a + ')" title="previous month"><span class="ui-icon ui-icon-circle-triangle-w">' + b + '</span></a>';
				if(b==">")
				return '<a dateid="' + _this.n
						+ 'DatePicker" class="ui-datepicker-next ui-corner-all" onclick="'
						+ _this.n + '.update(' + a + ')" title="next month"><span class="ui-icon ui-icon-circle-triangle-e">' + b + '</span></a>';
				if(b==">>")
				return '<a dateid="' + _this.n
						+ 'DatePicker" class="ui-datepicker-nextyear ui-corner-all" onclick="'
						+ _this.n + '.update(' + a + ')" title="next year"><span class="ui-icon ui-icon-circle-triangle-e">' + b + '</span></a>';

			}, _html = '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">';
			y && D.setYear(D.getFullYear() + y);
			m && D.setMonth(D.getMonth() + m);
			var year = D.getFullYear(), month = D.getMonth() + 1;
			var date = null;
			if(!d){
				date=D.getDate();
			}
			else
				date=d;
			final_year = year;
			final_month = month;
			final_date = date;
					
			for (var i = 0; i < week.length; i++){
				if(i%6==0)
				con.push('<th dateid="' + this.n
						+ 'DatePicker" class="ui-datepicker-week-end">' + week[i] + '</th>');
				else
				con.push('<th dateid="' + this.n
						+ 'DatePicker" class="">' + week[i] + '</th>');
			}

			for (var i = 0; i < D._fd(); i++){
				var real_date=i+1;
				if(real_date%7==0||i%7==0)
				con.push('<td dateid="' + this.n
						+ 'DatePicker" class="ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled"> </td>');
				else
				con.push('<td dateid="' + this.n
						+ 'DatePicker" class="ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled"> </td>');
			}
			
			for (var i = 0; i < D._fc(); i++){
				var real_date=i+1;
				if(real_date%7==0||i%7==0){
					if(i!= date - 1){
				con.push('<td class="ui-datepicker-week-end" onclick="' + this.n + '.fillInput('
						+ year + ', ' + month + ', ' + (i + 1) + ',this);'+this.n+'.hide_calendar();"><a class="ui-state-default" href="#">'
						+ (i + 1) + '</a></td>');
					}else{
						con.push('<td class="ui-datepicker-week-end ui-datepicker-days-cell-over ui-datepicker-today" onclick="' + this.n + '.fillInput('
						+ year + ', ' + month + ', ' + (i + 1) + ',this);'+this.n+'.hide_calendar();"><a class="ui-state-default ui-state-highlight ui-state-hover" href="#">'
						+ (i + 1) + '</a></td>');
					}
				}
				else{
					if(i!= date -1){
				con.push('<td class="" onclick="' + this.n + '.fillInput('
						+ year + ', ' + month + ', ' + (i + 1) + ',this);'+this.n+'.hide_calendar();"><a class="ui-state-default" href="#">'
						+ (i + 1) + '</a></td>');
					}else{
						con.push('<td class="ui-datepicker-days-cell-over ui-datepicker-today" onclick="' + this.n + '.fillInput('
						+ year + ', ' + month + ', ' + (i + 1) + ',this);'+this.n+'.hide_calendar();"><a class="ui-state-default ui-state-highlight ui-state-hover" href="#">'
						+ (i + 1) + '</a></td>');
					}
				}
			}
			
			var toend = con.length % 7;
			if (toend != 0)
				for (var i = 0; i < 7 - toend; i++){
					if(i<6-toend)
					con.push('<td class="ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled"> </td>');//noborder
					else
					con.push('<td class="ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled"> </td>');
				}
				
			_html += /*'<tr class="ui-datepicker-title">' +*/ fn("-1, null, null", "<<") + fn("null, -1, null", "<")
					+ '<div dateid="' + this.n
					+ 'DatePicker" colspan=3 class="ui-datepicker-title"><span class="ui-datepicker-month">' + month + '/'
					+ date + '/' + year + '</span></div>' + fn("null, 1, null", ">")
					+ fn("1, null, null", ">>") + '</div>';
					
			_html+='<table class="ui-datepicker-calendar">';
			var record=true;
			for (var i = 0; i < con.length; i++){
				if(i==0)
				con[i]='<thead><tr>'+con[i];
				if(i==6)
				con[i]+='</tr></thead>';
				/*_html += (i == 0 || i == 7 ? '<tr>' : i % 7 == 0&& i > 7 ? '</tr><tr>' : '')
						+ con[i] + (i == con.length - 1 ? '</tr>' : '');*/
				_html += ( i % 7 == 0&& i > 7 && record? '<tr>' : i % 7 == 0&& i > 7 && !record? '</tr>' : '')
						+ con[i] + (i == con.length - 1 ? '</tr>' : '');

				if(i % 7 == 0&& i > 7)
					record=!record;
			
			!!this.box ? this.box.innerHTML = _html : this.createBox(_html);
			}

			if(y!=null||m!=null){
				var target='div#'+this.calendar_id+' table.ui-datepicker-calendar tr td a:contains("'+final_date+'")';
				//var target='div#calendarShow table.ui-datepicker-calendar tr td a:contains("'+final_date+'")';
				this.fillInput(final_year,final_month,final_date,$(target).parent()[0]);
				this.modifySize();
			}
			
			
		},
		hide_calendar: function(){
			this.hide();
			this.el.focus();
		},
		fillInput : function(y, m, d, element) {
			var s = this.config.seprator || '/';
			this.el.value = m + s + d + s + y;
			var title_value= this.el.value;
			
			this.setInputVal(this.el.value);
			
			$.each($('div#'+this.calendar_id+' .ui-datepicker-today'),function(index,indi_today){
				$(indi_today).removeClass('ui-datepicker-days-cell-over').removeClass('ui-datepicker-today');
				$(indi_today).children().first().removeClass('ui-state-highlight').removeClass('ui-state-hover');
			});
			/*$.each($('div#calendarShow .ui-datepicker-today'),function(index,indi_today){
				$(indi_today).removeClass('ui-datepicker-days-cell-over').removeClass('ui-datepicker-today');
				$(indi_today).children().first().removeClass('ui-state-highlight').removeClass('ui-state-hover');
			});*/
			
			var element_obj=$(element);
			element_obj.children().first().addClass('ui-state-highlight').addClass('ui-state-hover');
			element_obj.addClass('ui-datepicker-days-cell-over').addClass('ui-datepicker-today');
			
			$(this.box).find('.ui-datepicker-title span').html(title_value)
			//$('div#calendarShow div.ui-datepicker-title span').html(title_value);
			if(this.config.callback)
				this.config.callback();
		},
		modifySize:function(){
			var mask_obj=$(this.mask);
			var box_obj=$(this.box);
			var title_obj=$('div#'+this.calendar_id+' div.ui-datepicker-title');
			//var title_obj=$('div#calendarShow div.ui-datepicker-title');
			var calendar_obj=$('div#'+this.calendar_id+' table.ui-datepicker-calendar');
			//var calendar_obj=$('div#calendarShow table.ui-datepicker-calendar');
			
			mask_obj.css('left',getPos(this.el).x + 'px');
			box_obj.css('left',getPos(this.el).x + 'px');
			/*mask_obj.css('top',getPos(this.el).y + this.el.offsetHeight
					+ 'px');
			box_obj.css('top',getPos(this.el).y + this.el.offsetHeight
					+ 'px');*/
			mask_obj.css('width',title_obj.css('width') - 2 + 'px');
			box_obj.css('height',title_obj.css('height')+calendar_obj.css('height')- 2 + 'px');
		},
		show : function() {
			
			if(!this.showFirst){
				this.initPosition();
				this.showFirst = true;
			}else{
				this.modifySize();
			}
			
			var calendar_id='div#'+this.calendar_id;
			$(calendar_id).css('display','block');
			//var mask_id='iframe#'+this.mask_id;
			//$(mask_id).css('display','block');
		},
		hide : function() {
			
			var calendar_id='div#'+this.calendar_id;
			var mask_id='iframe#'+this.mask_id;
			$(calendar_id).css('display','none');
			$(mask_id).css('display','none');

		},
		initPosition : function(){
			var mask_obj=$(this.mask);
			var box_obj=$(this.box);
			var title_obj=$('div#'+this.calendar_id+' div.ui-datepicker-title');
			//var title_obj=$('div#calendarShow div.ui-datepicker-title');
			var calendar_obj=$('div#'+this.calendar_id+' table.ui-datepicker-calendar');
			//var calendar_obj=$('div#calendarShow table.ui-datepicker-calendar');
			
			
			mask_obj.css('left',getPos(this.el).x + 'px');
			box_obj.css('left',getPos(this.el).x + 'px');
			
			//2013-12-17
			mask_obj.css('top',getPos(this.el).y + this.el.offsetHeight
					+ 'px');
			box_obj.css('top',getPos(this.el).y + this.el.offsetHeight
					+ 'px');
			
			//2013-12-17
			var original_top=box_obj.css('top');
			var ori_top=original_top.substring(0,original_top.lastIndexOf('px'));
			//box_obj.css('top',ori_top-$(this.el).parents('.sroll').scrollTop()+'px');
			box_obj.css('top',$(this.el).offset().top+27+'px');
			
			mask_obj.css('width',title_obj.css('width') - 2 + 'px');
			box_obj.css('height',title_obj.css('height')+calendar_obj.css('height')- 2 + 'px');
		},
		bind : function() {
			var _this = this;
			addEvent(document, 'click', function(e) {
				e = e || window.event;
				var t = e.target || e.srcElement;
			})
			addEvent(_this.el, 'click', function(e) {
				this.flag=false;
				if(!this.flag){
					_this.show();
				}
			});
			addEvent(_this.box, 'mouseover', function(e) {
				//
				_this.el.onblur = function(){
				};
				$(_this.el).unbind('blur');
			});
			addEvent(_this.box, 'mouseout', function(e) {
				_this.el.onblur = function(){
					this.flag=true;
					if(this.flag){
					_this.hide();}
				}
			});
			
			/*2013-12-13*/
			addEvent(_this.el,'blur',function(e){
				this.flag=true;
				if(this.flag){
				_this.hide();}
			});
			addEvent($(_this.el).parents('.sroll'),'scroll',function(){
				var original_top=$(_this.box).css('top');
				var ori_top=original_top.substring(0,original_top.lastIndexOf('px'));
				$(_this.box).css('top',ori_top-$(_this.el).parents('.sroll').scrollTop()+'px');
				_this.hide();
				$(_this.box).css('top',$(_this.el).offset().top+27+'px');
			});
		},
		createBox : function(html) {
			var box = this.box = document.createElement('div'), mask = this.mask = document
					.createElement('iframe');
			this.calendar_id='calendarShow'+this.n;
			this.mask_id='maskShow'+this.n;
			$(box).addClass("ui-datepicker").addClass("ui-widget").addClass("ui-widget-content").addClass("ui-helper-clearfix").addClass("ui-corner-all").addClass(this.config.className || 'datepicker');
			mask.src = 'javascript:false;';
			mask.frameBorder = 0;
			box.style.cssText = 'position:absolute;display:none;z-index:9999;top:32px;left:35px';
			mask.style.cssText = 'position:absolute;display:none;z-index:9998';
			box.dateid = this.n + 'DatePicker';
			
			box.innerHTML = html;
			document.body.appendChild(box);
			document.body.appendChild(mask);
			$(box).attr('id',this.calendar_id);
			$(mask).attr('id',this.mask_id);
			//2013-12-16
			$(mask).attr('class','datePickerMaskClass');
			return box;
		}
	}
	return initPicker;
}();