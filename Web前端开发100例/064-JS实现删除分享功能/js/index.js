// 通用函数,可以通过 id 或者 className 获取元素
function g(id){
  if (id.substr(0,1) == '.') {
    //注意这里返回的是一个数组
    return document.getElementsByClassName(id.substr(1));
  }
  return document.getElementById(id);
}
//删除节点
function removeNode(node) {
  node.parentNode.removeChild(node);
}

window.onload = function () {
  var olist = g('list');
  var alist = olist.children;


  for (var i = 0; i < alist.length; i++) {
    alist[i].onclick = function (e) {
      e = e || window.event;
      var el = e.srcElement || e.target;
      if(el.className == 'close'){
        removeNode(el.parentNode);
      }
    }
  }
}