function g(id){
  return document.getElementById(id);
}
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function getTime(){
  var time = new Date().Format("yyyy-MM-dd HH:mm:ss");//得到格式输出时间
  var oShow = g('show');
  var getText = g('text').value;//得到文本内容
  if (getText == "") {
    alert("请输入需要发布的内容");
    return ;
  }
  
  var insertText = "<div class='text-box'><p class='show-text'>"+getText+"</p>"+"<p class='show-time'>[ "+time+" ]</p></div>";
  oShow.innerHTML = insertText + oShow.innerHTML;//让最新发布的内容在最上边
}