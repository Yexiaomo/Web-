//数据定义
var data = [
  {img:'1 (0).jpg',caption:'caption0',desc:'desc0'},
  {img:'1 (1).jpg',caption:'caption1',desc:'desc1'},
  {img:'1 (2).jpg',caption:'caption2',desc:'desc2'},
  {img:'1 (3).jpg',caption:'caption3',desc:'desc3'},
  {img:'1 (4).jpg',caption:'caption4',desc:'desc4'},
  {img:'1 (5).jpg',caption:'caption5',desc:'desc5'},
  {img:'1 (6).jpg',caption:'caption6',desc:'desc6'},
  {img:'1 (7).jpg',caption:'caption7',desc:'desc7'},
  {img:'1 (8).jpg',caption:'caption8',desc:'desc8'},
  {img:'1 (9).jpg',caption:'caption9',desc:'desc9'},
  {img:'1 (10).jpg',caption:'caption10',desc:'desc10'},
  {img:'1 (11).jpg',caption:'caption11',desc:'desc11'},
  {img:'1 (12).jpg',caption:'caption12',desc:'desc12'},
  {img:'1 (13).jpg',caption:'caption13',desc:'desc13'},
];

// 通用函数,可以通过 id 或者 className 获取对象
function g(id){
  var _c = id.substr(0,1);
  if ( _c == '.') {
    //注意这里返回的是一个数组
    return document.getElementsByClassName(id.substr(1));
  } else if ( _c == '#') {
    return document.getElementById(id.substr(1));
  }
  return _c;
}
// 随机生成一个整数 
function getRandom( range ) {
  var max = Math.max(range[0],range[1]);
  var min = Math.min(range[0],range[1]);
  
  return Math.floor(Math.random()*max+min);

}
//计算左右区域的范围 { left:{x:[min,max], y:[min,max]}, right:{x:[min,max], y:[min,max]}}
function getRange() {
  var range = { left:{x:[], y:[]}, right:{x:[], y:[]} };
  var wrap = {
    w:g('#wrap').clientWidth,
    h:g('#wrap').clientHeight
  }
  var photo = {
    w:g('.photo')[0].clientWidth,
    h:g('.photo')[0].clientHeight
  }

  range.wrap = wrap;
  range.photo = photo;

  //左边范围
  range.left.x = [-photo.w/3, wrap.w/2 - photo.w/2];
  range.left.y = [-photo.h/3, wrap.h-photo.h/3];

  //右边范围
  range.right.x = [ wrap.w/2, wrap.w-photo.w];
  range.right.y = range.left.y;

  return range;
}


//1. 向页面加载数据
function addPhotos() {
  //获取模板字符串
  var template = g('#wrap').innerHTML;
  //实际输出的字符串内容
  var html = [];
  //导航按钮(每多一张图片,增加一个元素)
  var nav = [];

  //替换模板数据字符串的内容
  for(i in data) {
    var _html = template
                      .replace('{{index}}',i)
                      .replace('{{img}}',data[i].img)
                      .replace('{{caption}}',data[i].caption)
                      .replace('{{desc}}',data[i].desc);
    html.push(_html);
    nav.push('<span id="nav_'+i+'" class="i" onclick="turn( g(\'#photo_'+i+'\') )">&nbsp;</span>');
  }
  html.push('<div class="nav">'+nav.join('')+'</div>');
  g('#wrap').innerHTML = html.join('');

  //将数据显示到页面时,随机选取一张图片放到最中央
  sortPhoto( getRandom([0,data.length]));
  return [html,nav];
}
addPhotos();

//2. 排序图片
function sortPhoto(index) {
  //首先判断所点击的图片是否已经在正中央
  if (/photo_center/.test(g('#photo_'+index).className)) {
    return;
  }
  var _photo = g('.photo');
  var photos = [];
  for (var i = 0; i < _photo.length; i++) {
    _photo[i].className = _photo[i].className.replace(/\s*photo_center\s*/,'');
    _photo[i].className = _photo[i].className.replace(/\s*photo_front\s*/,'');
    _photo[i].className = _photo[i].className.replace(/\s*photo_back\s*/,'');
    _photo[i].className += ' photo_front';
    _photo[i].style.left = '';
    _photo[i].style.top = '';
    _photo[i].style['-webkit-transform'] = 'rotate(0deg)';
    _photo[i].style['-ms-transform'] = 'rotate(0deg)';
    _photo[i].style['-o-transform'] = 'rotate(0deg)';
    _photo[i].style['transform'] = 'rotate(0deg)';
    photos.push( _photo[i] );
  }

  //选取index图片居中
  var photo_center = g('#photo_' + index);
  photo_center.className += ' photo_center';
  photo_center = photos.splice(index,1)[0];
  // console.log(photos.length);
  
  //把图片分为左右两部分
  var photo_left = photos.splice(0,Math.ceil(photos.length/2));
  var photo_right = photos;
  // console.log(photo_left.length);
  // console.log(photo_right.length);

  //获取图片区的范围
  var ranges = getRange();

  //左边区域图片设定随机位置
  for (i in photo_left) {
    var p = photo_left[i];
    p.style.left = getRandom(ranges.left.x)+'px';
    p.style.top = getRandom(ranges.left.y)+'px';
    p.style['-webkit-transform'] = 'rotate('+getRandom([-90,90])+'deg)';
    p.style['-ms-transform'] = 'rotate('+getRandom([-90,90])+'deg)';
    p.style['-o-transform'] = 'rotate('+getRandom([-90,90])+'deg)';
    p.style['transform'] = 'rotate('+getRandom([-90,90])+'deg)';
  }

  //右边区域图片设定随机位置
  for (i in photo_right) {
    var p = photo_right[i];
    p.style.left = getRandom(ranges.right.x)+'px';
    p.style.top = getRandom(ranges.right.y)+'px';
    p.style['-webkit-transform'] = 'rotate('+getRandom([-90,90])+'deg)';
    p.style['-ms-transform'] = 'rotate('+getRandom([-90,90])+'deg)';
    p.style['-o-transform'] = 'rotate('+getRandom([-90,90])+'deg)';
    p.style['transform'] = 'rotate('+getRandom([-90,90])+'deg)';
  }
  var navs = g('.i');
  for (var i = 0; i < navs.length; i++) {
    navs[i].className = navs[i].className.replace(/\s*i_current/,'');
    navs[i].className = navs[i].className.replace(/\s*i_back/,'');
  }
  g('#nav_'+index).className += ' i_current';
  // console.log(photos.length);
  g('#photo_'+index).onclick(turn(g('#photo_'+index)));
}
//控制图片翻转
function turn(elem) {
  var cls = elem.className;
  var index = elem.id.split('_')[1];
  if (!/photo_center/.test(cls) ) {
    sortPhoto(index);
    return;
  }
  if( /photo_front/.test(cls) ){
    cls = cls.replace(/photo_front/,'photo_back');
    g('#nav_'+index).className = g('#nav_'+index).className.replace(/i_current/,'i_back');
  } else {
    cls = cls.replace(/photo_back/,'photo_front');
    g('#nav_'+index).className = g('#nav_'+index).className.replace(/i_back/,'i_current');
  }
  return elem.className = cls;
}