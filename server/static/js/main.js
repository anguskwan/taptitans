// Kick off the application.
require(["async", "jquery"], function (async, $) {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    // app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.

    window.browser={
		versions:function(){ 
             var u = navigator.userAgent, app = navigator.appVersion; 
             return {//移动终端浏览器版本信息 
				 trident: u.indexOf('Trident') > -1, //IE内核
	             presto: u.indexOf('Presto') > -1, //opera内核
	             webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
	             mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
	             iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	             android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
	             iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
	             iPad: u.indexOf('iPad') > -1, //是否iPad
	             webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
	             weChat: u.search(/MicroMessenger/i) !== -1 //是否是微信
             };
         }()
	};

    window.isProdEnv = function() {
       	return location.hostname.toLocaleLowerCase() == "wx.hortor.net" || getParameterByName("env") == "prod";
    };

    window.getParameterByName = function(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	function startApp() {
		$("#loadingOverlay").hide();
		require(["app", "core/Router", "core/Controller"], function(app, router, controller){
		    app.appRouter = new router({
		        controller: new controller()
		    });
		    app.start();
		});
	}
	$(document).ready(function () {
		startApp();
    });
});