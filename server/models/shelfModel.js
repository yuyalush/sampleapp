//// filepath: /home/pakue/my-warehouse-management/server/models/shelfModel.js
const db = require('../db');

// 1:N用に item_id カラムを削除し、単独で棚を表す
db.run(`
CREATE TABLE IF NOT EXISTS shelves (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shelf_name TEXT NOT NULL,
  x_position INTEGER NOT NULL,
  y_position INTEGER NOT NULL,
  shelf_number INTEGER NOT NULL
)
`);