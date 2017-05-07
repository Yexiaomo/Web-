// 通用函数,可以通过 id 或者 className 获取元素
function g(id){
  if (id.substr(0,1) == '.') {
    //注意这里返回的是一个数组
    return document.getElementsByClassName(id.substr(1));
  }
  return document.getElementById(id);
}
//格式化日期
function formateDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mi = date.getMinutes();
    m = m > 9 ? m : '0' + m;
    return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
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
//发表评论
function replayBox(box) {
  var otextArea = box.getElementsByTagName('textarea')[0];
  var  commentList = box.getElementsByClassName('comment-list')[0];
  var commentBox = document.createElement('div');
  commentBox.className = 'comment-box clearfix';
  commentBox.setAttribute('user','self');
  //创建插入字符串
  commentBox.innerHTML = '<img class="myhead" src="images/my.jpg" alt=""/>' +
                '<div class="comment-content">' +
                '<p class="comment-text"><span class="user">我：</span>' + otextArea.value + '</p>' +
                '<p class="comment-time">' +
                formateDate(new Date()) +
                '<a href="javascript:;" class="comment-praise" total="0" my="0" style="">赞</a>' +
                '<a href="javascript:;" class="comment-operate">删除</a>' +
                '</p>' +
                '</div>'
  commentList.appendChild(commentBox);
  otextArea.value = '';
  otextArea.onblur();
}
function praiseReplay(el) {
  var oldTotal = parseInt(el.getAttribute('total'));
  var my = parseInt(el.getAttribute('my'));
  var newTotal;
  if(my == 0) {
    newTotal = oldTotal+1;
    el.setAttribute('total', newTotal);
    el.setAttribute('my', 1);
    el.innerHTML = newTotal + '取消赞';
  } else {
    newTotal = oldTotal-1;
    el.setAttribute('total', newTotal);
    el.setAttribute('my', 0);
    el.innerHTML = (newTotal == 0)? '赞': newTotal+'赞';
  }
  el.style.display = (newTotal == 0)? '': 'inline-block';
}
function operateReplay(el) {
  //获取评论容器
  var ocommentBox = el.parentNode.parentNode.parentNode;
  //获取分享容器
  var obox = ocommentBox.parentNode.parentNode.parentNode;
  var otextArea = obox.getElementsByTagName('textarea')[0];
  var user = ocommentBox.getElementsByClassName('user')[0];
  var txt = el.innerHTML;
  if(txt == '回复') {
   otextArea.onfocus();
   otextArea.value = '回复' + user.innerHTML;
   otextArea.onkeyup();
  } else {
    //如果不是回复,就将节点删除
    removeNode(ocommentBox);
  }
}
window.onload = function () {
  var olist = g('list');
  var alist = olist.children;
  var timer;
  //事件代理
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
        //回复按钮
        case 'btn btn-off':
          clearTimeout(timer);
          break;
        //回复按钮蓝色
        case 'btn':
          replayBox(el.parentNode.parentNode.parentNode);
          break;
        //赞回复
        case 'comment-praise':
          praiseReplay(el);
          break;
        //操作回复
        case 'comment-operate':
          operateReplay(el);
          break;
      }
    }
    //输入框
    var atextArea = alist[i].getElementsByTagName('textarea')[0];
    //当输入框获取焦点时,添加类
    atextArea.onfocus = function() {
      this.parentNode.className = 'text-box text-box-on';
      this.value = (this.value == '评论...')? '':this.value;
      this.onkeyup();
    }
    //当失去焦点时-->去除类
    //            -->并判断是否为空
    atextArea.onblur = function() {
      var me = this;
      if (me.value=='') {
        timer = setTimeout(function() {
          me.parentNode.className = 'text-box';
          me.value = '评论...';
        },400)
      }
    }
    //键盘按键被松开时-->统计字数,回复按钮 发生改变
    atextArea.onkeyup = function() {
      var len = this.value.length;
      var p = this.parentNode;
      var btn = p.children[1];
      var word = p.children[2];
      if(len == 0 || len > 140) {
        btn.className = 'btn btn-off';
      } else {
        btn.className = 'btn';
      }
      word.innerHTML = len + '/140';
    }
  }

}