//通用函数
function g(id) {
  return document.getElementById(id);
}

//获取地理位置
function getLocation() {
  g("demo").innerHTML="正在获取中...";

  //检测浏览器是否支持
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

    //检测浏览器是否正确获取地理位置
    setTimeout('showError()',10000);
  } else {
    showError();
  }
}

//显示位置
function showPosition(position) {
  g("demo").innerHTML="纬度: " + position.coords.latitude + 
  "<br />经度: " + position.coords.longitude;
}

//-->浏览器不支持
//-->浏览器获取地理位置失败,延迟10秒后执行
function showError() {
  if (g('demo').innerHTML === "正在获取中...") {
    g("demo").innerHTML="获取地理位置失败,请检查浏览器、网络等是否出现问题";
  }
}