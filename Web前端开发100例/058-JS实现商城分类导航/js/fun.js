window.onload=function(){
  var aLi=document.getElementsByTagName("li");
  for(var i=0;aLi.length>i;i++){
    aLi[i].i=i;
    aLi[i].onmouseover=function(){
      this.className="liname";

      var h1=this.i*25;
      var h2=this.getElementsByTagName("div")[0].offsetHeight;
      if(h2<h1){
        this.getElementsByTagName("div")[0].style.top=h1+'px';
      }
    }
    aLi[i].onmouseout=function(){
      this.className="";
    }
  }
}