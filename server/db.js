//// filepath: /home/pakue/my-warehouse-management/server/db.js
/* データベース接続に関する設定 */
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// データベースファイルへのパス(相対パスでもOK)
const dbPath = path.join(__dirname, 'warehouse.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('データベース接続失敗:', err.message);
  } else {
    console.log('データベースに接続されました');
  }
});

module.exports = db;