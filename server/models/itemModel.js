//// filepath: /home/pakue/my-warehouse-management/server/models/itemModel.js
/* 物品マスタ(items)に対応するモデルの例 */
const db = require('../db');

// このファイルが読み込まれたときにテーブルがなければ作成する
db.run(`
CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_name TEXT NOT NULL,
  remarks TEXT,
  shelf_id INTEGER,  -- 追加: どの棚に属するか
  FOREIGN KEY (shelf_id) REFERENCES shelves(id)
)
`);