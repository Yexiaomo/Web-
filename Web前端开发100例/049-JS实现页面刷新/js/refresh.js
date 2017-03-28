/*
  js实现页面的刷新有多种方法,可以到 W3C 了解更多
    这里利用地址栏可带参数的选项，用脚本来取得页面间的传递参数，只刷新一次
    并不需要后台程序的支持。
*/
function reurl(){
  //把当前页面地址赋予 url
  url = location.href;
  //分隔符为 '?'
  var times = url.split("?");
  if(times[1] != 1){//如果 ? 后面的内容不等于 1,表示还没有刷新
    url += "?1";//将?添加到url后面, 注意观察地址栏中的内容.
    alert("刷新页面!");
    self.location.replace(url);//刷新页面
    alert("刷新完成!");
  }
}
window.onload = reurl;