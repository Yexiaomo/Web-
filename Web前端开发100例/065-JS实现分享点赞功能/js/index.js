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
//赞分享
function praiseBox(box, el) {
  var praiseElement = box.getElementsByClassName('praises-total')[0];
  var oldTotal = parseInt(praiseElement.getAttribute('total'));
  var txt = el.innerHTML;
  var newTotal;
  if (txt == '赞') {
    newTotal = oldTotal+1;
    praiseElement.innerHTML = (newTotal == 1)? '我觉得很赞':'我和'+oldTotal +'个人觉得很赞';
    el.innerHTML = '取消赞';
  } else {
    newTotal = oldTotal-1;
    praiseElement.innerHTML = (newTotal == 0)? '':newTotal +'个人觉得很赞';
    el.innerHTML = '赞';
  }
  praiseElement.setAttribute('total', newTotal);
  praiseElement.style.display = (newTotal == 0)? 'none':'block';

}
window.onload = function () {
  var olist = g('list');
  var alist = olist.children;

  for (var i = 0; i < alist.length; i++) {
    alist[i].onclick = function (e) {
      e = e || window.event;
      var el = e.srcElement || e.target;
      switch (el.className) {
        case 'close':
          removeNode(el.parentNode);
          break;
        //赞分享
        case 'praise':
          praiseBox(el.parentNode.parentNode.parentNode, el);
          break;
      }
    }
  }

}