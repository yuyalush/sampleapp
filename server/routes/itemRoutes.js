//// filepath: /home/pakue/my-warehouse-management/server/routes/itemRoutes.js
/* 物品のCRUDルート例 */
const express = require('express');
const router = express.Router();
const db = require('../db');

// 全件取得
router.get('/', (req, res) => {
  const sql = `
    SELECT
      items.id AS item_id,
      items.item_name,
      items.remarks,
      shelves.shelf_name,
      inventories.current_stock
    FROM items
    LEFT JOIN shelves ON items.shelf_id = shelves.id
    LEFT JOIN inventories ON inventories.item_id = items.id
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '物品一覧の取得に失敗しました。' });
    }
    res.json(rows);
  });
});

// 新規登録(Create) 物品登録時、同時に在庫マスタ作成例
router.post('/', (req, res) => {
  const { item_name, remarks, current_stock, proper_stock, shelf_id } = req.body;

  db.run(
    'INSERT INTO items (item_name, remarks, shelf_id) VALUES (?, ?, ?)',
    [item_name, remarks, shelf_id],
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

// 詳細取得(Read)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT
      items.id AS item_id,
      items.item_name,
      items.remarks,
      items.shelf_id,
      shelves.shelf_name,
      shelves.x_position,
      shelves.y_position,
      shelves.shelf_number,
      inventories.current_stock,
      inventories.proper_stock
    FROM items
    LEFT JOIN shelves ON items.shelf_id = shelves.id
    LEFT JOIN inventories ON inventories.item_id = items.id
    WHERE items.id = ?
  `;
  db.get(sql, [id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: '物品詳細の取得に失敗しました。' });
    }
    if (!row) {
      return res.status(404).json({ message: '該当の物品がありません。' });
    }
    const responseData = {
      id: row.item_id,
      item_name: row.item_name,
      remarks: row.remarks,
      shelf_id: row.shelf_id,
      shelf_name: row.shelf_name,
      x_position: row.x_position,
      y_position: row.y_position,
      shelf_number: row.shelf_number,
      current_stock: row.current_stock,
      proper_stock: row.proper_stock
    };
    res.json(responseData);
  });
});

// 更新(Update)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    item_name,
    remarks,
    shelf_id,
    current_stock,
    proper_stock
  } = req.body;

  db.serialize(() => {
    // itemsを更新 (shelf_id含む)
    db.run(
      'UPDATE items SET item_name = ?, remarks = ?, shelf_id = ? WHERE id = ?',
      [item_name, remarks, shelf_id, id],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: '物品の更新に失敗しました。' });
        }
      }
    );

    // inventories更新 (Items:Inventoriesは1:1想定)
    db.run(
      'UPDATE inventories SET current_stock = ?, proper_stock = ? WHERE item_id = ?',
      [current_stock, proper_stock, id],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: '在庫の更新に失敗しました。' });
        }
        res.json({ message: 'すべての情報を更新しました。' });
      }
    );
  });
});

// 削除(Delete)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ message: '物品の削除に失敗しました。' });
    } else {
      // inventories からも削除(例)
      db.run('DELETE FROM inventories WHERE item_id = ?', [id], function (invErr) {
        if (invErr) {
          console.error(invErr);
        }
      });
      res.json({ message: '物品が削除されました。' });
    }
  });
});

module.exports = router;