// 'use strict';
(function(root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = root.document ?
            factory(root) :
            factory;
    } else {
        root.utilHao = factory(root);
    }
}(typeof window !== 'undefined' ? window : this, function(win) {
    var utilHao = (function() {
    	//對象转字符串
		obj2stringHao : function(o){
					 var r=[]; 
					 if(typeof o=="string"){ 
					 return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\""; 
					 } 
					 if(typeof o=="object"){ 
					 if(!o.sort){ 
					  for(var i in o){ 
					  r.push(i+":"+obj2string(o[i])); 
					  } 
					  if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){ 
					  r.push("toString:"+o.toString.toString()); 
					  } 
					  r="{"+r.join()+"}"; 
					 }else{ 
					  for(var i=0;i<o.length;i++){ 
					  r.push(obj2string(o[i])) 
					  } 
					  r="["+r.join()+"]"; 
					 } 
					 return r; 
					 } 
					 return o.toString(); 
					}
		//浏览器版本
		browserVersionHao : function(){
			var browserVersion = window.navigator.userAgent.toUpperCase();
			var isOpera = browserVersion.indexOf("OPERA") > -1 ? true : false;
			var isFireFox = browserVersion.indexOf("FIREFOX") > -1 ? true : false;
			var isChrome = browserVersion.indexOf("CHROME") > -1 ? true : false;
			var isSafari = browserVersion.indexOf("SAFARI") > -1 ? true : false;
			var isIE = (!!window.ActiveXObject || "ActiveXObject" in window);
			var isIE9More = (! -[1, ] == false);
			var ua = navigator.userAgent;
			var isipad = ua.match(/(iPad).*OS\s([\d_]+)/),
		    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
		    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
		    isMobile = isIphone || isAndroid || ipad ;
		    //ipad iphone android 均记为手机
		 	return true;
		}
		//日期转换
		//json和对象互转
		//判断值在不在数组中
		//获取当前函数名称
		//FIXME 这个方法在下面请况无法使用
//		var x =   {
//		    run : function()  
//		    {  
//		        return getFuncName(arguments.callee);  
//		    }  
////		}  
//		JSON.parse(jsonstr); //可以将json字符串转换成json对象 
//		JSON.stringify(jsonobj); //可以将json对象转换成json对符串 
//  function createAndDownloadFile(fileName, content) {
//      var aTag = document.createElement('a');
//      var blob = new Blob([content]);
//      aTag.download = fileName;
//      aTag.href = URL.createObjectURL(blob);
//      aTag.click();
//      URL.revokeObjectURL(blob);
//  }
		getFuncName :function(_callee)  
			{  
			    var _text = _callee.toString();  
			    var _scriptArr = document.scripts;  
			    for (var i=0; i<_scriptArr.length; i++)  
			    {  
			        var _start = _scriptArr[i].text.indexOf(_text);  
			        if (_start != -1)  
			        {  
			            if (/^function\s*.∗.*\r\n/.test(_text))  
			            {  
			                var _tempArr = _scriptArr[i].text.substr(0, _start).split('\r\n');  
			                return _tempArr[_tempArr.length - 1].replace(/(var)|(\s*)/g, '').replace(/=/g, '');  
			            }  
			            else  
			                return _text.match(/^function\s*([^\(]+).*\r\n/)[1];  
			        }  
			    }  
			}  
		//循环数据
    	markData :markData(data){
			        var obj = {};
			        $.each(data,function (i,ele) {
			            $.each(ele,function(key,value){
			                if(undefined ==  obj[key] ){
			                    obj[key] = []
			                    obj[key].push(value);
			                }else{
			                    obj[key].push(value);
			                }
			            })
			        })
			        return obj;
			    }
    	
		}
    });
    );
    );