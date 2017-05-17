//天气数据,可以使用其他免费或付费数据(例如:聚合,阿里云,openweather...)
//这里使用新浪免费的天气接口
window.onload=function(){
  showWeather(0);
  //每一个小时更新一次
  window.setInterval(showWeather,3600000);
}
function showWeather(showDay){
  //设定字体颜色
  for (var i = 0; i < 3; i++) {
    if (i == showDay) {
      document.getElementById("day"+i).style.color='red';
    } else {
      document.getElementById("day"+i).style.color='white';
    }
  }
  
  //定义变量
  var ch, wd, fl, tq;
  //确定所在城市
  var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
  $.getScript(cityUrl, function(script,textStatus,jqXHR) {
    //得到所在城市(转码后)
    var citytq = remote_ip_info.city;
    //day=0 获取一天的天气, 最多 day=4
    var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=3&dfc=3";
    $.ajax({
      url: url,
      dataType: "script",
      scriptCharset: 'gbk',
      success:function(data){
        var _w = window.SWther.w[citytq][showDay];
        /* _w中包含以下数据:
              d1:"南风"
              d2:"南风"
              f1:"duoyun"
              f2:"qing"
              p1:"3-4"
              p2:"3-4"
              s1:"多云"
              s2:"晴"
              t1:"23"
              t2:"11"
        */
        ch = citytq;
        wd = _w.t1 + "℃～" + _w.t2 + "℃";
        fl = "风力 "+_w.p1 + ' 级';
        if (_w.s1 == _w.s2) {
          tq = _w.s1;
        } else {
          tq = _w.s1 + " 转 " + _w.s2;
        }
        $("#chengshi").html(ch);
        $("#wendu").html(wd);
        $("#fengli").html(fl);
        $("#tianqi").html(tq);
        if( (new Date().getHours() > 16) && showDay == 0){
          setBgImg(_w.f2);
        }else{
          setBgImg(_w.f1);
        }
      }
    });
  })
}
// 根据天气情况,设置页面背景
function setBgImg(status){
  switch(status){
    case 'zhenyu': $('#wIcon').html('<i class="wi wi-rain-mix"></i>');
      $('body').css('background-image','url(images/rain.jpg)'); 
      break;
    // case 'Drizzle小雨': $('#wIcon').html('<i class="wi wi-rain-mix"></i>');
    //   $('body').css('background-image','url(images/rain.jpg)'); 
    //   break;
    case 'xiaoyu': $('#wIcon').html('<i class="wi wi-rain-mix"></i>');
      $('body').css('background-image','url(images/rain.jpg)'); 
      break;
    case 'qing':$('#wIcon').html('<i class="wi wi-day-sunny"></i>');
      $('body').css('background-image','url(images/qing.jpg)');
      break;
    case 'duoyun':$('#wIcon').html('<i class="wi wi-cloudy"></i>');
      $('body').css('background-image','url(images/duoyun.jpg)');
      break;
    case 'leizhenyu':$('#wIcon').html('<i class="wi wi-storm-showers"></i>');
      $('body').css('background-image','url(images/leizhenyu.jpg)');
      break;  
    // case 'Snow雪':$('#wIcon').html('<i class="wi wi-snow"></i>');
    //   $('body').css('background-image','url(images/1.jpg)');
    //   break;
    // case 'Mist雾':$('#wIcon').html('<i class="wi wi-fog"></i>');
    //   $('body').css('background-image','url(images/1.jpg)');
    //   break;  
    // case 'Fog雾':$('#wIcon').html('<i class="wi wi-fog"></i>');
    //   $('body').css('background-image','url(images/1.jpg)');
    //   break;  
    // case 'Haze雾霾':$('#wIcon').html('<i class="wi wi-smoke"></i>');
    //   $('body').css('background-image','url(images/1.jpg)');
    //   break;  
  }
}