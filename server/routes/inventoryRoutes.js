//// filepath: /home/pakue/my-warehouse-management/server/routes/inventoryRoutes.js
/* 在庫マスタのCRUDルート例 */
const express = require('express');
const router = express.Router();
const db = require('../db');

// 全件取得
router.get('/', (req, res) => {
  db.all('SELECT * FROM inventories', [], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: '在庫一覧の取得に失敗しました。' });
    } else {
      res.json(rows);
    }
  });
});

// 新規登録(Create)
router.post('/', (req, res) => {
  const { item_id, current_stock, proper_stock } = req.body;
  const sql = `
    INSERT INTO inventories (item_id, current_stock, proper_stock)
    VALUES (?, ?, ?)
  `;
  db.run(sql, [item_id, current_stock, proper_stock], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: '在庫の登録に失敗しました。' });
    } else {
      res.json({ message: '在庫が登録されました。', inventoryId: this.lastID });
    }
  });
});

// 詳細取得(Read)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM inventories WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: '在庫詳細の取得に失敗しました。' });
    } else {
      res.json(row);
    }
  });
});

// 更新(Update)
router.put('/:id', (req, res) => {
  const { current_stock, proper_stock } = req.body;
  const { id } = req.params;
  db.run(
    'UPDATE inventories SET current_stock = ?, proper_stock = ? WHERE id = ?',
    [current_stock, proper_stock, id],
    function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: '在庫情報の更新に失敗しました。' });
      } else {
        res.json({ message: '在庫情報を更新しました。' });
      }
    }
  );
});

// 削除(Delete)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM inventories WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: '在庫の削除に失敗しました。' });
    } else {
      res.json({ message: '在庫が削除されました。' });
    }
  });
});

module.exports = router;

//// filepath: /home/pakue/my-warehouse-management/server/routes/itemRoutes.js
router.post('/', (req, res) => {
  const { item_name, remarks, current_stock, proper_stock, shelf_id } = req.body;

  db.run(
    'INSERT INTO items (item_name, remarks, shelf_id) VALUES (?, ?, ?)',
    [item_name, remarks, shelf_id], // shelf_idもINSERTに含める
    function (err) {
      if (err) {
        return res.status(500).json({ message: '物品の登録に失敗しました。' });
      }
      const newItemId = this.lastID;

      // 在庫テーブル作成
      db.run(
        'INSERT INTO inventories (item_id, current_stock, proper_stock) VALUES (?, ?, ?)',
        [newItemId, current_stock, proper_stock],
        (invErr) => {
          if (invErr) {
            return res.status(500).json({ message: '在庫の登録に失敗しました。' });
          }
          res.json({ message: '物品が登録されました。', itemId: newItemId });
        }
      );
    }
  );
});