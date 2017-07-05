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
}
function show( cnt ) {
  //根据类 获取 所有信息展开栏
  var infoContainer = g('.info-container')[cnt];
  if ( infoContainer.style.display == "") {
    infoContainer.style.display = 'block';
  } else if ( infoContainer.style.display == "none") {
    infoContainer.style.display = 'block';
  } else {
    infoContainer.style.display = 'none';
  }
}