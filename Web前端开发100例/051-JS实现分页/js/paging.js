function g(id){
  return document.getElementById(id);
}
//1.得到页面信息
function getPageInfo(){
  //1.1定义变量
  //获取页面总数
  var totalPages = parseInt(g('iptPage').value);
  //这里假定每页的页面数为10
  var perPages = 10;
  //页面定位默认为 1
  var targetPage = 1;
  //1.2判断输入的页面总数是否合理
  //设定页面总数在 1 ~ 1000 之间
  if ( totalPages <= 0 || totalPages >1000 || isNaN(totalPages)) {
    alert("请输入 区间 [1,1000] 以内的正整数!");
    location.reload();
  }else{
    setPaing(totalPages,perPages,targetPage);
  }
  return [totalPages,perPages,targetPage];
}
function setPaing(totalPages,perPages,targetPage){
  var outStr = "";
  //页面总数小于10
  if (totalPages <= 10) {
    //这里不从 0 开始,便于判断,便于设定
    for (var i = 1; i <= totalPages; i++) {
      outStr += setPaingHtml(i,targetPage,"");
    }
  }
  //当页面总数大于 10
  else{
    //当页面定位在 11~19 之间时
    if (parseInt( (targetPage-1)/10) == 0) {
      for (var i = 1; i <= 10; i++) {
        outStr += setPaingHtml(i,targetPage,"");
      }
      outStr += "<a href='#' onclick='goTargetPage("+i+")'>next</a>";
    }
    //当页面定位在最后一页时
    else if ( parseInt((targetPage-1)/10) == parseInt(totalPages/10) ) {
      outStr += "<a href='#' onclick='goTargetPage("+( parseInt((targetPage-1)/10) * 10)+")'>previous</a>";
      for (var i = parseInt(targetPage/10)*10+1; i <= totalPages; i++) {
       outStr += setPaingHtml(i,targetPage,"");
      }
    }
    //当页面定位于中间时
    else{
      outStr += "<a href='#' onclick='goTargetPage("+( parseInt((targetPage-1)/10) * 10 )+")'>previous</a>"
      for (var i = (parseInt((targetPage-1)/10)*10) + 1; i <= (parseInt((targetPage-1)/10)*10) + 10; i++) {
        outStr += setPaingHtml(i,targetPage,"");
      }
      outStr += "<a href='#' onclick='goTargetPage("+i+")'>next</a>"
    }
  }

  //将内容更新到页面内

  g('pageDiv').innerHTML = "<span class='pagingInfo'>共"+totalPages+"页|第"+targetPage+"页<\/span>" + outStr;

  //将 outStr 清空;  
  outStr = "";

}
function setPaingHtml(i,targetPage,str){
  if (i != targetPage) {
    str += "<a href='#' onclick='goTargetPage("+i+")'>"+i+"</a>";
  }else{
    str += "<span class='current'>"+i+"</span>";
  }
  return str;
}
function goTargetPage(toTarget){
  var info = getPageInfo();
  setPaing(info[0],info[1],toTarget);
  //reloadpage(toTarget);    //调用显示页面函数显示第几页,这个功能是用在页面内容用ajax载入的情况
}