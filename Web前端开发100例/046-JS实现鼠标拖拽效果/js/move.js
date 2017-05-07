window.onload = function(){
  var oDrag = document.getElementById('draggable');
  var isDraging = false;
  var startX = 0;
  var startY = 0;
  //元素上监听移动事件
  //获取偏移的距离,并将元素标记为可移动元素
  if (oDrag.addEventListener) {                //所有主流浏览器，除了 IE 8 及更早 IE版本
      oDrag.addEventListener("mousedown", mousedownFun);
  } else if (oDrag.attachEvent) {             // IE 8 及更早 IE 版本
      oDrag.attachEvent("onmousedown", mousedownFun);
  }
  function mousedownFun(e){
    e = e || window.event;
    startX = e.pageX - oDrag.offsetLeft; 
    startY = e.pageY - oDrag.offsetTop;
    isDraging = true;
  };
  //鼠标松开,将元素标记为不可移动
  document.onmouseup = function(e){
    isDraging = false;
  }
  //当鼠标开始移动时,判断元素是否为标记为可移动
  //进一步限定元素的位置,不可移动至窗口外侧
  document.onmousemove = function(e) {
    e = e || window.event;
    if(isDraging){
      var maxX = document.documentElement.clientWidth -  oDrag.offsetWidth;
      var maxY = document.documentElement.clientHeight - oDrag.offsetHeight;

      //限定范围 在此处IE8以下不支持,多次努力之后放弃修改。有解决方法请联系:qq2339836652@163.com
      oDrag.style.left = Math.min( Math.max( ( e.pageX-startX ) , 0 ) , maxX) + "px";
      oDrag.style.top  = Math.min( Math.max( ( e.pageY-startY ) , 0 ) , maxY) + "px";
    }
  }
}