window.onload = function() {
  var c=document.getElementById("myCanvas");
  c.setAttribute('height','100');
  c.setAttribute('width','200');
  var ctx=c.getContext("2d");
  ctx.font="30px Arial";
  ctx.strokeText("Hello World",20,60);
}