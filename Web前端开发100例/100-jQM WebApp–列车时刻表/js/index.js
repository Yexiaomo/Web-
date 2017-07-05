/*
urlPre: 跨域中转, urlPre有时候不可以用,请自行寻找
url1: 通过发车站和到达站查询火车时刻表
url2: 通过火车车次查询火车时刻表
url3: 通过火车车次查询列车经过车站明细
*/
var urlPre = "https://crossorigin.me/http://";
var url1 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeByStationName?UserID=";
var url2 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getStationAndTimeDataSetByLikeTrainCode?UserID=";
var url3 = "www.webxml.com.cn/WebServices/TrainTimeWebService.asmx/getDetailInfoByTrainCode?UserID=";
var isbind = 0;
//获取车次列表
var getTrainList = function() {
  // 获取数据之前先检验页面提交的数据
  if ($("#search-no").val() || ($("#search-begin").val() && $("#search-end").val())) {
    var searchBtn = $(this);
    //将搜索按钮设置为可点击
    searchBtn.button("option","disabled",true);
    //显示加载图标
    $.mobile.loading("show");

    
    var _data = {};//用来接收数据
    var _url = url1;
    //根据填写的查询信息,设定查询的url(默认url1)
    if (!$("search-no").val()) {
      _data.StartStation = $("#search-begin").val();
      _data.ArriveStation = $("#search-end").val();
    } else {
      _data.TrainCode = $("#search-no").val();
      _url = url2;
    }
    
    //请求数据
    $.get(urlPre+_url,_data,function(data) {
      //清楚列表内的信息
      $("#list").html("");
      //获取列表对象
      var list = $("#list");
      //根据返回的xml选定内定
      var timeTables = $(data).find("TimeTable");
      var _arr = [];

      //遍历
      timeTables.each(function (idnex,obj) {

        var i = index;

        //最多载入10条
        if (i > 10) return false;

        var that = $(this);

        //根据返回的xml判断是否返回数据
        if(that.find("FirstStation").text() == "数据没有被发现") {
          alert("数据没有被发现!");
          return false;
        }

        //将数据显示在页面内
        _arr.push('<li><a href="#" data-no="' + that.find("TrainCode").text() + '">' +
                  '<h2>' + that.find("TrainCode").text() + '次</h2>' +
                  '<p>' + that.find("FirstStation").text() + ' - ' + that.find("LastStation").text() + '</p>' +
                  '<p>用时：' + that.find("UseDate").text() + '</p>' +
                  '<p class="ui-li-aside">' + that.find("StartTime").text() + ' 开</p>' +
                  '</a></li>');
      });

      //追加数据
      if (_arr.length > 0) {
        list.html(_arr.join(""));
        list.listview("refresh");//让数据显示更美观
      }
      //隐藏加载图标
      $.mobile.loading("hide");
      //将搜索按钮设置为不可点击
      searchBtn.button("option","disabled",false)
    })
  } else {
    alert("请输入发车站和终点站,或输入车次!");
  }
};

//为了不让用户多次点击,设定条件
var isAjax = false;

//获取列车详情-->具体步骤和上面类似
var getInfoByTrainCode = function() {
  //显示加载图标
  $.mobile.loading("show");

  var trainCode = $(this).attr("data-no");

  if (isAjax) return;

  isAjax = true;

  $.get(urlPre+url3,{TrainCode:trainCode},function(data) {
    isAjax = false;
    $("#detail").find(".ui-content h2").html(trainCode+'次');
    var tbody = $("#detail").find(".ui-content tbody");
    tbody.html("");

    $(data).find("TrainDetailInfo").each(function(index,obj) {
      var tr = $("<tr></tr>");
      var that = $(this);
      tr.html('<td>' + that.find("TrainStation").text() + '</td>' +
              '<td>' + that.find("ArriveTime").text() + '</td>' +
              '<td>' + that.find("StartTime").text() + '</td>');
      tbody.append(tr);
    });

    $.mobile.loading("hide");
    $.mobile.changePage("#detail");
  });
};

//绑定事件
var bindEvent = function() {
  $("#search-submit").on("click",getTrainList);
  $("#list").on("click","a",getInfoByTrainCode);
};


$(document).on("pageshow", "#index", function () {
    if (isbind) return 
      isbind = 1;
    bindEvent();
});