function setCookie(cname,cvalue,exdays) {
  //创建一个Date()对象
	var d = new Date();
	
	//设定时间
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	
	//设定过期时间
	var expires = "expires="+d.toGMTString();
	
  //创建cookie
	document.cookie = cname+"="+cvalue+"; "+"expires";
}

function getCookie(cname){
  //cookie 
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if(c.indexOf(name) == 0)
			return c.substring(name.length,c.length);
	}
	return "";
}

function checkCookie(){
	alert("您的浏览器需支持本地cookie存储,并且能正确读取,否则您将什么也看不到");
  //得到用户名
	var user = getCookie("username");
	/*
	  如果用户名为空,则执行setCookie()函数
	  如果不为空,将用户名显示出来
	*/
	if (user != "") {
		alter("welcome again " + username);
	}else{
		user = prompt("Please enter you name:","");
		if (user != "" && user != null) {
			setCookie("username",user,30);
		}
	}
}