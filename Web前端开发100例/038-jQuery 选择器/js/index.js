function fun(){
  //选取标签直接写标签名
  $("body").css({"background":"#eee","font-family":"微软雅黑"});
  //选取某个 id ,需要加 ' # '
  $("#setId").css("color","pink");
  //选取某个 类, 需要加  ' . '
  $(".setClass").css("display","none");
}