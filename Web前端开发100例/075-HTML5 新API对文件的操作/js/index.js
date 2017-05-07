window.onload = function() {
  (function () {
    var viewFiles = document.getElementById("viewFiles");
    var viewImg = document.getElementById("viewImg");
    function viewFile (file) {
        //通过file.size可以取得图片大小
        var reader = new FileReader();
        reader.onload = function( evt ){
            viewImg.src = evt.target.result;
        }
        reader.readAsDataURL(file);
    }
    viewFiles.addEventListener("change", function () {
        //通过 this.files 取到 FileList ，这里只有一个
        viewFile(this.files[0]);
    }, false);
  })();
}