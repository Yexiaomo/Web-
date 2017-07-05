//通用函数
function g(id) {
  return document.getElementById(id);
}
// postFile对象 封装 变量和函数
var postFile = {
  //init函数 设置初始值
  init: function(){
    var t = this;
    t.regional = g('label');//获取图片区域
    t.getImg = g('getImg'); //获取图片显示区域
    t.editPic = g('editPic');
    t.editBox = g('coverBox');
    t.px = 0;  //预览区域的背景图片的x坐标
    t.py = 0;  //预览区域的背景图片的y坐标
    t.sx = 15; //图片的x坐标
    t.sy = 15; //图片的y坐标
    t.sHeight = 100; //图片的宽
    t.sWidth = 100;  //图片的高
    
    //监听postFile的input表单的change事件-->然后交给handleFiles函数来处理用户上传的文件
    g('postFile').addEventListener("change",t.handleFiles,false);

    //save按钮添加点击事件
    g('saveButton').onclick = function() {
      t.editPic.width = t.sWidth;
      t.editPic.heigth = t.sHeight;
      var ctx = t.editPic.getContext('2d');
      var images = new Image();
      images.src = t.imgUrl;

      images.onload = function() {
        ctx.drawImage(images, t.sx, t.sy, t.sHeight, t.sWidth, 0, 0, t.sHeight, t.sWidth);
        g('showPic').getElementsByTagName('img')[0].src = t.editPic.toDataURL();
        g('download').style.display = 'inline-block';
      }

      //将图片保存到本地
      g('download').onclick = function() {

        // 设定图像显示格式为png,然后再强制改为强制下载
        var localImage = t.editPic.toDataURL("image/png");
        //var localImage = t.editPic.toDataURL("image/png").replace("image/png", "image/octet-stream")

        //设定下载图片的名字
        var filename = '091-综合练习HTML5+CSS3+JS本地图片裁剪.png';

        //下载事件
        var link = document.createElement('a');
        link.href = localImage;
        link.download = filename;
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
      }
    };
  },

  /*
  * 这里就使用了HTML5的File API
  * 首先通过new FileReader()来实例化一个FileReader对象oFReader
  * 再调用其readAsDataURL()方法将文件的内容读取出来并处理成base64编码的格式
  */
  handleFiles: function() {
    var fileList = this.files[0];
    var oFReader = new FileReader();
    oFReader.readAsDataURL(fileList);
    oFReader.onload = function(oFREvent) {
      postFile.paintImg(oFREvent.target.result);
    }
  },

  /*
  *根据容器的大小设定要显示图片的
  *实际大小
  *实际位置
  */
  paintImg: function(url) {
    var t = this;
    var createCanvas = t.getImg.getContext('2d');
    var img = new Image();
    img.src = url;
    img.onload = function() {
      if( img.width<t.regional.offsetWidth && img.height<t.regional.offsetHeight) {
        t.imgWidth = img.width;
        t.imgHeight = img.height;
      } else {
        var pWidth = img.width / (img.height/t.regional.offsetHeight);
        var pHeight = img.height / (img.width/t.regional.offsetWidth);
        t.imgWidth = img.width > img.height ? t.regional.offsetWidth : pWidth;
        t.imgHeight = img.height > img.width ? t.regional.offsetHeight : pHeight;
      }
      t.px = (t.regional.offsetWidth - t.imgWidth) / 2 + 'px';
      t.py = (t.regional.offsetHeight - t.imgHeight) / 2 + 'px';

      t.getImg.height = t.imgHeight;
      t.getImg.width = t.imgWidth;
      t.getImg.style.left = t.px;
      t.getImg.style.top = t.py;

      createCanvas.drawImage(img, 0, 0, t.imgWidth, t.imgHeight);
      t.imgUrl = t.getImg.toDataURL();
      t.cutImage();
      t.drag();
    };
  },
  /*
  *cutImage()两个功能
  *一是制造遮罩层
  *二是利用css的background属性将选中的裁剪区域实时预览
  */
  cutImage: function() {
    var t = this;
    t.editBox.height = t.imgHeight;
    t.editBox.width = t.imgWidth;
    t.editBox.style.display = 'block';
    t.editBox.style.left = t.px;
    t.editBox.style.top = t.py;

    var cover = t.editBox.getContext('2d');
    cover.fillStyle = "rgba(0,0,0,0.5)";
    cover.fillRect(0, 0, t.imgWidth, t.imgHeight);
    cover.clearRect(t.sx, t.sy, t.sHeight, t.sWidth);

    g('showEdit').style.background = 'url('+t.imgUrl+')'+ (-t.sx)+'px '+(-t.sy)+'px no-repeat';
    g('showEdit').style.height = t.sHeight + 'px';
    g('showEdit').style.width = t.sWidth + 'px';
  },

  /*
  *裁剪框跟进鼠标的移动来实时裁剪图片
  */
  drag: function() {
    var t = this;
    var draging = false;
    var startX = 0;
    var startY = 0;

    g('coverBox').onmousemove = function(e) {
      e = e || window.event;

      /*
      * e.pageX 代表鼠标到浏览器左边缘的距离
      * t.regional.offsetLeft + this.offsetLeft 计算出图片到浏览器的左边距离
      * pageX,pageY 是鼠标距离背景图片的距离
      */
      var pageX = e.pageX - (t.regional.offsetLeft + this.offsetLeft);
      var pageY = e.pageY - (t.regional.offsetTop + this.offsetTop);

      //判断鼠标是否在图片区域内部
      if (pageX>t.sx && pageX<(t.sx + t.sWidth) && pageY > t.sy && pageY < (t.sy + t.sHeight) ) {
        this.style.cursor = 'move';
        this.onmousedown = function() {
          draging = true;
          //记录上一次截图时的坐标
          t.ex = t.sx;
          t.ey = t.sy;
          //记录鼠标按时的坐标
          startX = e.pageX - (t.regional.offsetLeft + this.offsetLeft);
          startY = e.pageY - (t.regional.offsetTop + this.offsetTop);
        }
        //鼠标抬起的时候不记录
        window.onmouseup = function() {
          draging = false;
        }

        //在拖动情况下,实时更新t.sx t.sy 并调用 cutImage() 实现实时预览
        if (draging) {

          //移动时裁剪区域的坐标 = 上次记录的定位 + (当前鼠标的位置 - 按下鼠标的位置)
          if (t.ex+(pageX-startX) < 0) {
            t.sx = 0;
          } else if (t.ex+(pageX-startX)+t.sWidth > t.imgWidth){
            t.sx = t.imgWidth - t.sWidth;
          } else {
            t.sx = t.ex + (pageX - startX);
          };

          if (t.ey+(pageY-startY) < 0) {
            t.sy = 0;
          } else if (t.ey+(pageY-startY)+t.sHeight > t.imgHeight){
            t.sy = t.imgHeight - t.sHeight;
          } else {
            t.sy = t.ey + (pageY - startY);
          };

          t.cutImage();
        }
      } else {
        this.style.cursor = 'auto';
      }
    };
  },
}
postFile.init();