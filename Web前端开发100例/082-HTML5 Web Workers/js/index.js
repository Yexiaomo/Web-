/*
#### 什么是 Web Worker？
 - Web Worker 是运行在后台的 JavaScript，不会影响页面的性能。
 - 当在 HTML 页面中执行脚本时，页面的状态是不可响应的，直到脚本已完成。
 - Web Worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 Web Worker 在后台运行
#### 由于 Web Worker 位于外部文件中，它们无法访问下例 JavaScript 对象：
 - window 对象
 - document 对象
 - parent 对象
*/
/*
  在本地运行时你会发现出现如下错误
  > Uncaught DOMException: Failed to construct 'Worker': Script at '某路径下/demo_workers.js' cannot be accessed from origin 'null'.
  
  修改方法
  > 将本案例放在服务器下运行,即可成功运行
*/
var w;
function startWorker() {
  //在创建web woker 之前判断浏览器是否支持它
  if (typeof(Worker) != 'undefined') {
    if (typeof(w) == 'undefined') {
      w = new Worker('js/demo_workers.js');
    }
    w.onmessage = function(e) {
      document.getElementById('result').innerHTML = e.data;
    };
  } else {
    document.getElementById('result').innerHTML = "抱歉您的浏览器不支持 Web Workers";
  }
}
function stopWorker() {
  w.terminate();
  w = undefined;
}