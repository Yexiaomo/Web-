window.onload = function() {
  //为源对象添加事件监听 —— 记录拖动了哪一个源对象  
  var srcList = document.querySelectorAll('.src');//找到全部img元素  
  for(var i=0; i<srcList.length; i++){ //遍历img元素  
    var p = srcList[i];  
    p.ondragstart = function(e){ //开始拖动源对象  
      e.dataTransfer.setData('PlaneID',this.id);//保存数据--该img元素的id  
    }  
    p.ondrag = function(){}  
    p.ondragend = function(){}  
  }  

  //为目标对象添加事件监听 —— 删除拖动的源对象  
  trash.ondragenter = function(){ //源对象进入目标对象  
    console.log('drag enter');  
    trash.style.opacity = "1"; //将透明度变成1  
  }  
  trash.ondragleave= function(){  //源对象离开目标对象后  
    console.log('drag leave');  
    trash.style.opacity = ".2"; //将透明度变为0.2  
  }  
  trash.ondragover= function(e){  //源对象在悬停在目标对象上时  
    e.preventDefault();  //阻止默认行为，使得drop可以触发  
  }  
  trash.ondrop= function(e){ //源对象松手释放在了目标对象中  
    console.log('drop');  
    trash.style.opacity = ".2"; //将透明度变为0.2  
    //删除被拖动的源对象  
    var id = e.dataTransfer.getData('PlaneID');//得到数据--id值  
    var p = document.getElementById(id); //根据id值找到相关的元素  
    p.parentNode.removeChild(p);  //从父元素中删除子节点  
  }
}