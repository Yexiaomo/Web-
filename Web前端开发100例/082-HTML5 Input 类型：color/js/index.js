window.onload = function() {
  document.getElementById('btn').onclick = function(){
    document.getElementById('color').click();
  };
  document.getElementById('color').onchange = function(){
    document.body.style.background = this.value;
  };
}