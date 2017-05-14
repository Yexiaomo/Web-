window.onload = function() {
  var odate = document.getElementById('selectDate');
  document.getElementById('submit').onclick = function(){
    alert(odate.value);
  };
}