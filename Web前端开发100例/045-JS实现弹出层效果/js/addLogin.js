function login(){
  //获取页面的高度和宽度
  var sWidth=document.body.scrollWidth;
  var sHeight=document.body.scrollHeight;
  
  //获取页面的可视区域高度
  var wHeight= document.documentElement.clientHeight;
  //创建登录div 盒子
  var oLogin=document.createElement("div");
  oLogin.id="login";

  //追加内容
  oLogin.innerHTML="<div class='loginCon'><div id='close'></div></div>";
  document.body.appendChild(oLogin);
  
  //获取登录div的宽和高
  var dHeight=oLogin.offsetHeight;
  var dWidth=oLogin.offsetWidth;
  //设置登录div的left和top
    oLogin.style.left = sWidth/2-dWidth/2+"px";
    oLogin.style.top = wHeight/2-dHeight/2+"px";
  
  //点击关闭,关闭登录div
  var oClose=document.getElementById("close");
  oClose.onclick=function(){
    document.body.removeChild(oLogin);
  };
}

//当页面加载完毕后在登录按钮上添加点击事件
window.onload = function(){
  // 获取元素对象
  var oLoginBtn = document.getElementById("lognBtn");
  oLoginBtn.onclick = function(){
    login();
    return false;
  }
}