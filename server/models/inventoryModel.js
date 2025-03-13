//// filepath: /home/pakue/my-warehouse-management/server/models/inventoryModel.js
/* 在庫マスタ(inventories)に対応するモデルの例 */
const db = require('../db');

db.run(`
CREATE TABLE IF NOT EXISTS inventories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER NOT NULL,
  current_stock INTEGER NOT NULL,
  proper_stock INTEGER NOT NULL,
  FOREIGN KEY (item_id) REFERENCES items(id)
)
`);

/*
  items(物品マスタ)が親、
  inventories(在庫マスタ)が子というリレーション関係。
*/