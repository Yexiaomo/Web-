window.onload = function() {
  var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
  var msg;
  db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "棒棒堂")');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "www.51xueweb.cn")');
    msg = '<p>数据表已创建，且插入了两条数据。</p>';
    document.querySelector('#status').innerHTML = msg;
  });
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM LOGS', [], function(tx, results) {
      var len = results.rows.length,
        i;
      msg = "<p>查询记录条数: " + len + "</p>";
      document.querySelector('#status').innerHTML += msg;

      for (i = 0; i < len; i++) {
        msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
        document.querySelector('#status').innerHTML += msg;
      }
    }, null);
  });
}