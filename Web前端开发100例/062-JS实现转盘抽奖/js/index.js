window.onload = function() {
  var oPointer = document.getElementsByTagName("img")[0];
  var oTurntable = document.getElementsByTagName("img")[1];
  var cat = 51.4;
  var num = 0;
  var offOn = true;
  document.title = "";

  oPointer.onclick = function() {
    if (offOn) {
      oTurntable.style.transform = "rotate(0deg)";
      offOn = !offOn;
      ratating();
    }
  }

  function ratating() {
    var timer = null;
    var rdm = 0;
    clearInterval(timer);
    timer = setInterval(function() {
      if (Math.floor(rdm / 360) < 3) {
        rdm = Math.floor(Math.random() * 3600);
      } else {
        oTurntable.style.transform = "rotate(" + rdm + "deg)";
        clearInterval(timer);
        setTimeout(function() {
          offOn = !offOn;
          num = rdm % 360;
          if (num <= cat * 1) {
            alert("4999元");
          } else if (num <= cat * 2) {
            alert("条50元");
          } else if (num <= cat * 3) {
            alert("10元");
          } else if (num <= cat * 4) {
            alert("5元");
          } else if (num <= cat * 5) {
            alert("免息服务");
          } else if (num <= cat * 6) {
            alert("提交白金");
          } else if (num <= cat * 7) {
            alert("未中奖");
          }
        }, 4000);
      }
    }, 30);
  }
}