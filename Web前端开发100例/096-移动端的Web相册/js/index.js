var  total = 17;
var zWin = $(window);
var render = function() {
  var padding = 2;
  var winWidth = zWin.width();
  var picWidth = Math.floor( (winWidth-padding*3) / 4);

  var tmpl = '';
  for (var i = 1; i <= total; i++) {
    var p = padding;
    var imgSrc = 'images/'+ i + '.jpg';
    if (i%4 == 1) {
      p = 0;
    }
    tmpl += '<li class="animated bounceIn" data-id="'+i+'" style="width:'+picWidth
                            +'px;height:'+picWidth
                            +'px;padding-top:'+padding
                            +'px;padding-left:'+p
                            +'px;"><canvas id="cvs_'+i+'"></canvas></li>';
    var oImg = new Image();
    oImg.index = i;
    oImg.onload = function() {
      var cvs = $('#cvs_'+this.index)[0].getContext('2d');
      cvs.width = this.width;
      cvs.height = this.height;
      cvs.drawImage(this,0,0);
    }
    oImg.src = imgSrc;
  }


  $('#container').html(tmpl);
}
render();

var wImage = $('#large_img');
var loadImg = function( id ) {

  $('#large_container').css({
    width:zWin.width(),
    height:zWin.height()
  }).show();
  var imgsrc = 'images/'+id+'.large.jpg';
  var oImg = new Image();
  oImg.src = imgsrc;

  oImg.onload = function() {
    var w = this.width;
    var h = this.height;
    var winWidth = zWin.width();
    var winHeight = zWin.height();
    var realw = parseInt( (winWidth - winHeight*w / h) / 2 );
    var realh = parseInt( (winHeight - winWidth*h / w) / 2 );
    var paddingLeft = parseInt( (winWidth-realw)/2 );
    var paddingTop = parseInt( (winHeight-realh)/2 );

    wImage.css('width','auto').css('height','auto');
    wImage.css('padding-left','0px').css('padding-top','auto');

    //如果高度大于宽度的 1.2 ,就认为图片是竖着的
    if( h/w > 1.2) {
         wImage.attr('src',imgsrc).css('height',winHeight).css('padding-left',realw+'px');;
      }else{  
         wImage.attr('src',imgsrc).css('width',winWidth).css('padding-top',realh+'px');
    }
  }
}

var cid;
//事件代理
$('#container').delegate('li','tap',function(){
  var _id = cid = $(this).attr('data-id');
  loadImg(_id);
});
$("#large_container").tap(function() {
  $(this).hide();
}).swipeLeft(function() {
  cid++;
  if (cid > total) {
    cid = total;
  } else {
    loadImg(cid);
  }
}).swipeRight(function() {
  cid--;
  if (cid < 1) {
    cid = 1;
  } else {
    loadImg(cid);
  }
});