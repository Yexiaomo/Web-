var db;  
var request;  
var objectStore;  
function _create(dbName){  
    request=indexedDB.open(dbName,1);  
      
    request.onerror = function () {  
           alert("打开数据库失败:"+event.target.message);  
    }  
    request.onsuccess = function (event) {  
        alert("打开数据库成功!");  
        db=event.target.result;  
        var transaction = db.transaction(["info"], "readwrite");  
        objectStore = transaction.objectStore("info");  
    }   
    request.onupgradeneeded = function(event) {  
        alert("版本变化！");  
        db = event.target.result;  
        objectStore = db.createObjectStore("info", {keyPath: "userId",autoIncrement: true});  
     }  
}  
     
function _delete(dbName){  
    try{  
        request=indexedDB.deleteDatabase(dbName);  
        request.onerror = function () {  
            alert("删除数据库失败:"+event.target.message);  
        }  
        request.onsuccess = function (event) {  
            alert("删除数据库成功!");  
        }   
    }catch(e){  
       alert(e.getMessage);  
    }  
}  
  
function _get (argument) {  
    var p=document.getElementById("display");  
    p.innerHTML="";//获取数据前先清理一下页面已显示的数据  
    if(!db){  
        alert("请打开数据先！");  
        return false;  
    }  
    var store = db.transaction("info").objectStore("info");  
    var keyRange = IDBKeyRange.lowerBound(0);//规定keyRange从0开始  
    var cursorRequest = store.openCursor(keyRange);//按照keyRange的设置开启游标  
    cursorRequest.onsuccess = function (e) {  
  
        var result = e.target.result;  
  
        if (!!result == false)  
            return;  
  
        _render(result.value);  
        result.continue();//这边执行轮询读取  
    };  
  
    cursorRequest.onerror = function (e) {  
        alert("数据检索失败！");  
    };  
  
}  
  
function _render (e) {  
    var p=document.getElementById("display");  
    p.innerHTML+="姓名:"+e.name+" 年龄:"+e.age+" 性别:"+e.xb+"<br />";  
}  
  
function _add (argument) {  
    var name=document.getElementById("name").value;  
    var age=document.getElementById("age").value;  
    var xb,flag=document.getElementById("nan").checked;  
    if(flag)  
        xb="男";  
    else  
        xb="女";  
    var detail={  
        name:name,  
        age:age,  
        xb:xb  
    }  
    if(!db){  
        alert("请打开数据先！");  
        return false;  
    }  
    var transaction = db.transaction(["info"], "readwrite");  
    objectStore = transaction.objectStore("info");  
    objectStore.add(detail);  
    alert("添加成功！");  
}  