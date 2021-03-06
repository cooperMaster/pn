(function(){  

	var ua=navigator.userAgent.toLowerCase();  

	var is=(ua.match(/\b(chrome|opera|safari|msie|firefox)\b/) || ['','mozilla'])[1];  

	var r='(?:'+is+'|version)[\\/: ]([\\d.]+)';  

	var v=(ua.match(new RegExp(r)) ||[])[1];  

	jQuery.browser.is=is;  

	jQuery.browser.ver=v;  

	jQuery.browser[is]=true;  

})(); 

(function (jQuery){

/*

 * jQuery Plugin - Messager

 * Author: corrie	Mail: corrie@sina.com	Homepage: www.corrie.net.cn

 * Copyright (c) 2008 corrie.net.cn

 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]

 *

 * $Date: 2008-12-26 

 * $Vesion: 1.4

 @ how to use and example: Please Open demo.html

 */

	this.version = '@1.3';

	this.layer = {'width' : 239, 'height': 168};

	this.title = "额度预警";

	this.time = 4000;

	this.anims = {'type' : 'slide', 'speed' : 600};
	this.timer1 = null;

	

	this.inits = function(title, text){

		if($("#message").is("div")){ return; }

		$(document.body).prepend('<div id="message" style="z-index:100;width:'+this.layer.width+'px;height:'+this.layer.height+'px;position:absolute; display:none; background:url(../../images/messager.png) no-repeat; bottom:0; right:0; overflow:hidden;"><div style="border-bottom:none;width:100%;height:25px;font-size:12px;overflow:hidden;color:#1f336b;"><span id="message_title" style="float:left;padding:6px 0 0 10px;width:200px;line-height:auto;color:#306898;font-size:17px;text-align:left;cursor:pointer;overflow:hidden;"><b>'+title+'</b></span><span id="message_close" style="float:right;padding:6px 5px 5px 0;width:16px;line-height:auto;color:#306898;font-size:17px;text-align:center;cursor:pointer;overflow:hidden;">x</span><div style="padding:8px 0 5px 5px;line-height:18px;text-align:left;font-size:16px;overflow:hidden;"></div><div style="clear:both;"></div></div> <div style="padding-bottom:5px;border-top:none;width:100%;height:auto;font-size:12px;"><div id="message_content" style="margin:0 5px 0 5px;padding:10px 0 10px 5px;font-size:12px;width:'+(this.layer.width-17)+'px;height:'+(this.layer.height-50)+'px;color:#1f336b;text-align:left;overflow:hidden; font-size:16px;"><div style="padding-top:40px;padding-left:70px;">'+text+'</div></div></div></div>');

		$("#message_close").click(function(){		
			setTimeout('this.close()', 1);
		});
		$("#message").hover(function(){
			clearTimeout(timer1);
			timer1 = null;
		},function(){
			timer1 = setTimeout('this.close()', time);
			//alert(timer1);
		});
	};

	this.show = function(title, text, time){

		if($("#message").is("div")){ return; }

		if(title==0 || !title)title = this.title;

		this.inits(title, text);

		if(time>=0)this.time = time;

		switch(this.anims.type){

			case 'slide':$("#message").slideDown(this.anims.speed);break;

			case 'fade':$("#message").fadeIn(this.anims.speed);break;

			case 'show':$("#message").show(this.anims.speed);break;

			default:$("#message").slideDown(this.anims.speed);break;

		}

		if($.browser.is=='chrome'){

			setTimeout(function(){

				$("#message").remove();

				this.inits(title, text);

				$("#message").css("display","block");

			},this.anims.speed-(this.anims.speed/5));

		}

		//$("#message").slideDown('slow');

		this.rmmessage(this.time);

	};

	this.lays = function(width, height){

		if($("#message").is("div")){ return; }

		if(width!=0 && width)this.layer.width = width;

		if(height!=0 && height)this.layer.height = height;

	}

	this.anim = function(type,speed){

		if($("#message").is("div")){ return; }

		if(type!=0 && type)this.anims.type = type;

		if(speed!=0 && speed){

			switch(speed){

				case 'slow' : ;break;

				case 'fast' : this.anims.speed = 200; break;

				case 'normal' : this.anims.speed = 400; break;

				default:					

					this.anims.speed = speed;

			}			

		}

	}

	this.rmmessage = function(time){

		if(time>0){

			timer1 = setTimeout('this.close()', time);

			//setTimeout('$("#message").remove()', time+1000);

		}

	};
	this.close = function(){
		switch(this.anims.type){
			case 'slide':$("#message").slideUp(this.anims.speed);break;
			case 'fade':$("#message").fadeOut(this.anims.speed);break;
			case 'show':$("#message").hide(this.anims.speed);break;
			default:$("#message").slideUp(this.anims.speed);break;
		};
		setTimeout('$("#message").remove();', this.anims.speed);
		this.original();	
	}

	this.original = function(){	

		this.layer = {'width' : 239, 'height': 168};

		this.title = "额度预警";

		this.time = 4000;

		this.anims = {'type' : 'slide', 'speed' : 600};

	};

    jQuery.messager = this;

    return jQuery;

})(jQuery);