window.onload = function() {

  //首先，禁用页面的鼠标选中拖动的事件，就是不运行执行选中操作。
  var bodyStyle = document.body.style;
  bodyStyle.mozUserSelect = 'none';
  bodyStyle.webkitUserSelect = 'none';

  //接着我们定义图片类，获取canvas元素，并设置背景和位置属性。
  var img = new Image();
  var canvas = document.querySelector('canvas');
  canvas.style.backgroundColor = 'transparent';
  canvas.style.position = 'absolute';

  //我们在本例中用到两张随机照片，每次刷新随机一张图片作为背景。
  var imgs = ['1.jpg', '2.jpg'];
  var num = Math.floor(Math.random() * 2);
  img.src = 'images/'+imgs[num];

  //然后进入主体，当检测到图片加载完的时候，首先定义一些属性和函数，函数layer()用来绘制一个灰色的正方形，eventDown()定义了按下事件eventUp()定义了松开事件，eventMove()定义了移动事件，其中当按下时，获取坐标位移，并通过arc(x, y, 10, 0, Math.PI * 2)来绘制小圆点。
  img.addEventListener('load',
  function(e) {
    e = e || window.event;
    var ctx;
    var w = img.width,
    h = img.height;
    var offsetX = canvas.offsetLeft,
    offsetY = canvas.offsetTop;
    var mousedown = false;

    function layer(ctx) {
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, w, h);
    }

    function eventDown(e) {
      e = e || window.event;
      e.preventDefault();
      mousedown = true;
    }

    function eventUp(e) {
      e = e || window.event;
      e.preventDefault();
      mousedown = false;
    }

    function eventMove(e) {
      e = e || window.event;
      e.preventDefault();
      if (mousedown) {
        if (e.changedTouches) {
          e = e.changedTouches[e.changedTouches.length - 1];
        }
        var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
        y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
        with(ctx) {
          beginPath()

          //绘制圆点。 
          arc(x, y, 10, 0, Math.PI * 2);
          fill();
        }
      }
    }

    //最后，通过canvas调用以上函数，绘制图形，并且侦听触控及鼠标事件，调用相应的函数。
    canvas.width = w;
    canvas.height = h;
    canvas.style.backgroundImage = 'url(' + img.src +')';
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, w, h); //绘制矩形。 
    layer(ctx);

    ctx.globalCompositeOperation = 'destination-out';

    canvas.addEventListener('touchstart', eventDown);
    canvas.addEventListener('touchend', eventUp);
    canvas.addEventListener('touchmove', eventMove);
    canvas.addEventListener('mousedown', eventDown);
    canvas.addEventListener('mouseup', eventUp);
    canvas.addEventListener('mousemove', eventMove);
  });
}