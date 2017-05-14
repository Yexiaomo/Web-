window.onload = function () {
  //获取各个元素
  var mainDiv = document.getElementById('mainDiv');
  var smallDiv = document.getElementById('smallDiv');
  var magn = document.getElementById('magn');
  var mark = document.getElementById("mark");
  var bigDiv = document.getElementById('bigDiv');
  var bigPic = document.getElementById('bigPic');

  //当鼠标移动至 mark 盒子上时-->大图片盒子和放大镜显示
  mark.onmouseover = function(){
    magn.style.display = "block";
    bigDiv.style.display = "block";
  }
  //当鼠标离开至 mark 盒子上时-->大图片盒子和放大镜隐藏
  mark.onmouseout = function(){
    magn.style.display = "none";
    bigDiv.style.display = "none"; 
  }
  //当鼠标在 mark 盒子上移动时-->大图片盒子和放大镜的位置变化
  mark.onmousemove = function(e){
    //兼容多个浏览器的event参数模式
    var _event = e || window.event;

    //放大镜的坐标 
    var left = _event.clientX - mainDiv.offsetLeft - smallDiv.offsetLeft - magn.offsetWidth/2;
    var top = _event.clientY - mainDiv.offsetTop - smallDiv.offsetTop - magn.offsetHeight/2;

    //防止放大镜越界
    if( left < 0){
      left = 0;
    }else if(left > (mark.offsetWidth - magn.offsetWidth)){
      left = mark.offsetWidth - magn.offsetWidth;
    }
    if (top < 0) {
      top = 0;
    }else if (top > (mark.offsetHeight - magn.offsetHeight)){
      top = mark.offsetHeight - magn.offsetHeight;
    }

    //设定鼠标移动时,放大镜的位置
    magn.style.left = left + "px";
    magn.style.top = top + "px";

    //根据公式设定 图片显示的位置
    var percentX = left / (mark.offsetWidth - magn.offsetWidth);
    var percentY = top / (mark.offsetHeight - magn.offsetHeight);
    bigPic.style.left = -percentX * (bigPic.offsetWidth - bigDiv.offsetWidth) + "px";
    bigPic.style.top = -percentY * (bigPic.offsetHeight - bigDiv.offsetHeight) + "px";

  }
}