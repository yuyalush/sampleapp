//// filepath: /home/pakue/my-warehouse-management/server/routes/shelfRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 全件取得
router.get('/', (req, res) => {
  db.all('SELECT * FROM shelves', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: '棚一覧の取得に失敗しました。' });
    }
    res.json(rows);
  });
});

// 新規登録(Create)
router.post('/', (req, res) => {
  const { shelf_name, x_position, y_position, shelf_number } = req.body;
  db.run(
    'INSERT INTO shelves (shelf_name, x_position, y_position, shelf_number) VALUES (?, ?, ?, ?)',
    [shelf_name, x_position, y_position, shelf_number],
    function (err) {
      if (err) {
        return res.status(500).json({ message: '棚の登録に失敗しました。' });
      }
      const newShelfId = this.lastID; // ← 作成された棚のID
      return res.json({ message: '棚が登録されました。', shelfId: newShelfId });
    }
  );
});

// 詳細取得(Read)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM shelves WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: '棚詳細の取得に失敗しました。' });
    }
    if (!row) {
      return res.status(404).json({ message: '該当の棚がありません。' });
    }
    res.json(row);
  });
});

// 更新(Update)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { shelf_name, x_position, y_position, shelf_number } = req.body;
  db.run(
    'UPDATE shelves SET shelf_name=?, x_position=?, y_position=?, shelf_number=? WHERE id=?',
    [shelf_name, x_position, y_position, shelf_number, id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: '棚の更新に失敗しました。' });
      }
      res.json({ message: '棚情報が更新されました。' });
    }
  );
});

// 削除(Delete)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM shelves WHERE id=?', [id], function (err) {
    if (err) {
      return res.status(500).json({ message: '棚の削除に失敗しました。' });
    }
    res.json({ message: '棚が削除されました。' });
  });
});

module.exports = router;