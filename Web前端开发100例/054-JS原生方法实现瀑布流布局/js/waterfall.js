// 通用函数,可以通过 id 或者 className 获取元素
function g(id){
  if (id.substr(0,1) == '.') {
    //注意这里返回的是一个数组
    return document.getElementsByClassName(id.substr(1));
  }
  return document.getElementById(id);
}

window.onload = function(){
  //兼容IE7,8 不支持 getElementByClassName()
  if(!document.getElementsByClassName){
      document.getElementsByClassName = function(className, element){
      var children = (element || document).getElementsByTagName('*');
      var elements = new Array();
      for (var i=0; i<children.length; i++){
        var child = children[i];
        var classNames = child.className.split(' ');
        for (var j=0; j<classNames.length; j++){
        if (classNames[j] == className){ 
            elements.push(child);
            break;
        }
          }
        } 
        return elements;
      };
  }
  // 参数: 瀑布流是对于 main 下类名为 box
  waterfall('main','box');
  // 当滚动条 滚动到最后一张图片刚刚显示出来时,加载图片
  window.onscroll = function(){
    if( checkScrollSilde() ){
      // 将数据加载到页面中
      // 实际开发中这些数据都应该由 后台提供
      for (var i = 0; i < 6; i++) {
        var oBox = document.createElement('div'),
            oPic = document.createElement('div'),
            oImg = document.createElement('Img');
        oPic.appendChild(oImg);
        oBox.appendChild(oPic);
        g('main').appendChild(oBox);
        oBox.className = 'box';
        oPic.className = 'pic';
        oImg.src = 'images/'+Math.floor(Math.random()*50+1)+'.jpg';
      }

      waterfall('main','box');
    }
  }

}

function waterfall(parent,box){
  // 将 parent 中所有类名为 box 的元素取出来, 因为这是案例没有限定范围,实际解决开发中最好限定范围
  var oParent = g(parent);
  var oBoxs = g('.'+box);
  // 计算页面现实的列数
  var boxWidth = oBoxs[0].offsetWidth;
  var cols = Math.floor(document.documentElement.clientWidth / boxWidth);
  // 设置 main 的宽 及位置
  oParent.style.cssText = 'width: '+boxWidth*cols + 'px; margin: 0 auto';

  //设定 下一行图片应该出现的位置(依次为高度最小图片下面)
  var hArr = new Array();
  for (var i = 0; i < oBoxs.length; i++) {
    if(i < cols){
      hArr.push(oBoxs[i].offsetHeight);
    }else{
      var minH = Math.min.apply(null,hArr);
      // 获取最小高度的索引位置
      var index = getMinhIndex(hArr,minH);
      oBoxs[i].style.position = "absolute";
      oBoxs[i].style.top = minH+'px';
      oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';

      hArr[index] += oBoxs[i].offsetHeight;
    }
  }
}
function getMinhIndex(arr,val){
  for (var i in arr)
    if (arr[i] == val)
      return i;
}
//检测是否具备加载条件
function checkScrollSilde(){
  var oParent = g('main');
  oBoxs = g('.box');
  var lastBoxH = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
  // 滚动条移动的距离
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  // 最后一张图片距离页面 顶部的高度
  var height = document.body.clientHeight || document.documentElement.clientHeight;
  return (lastBoxH < scrollTop + height)? true:false;
}