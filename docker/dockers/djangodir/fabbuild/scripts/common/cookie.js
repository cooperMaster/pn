/*
*	Common.Cookie.set('lan','ko',1);
*
*	alert(Common.Cookie.read('lan'));
*
*/


if(typeof(Common)=='undefined') Common = {};

//Singleton
Common.Cookie = (function() {
  // Private attributes. 
  var pathString = ";path=/";
  // Private methods.
 
  
  // Everything returned in the object literal is public, but can access the
  // members in the closure created above.
  return { 
    // Public method.
    read : function(name) {
     var  cookieStr = "; " + document.cookie + "; ";
     var  index = cookieStr.indexOf("; " + name + "=") ;
     if (index != -1) {
     	var s = cookieStr.substring(index + name.length + 3 , cookieStr.length) ;
     	return unescape(s.substring(0,s.indexOf("; ")));
     }else{   
      	return null;
      }
    },
    get : function(name){
	    var cookieArray = document.cookie.split("; "); 
	
	   var cookie = new Object();    
	
	   for (var i = 0; i < cookieArray.length; i++){    
	
	      var arr = cookieArray[i].split("=");      
	
	      if(arr[0] == name) return unescape(arr[1]);
	
	   } 
	
	   return ""; 
    },
    
    set : function(name,value,hours){
	    var str = name + "=" + escape(value);

	    if(hours > 0){                              
	
	        var date = new Date();
	
	        var ms = hours*3600*1000;
	
	        date.setTime(date.getTime() + ms);
			
			var expString = "; expires=" + date.toGMTString();
			
	        str = str + expString ;
	
	   }
	
	   document.cookie = str + pathString;
    },
    
    del : function(name){
	    var exp = new Date();

	    exp.setTime(exp.getTime() - 1);
	
	    var cval = read(name);
	
	    if( cval != null) {
	    	document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + pathString;
	    }
    
    }
	
  };
  
})(); // Invoke the function and assign the returned object literal to 

