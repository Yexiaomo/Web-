//对象数组
var contacts = [
  {
    "firstName": "Akira",
    "lastName": "Laine",
    "number": "0543236543",
    "likes": ["Pizza", "Coding", "Brownie Points"]
  },
  {
    "firstName": "Harry",
    "lastName": "Potter",
    "number": "0994372684",
    "likes": ["Hogwarts", "Magic", "Hagrid"]                
  },
  {
    "firstName": "Sherlock",
    "lastName": "Holmes",
    "number": "0487345643",
    "likes": ["Intriguing Cases", "Violin"]
  },
  {
    "firstName": "Kristian",
    "lastName": "Vos",
    "number": "unknown",
    "likes": ["Javascript", "Gaming", "Foxes"]
  }
];

//查找函数
function search(firstName, prop) {
  for (var i = contacts.length - 1; i >= 0; i--) {
    if(contacts[i].firstName == firstName){
      if(contacts[i].hasOwnProperty(prop)){
        return contacts[i][prop];
      }else{
        return "No such property";
      }
    }
  }
  return "No such contact";
}
/*
  实现search()函数的参数传入
  并接收search()函数的返回值
  并将返回值显示在页面内
*/
function fun(){
  //将所需要的查询的case存储在数组之内
  var test = [["Kristian","lastName"],["Sherlock","likes"],["Harry","likes"],["Bob","number"],["Akira","address"]];
  //获取插入的结点
  var item = document.getElementById('item').childNodes;//  ul标签下的子结点
  for (var i = 0; i < test.length; i++) {
    item[i].innerHTML = search(test[i][0],test[i][1]);  // 将值显示在页面内
  }
}