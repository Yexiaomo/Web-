//定义网页背景颜色列表
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
//获得的名言 和 作者 的变量
var currentQuote = '', currentAuthor = '';
//背景颜色计数
var count = -1;
// Get New Quote 事件
function getQuote(){
  /*
    ajax()方法-->ajax() 方法用于执行 AJAX（异步 HTTP）请求。
    所有的 jQuery AJAX 方法都使用 ajax() 方法。该方法通常用于其他方法不能完成的请求
    语法: $.ajax({name:value, name:value, ... })   该参数规定 AJAX 请求的一个或多个名称/值对。
  */
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      // 将获取到的文本显示在页面内
      $(".quote-text").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#text').text(response.quote);
        });
      // 将获取到的文本显示在页面内
      $(".quote-author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html(response.author);
        });
      // 设定一种颜色
      var color = Math.floor(Math.random() * colors.length);
      $("html body").css('background-color',colors[color]);
      $(".button").css('background-color',colors[color]);
      $(".quote-text").css('color',colors[color]);
      $(".quote-author").css('color',colors[color]);
    }
  });
}
$(document).ready(function() {
  getQuote();
  $('#new-quote').on('click', getQuote);
});