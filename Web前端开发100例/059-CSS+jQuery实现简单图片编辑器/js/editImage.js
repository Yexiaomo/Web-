window.onload = function(){
  //点击 Go 按钮加载图片 && 加载页面时加载图片
  $('#goImg').click(addImage);
  //表单submit事件
  $('#urlBox').submit(addImage);
  //通过 CSS 属性来编辑图片
  function editImg() {
    var gs=$('#gs').val(),
        blur=$('#blur').val(),
        br=$('#br').val(),
        ct=$('#ct').val(),
        huer=$('#huer').val(),
        opacity=$('#opacity').val(),
        invert=$('#invert').val(),
        saturate=$('#saturate').val(),
        sepia=$('#sepia').val();
    console.log('sepia:'+sepia);
    $("#imgContainer img").css(
      "filter", 'grayscale('+gs+
      '%) blur('+blur+
      'px) brightness('+br+
      '%) contrast('+ct+
      '%) hue-rotate('+huer+
      'deg) opacity('+opacity+
      '%) invert('+invert+
      '%) saturate('+saturate+
      '%) sepia('+sepia+
      '%)'
    );

    $("#imgContainer img").css(
      "-webkit-filter", 'grayscale('+gs+
      '%) blur('+blur+
      'px) brightness('+br+
      '%) contrast('+ct+
      '%) hue-rotate('+huer+
      'deg) opacity('+opacity+
      '%) invert('+invert+
      '%) saturate('+saturate+
      '%) sepia('+sepia+
      '%)'
    ); 
  }

  $("input[type=range]").change(editImg).mousemove(editImg);
  
  $('#imgEditor').on('reset',function(){
    setTimeout(function(){
      editImg();
    }, 0);
  });

  function addImage(e){
    e = window.event || e;
    var imgUrl = $('#imgUrl').val();
    if (imgUrl.length) {
      $('#imgContainer img').attr("src", imgUrl);
    }
    e.preventDefault();
  }
}