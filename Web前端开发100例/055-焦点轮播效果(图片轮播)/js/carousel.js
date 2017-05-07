function g(id){
  return document.getElementById(id)
}
window.onload=function(){
  //定义变量
  var imgContainer = g('imgContainer');
  var imgList = g('imgList');
  var imgButtons = g('imgButtons').getElementsByTagName('span');
  var prevImg = g('prevImg');
  var nextImg = g('nextImg');
  var imgIndex = 1;
  var len = 5;
  var imgAnimated = false;
  var timer;

  function imgAnimate(setPosition){
    if (setPosition == 0) {
      return;
    }
    //点击后将状态改为不可点击
    imgAnimated = true;
    var time=300;
    var inteval = 10;
    var imgSpeed = setPosition/(time/inteval);
    var left = parseInt(imgList.style.left) + setPosition;
    var go = function(){
      if( (imgSpeed > 0 && parseInt(imgList.style.left)<left) || (imgSpeed < 0 && parseInt(imgList.style.left) > left)){
        imgList.style.left = parseInt(imgList.style.left) + imgSpeed+'px';
        setTimeout(go,inteval);
      }else{
        imgList.style.left = left + 'px';
        if(left>-1280){
          imgList.style.left = -1280*len+'px';
        }else if(left < (-1280*len)){
          imgList.style.left = '-1280px';
        }
        imgAnimated = false;
      }
    }
    go();
  }
  function showImgButtons(){
    for (var i = 0; i < imgButtons.length; i++) {
      if(imgButtons[i].className == 'on'){
        imgButtons[i].className = '';
        break;
      }
    }
    imgButtons[imgIndex-1].className = 'on';
  }
  function play(){
    timer =setTimeout(function(){
      nextImg.onclick();
      play();
    }, 3000)
  }
  function stop() {
    clearTimeout(timer);
  }
  nextImg.onclick = function(){
    if (imgAnimated) {
        return;
    }
    if (imgIndex == 5) {
        imgIndex = 1;
    }
    else {
        imgIndex += 1;
    }
    imgAnimate(-1280);
    showImgButtons();
  }
  prevImg.onclick = function(){
    if (imgAnimated) {
        return;
    }
    if (imgIndex == 1) {
        imgIndex = 5;
    }
    else {
        imgIndex -= 1;
    }
    imgAnimate(1280);
    showImgButtons();
  }
  for (var i = 0; i < imgButtons.length; i++) {
    imgButtons[i].onclick = function(){
      if(imgAnimated){
        return;
      }else if( this.className == 'on'){
        return;
      }else{
        var myIndex = parseInt(this.getAttribute('index'));
        var setPosition = -1280 * (myIndex - imgIndex);
        imgAnimate(setPosition);
        imgIndex = myIndex;
        showImgButtons();
      }
    }
  }
  imgContainer.onmouseover = stop;
  imgContainer.onmouseout = play;
  play();
}