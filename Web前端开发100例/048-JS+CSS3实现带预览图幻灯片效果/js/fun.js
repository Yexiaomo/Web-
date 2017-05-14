//1.数据定义
var data = [
  {img:1,h2:'h1 caption',h3:'h3 caption'},
  {img:2,h2:'h1 caption',h3:'h3 caption'},
  {img:3,h2:'h1 caption',h3:'h3 caption'},
  {img:4,h2:'h1 caption',h3:'h3 caption'},
  {img:5,h2:'h1 caption',h3:'h3 caption'},
  {img:6,h2:'h1 caption',h3:'h3 caption'},
  {img:7,h2:'h1 caption',h3:'h3 caption'}
];

//2.通用函数
var g = function(id){
  if (id.substr(0,1) == '.') {
    //注意这里返回的是一个数组
    return document.getElementsByClassName(id.substr(1));
  }
  return document.getElementById(id);
}
//3.添加幻灯片及对应的按钮
function addSilders(){
  // 获取模板,并清除模板前后的空白
  var tpl_main = g('template_main').innerHTML
                                              .replace(/^\s*/,'')
                                              .replace(/\s*$/,'');
  var tpl_ctrl = g('template_ctrl').innerHTML
                                              .replace(/^\s*/,'')
                                              .replace(/\s*$/,'');
  //定义最终输出 HTML 变量
  var out_main = [];
  var out_ctrl = [];
  // 遍历数组,向 HTML 输出所有内容
  for( i in data ){
    //带下划线的都是临时变量
    var _html_main = tpl_main
                              .replace(/{{index}}/g,data[i].img)
                              .replace(/{{h2}}/g,data[i].h2)
                              .replace(/{{h3}}/g,data[i].h3);
    var _html_ctrl = tpl_ctrl
                              .replace(/{{index}}/g,data[i].img);
    out_main.push(_html_main);
    out_ctrl.push(_html_ctrl);
  }
  // 把HTML 回写到相应的 DOM 内
  g('template_main').innerHTML = out_main.join('');
  g('template_ctrl').innerHTML = out_ctrl.join('');
}
//4.幻灯片切换
function switchSilder(n){
  //获取要展现的幻灯片&控制按钮 DOM
  var main = g('main_'+n);
  var ctrl = g('ctrl_'+n);
  //获取所有幻灯片&控制按钮
  var clear_main = g('.main-i');
  var clear_ctrl = g('.ctrl-i');
  for (var i = 0; i < clear_ctrl.length; i++) {
    clear_main[i].className = clear_main[i].className
                                                      .replace('main-i_active','');
    clear_ctrl[i].className = clear_ctrl[i].className
                                                      .replace('ctrl-i_active','');
  }
  main.className += (' main-i_active');
  ctrl.className += (' ctrl-i_active');
}
//5.何时处理幻灯片输出
window.onload=function(){
  if(!document.getElementsByClassName){
      document.getElementsByClassName = function(className, element){
      var children = (element || document).getElementsByTagName('*');
      var elements = new Array();
      for (var i=0; i<children.length; i++){
        var child = children[i];
        var classNames = child.className.split(' ');
        for (var j=0; j<classNames.length; j++){
        if (classNames[j] == className){ 
            elements.push(child);
            break;
        }
          }
        } 
        return elements;
      };
    }
  addSilders();
  switchSilder(6);
  setTimeout(function(){moveImg()},100);
}
//6.动态调整图片的大小,使其垂直居中
function moveImg(){
  var pics = g('.pic');
  for (var i = 0; i < pics.length; i++) {
    pics[i].style.marginTop = ( -1 * pics[i].clientHeight/2)+"px";
  }
}