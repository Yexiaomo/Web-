/*
  基本思路,
  获取当前时间,截止时间
  两者之差获取差值
*/
window.onload = setInterval(function(){
  //获取现在 Date()endTimeText
  var nowDate = new Date();
  var nowYear = nowDate.getFullYear();

  //计算到下一年元旦的毫秒数
  var endYear = nowYear + 1;
  document.getElementById('endYearText').innerHTML = endYear;
  //兼容 IE 写法
  var endDate = new Date(endYear+"/1/1");
  var time = endDate.getTime() - nowDate.getTime();

  //计算 到下一年元旦的 天数,小时数,分钟数,秒数
  var days = Math.floor((time/(24*60*60*1000)));
  var hours = Math.floor(( time - (days*24*60*60*1000) )/(60*60*1000));
  var minutes = Math.floor(( time - (days*24*60*60*1000) - (hours*60*60*1000) )/(60*1000)); 
  var seconds = Math.ceil( ( time - (days*24*60*60*1000) - (hours*60*60*1000) - (minutes*60*1000) ) / (1000) );
 
  //创建插入文本变量
  var insertText = "";
  
  //根据变量的值 设定 inserText 的值
  if (days > 0) {
    insertText = insertText + days + " 天 ";
  }else{
    insertText = insertText + "0" + " 天 ";
  }

  if (hours > 0){
    insertText = insertText + hours + " 时 ";
  }else{
    insertText = insertText + "0" + " 时 ";
  }

  if (minutes > 0){
    insertText = insertText + minutes + " 分 ";
  }else{
    insertText = insertText + "0" + " 分 ";
  }

  insertText = insertText + seconds + "秒";

  document.getElementById('showEndText').innerHTML = insertText;

},100)