//// filepath: /home/pakue/my-warehouse-management/server/index.js
/* エントリーポイント: サーバ起動 */
const express = require('express');
const cors = require('cors');
const app = express();

// ルータファイルを呼び出す
const itemRoutes = require('./routes/itemRoutes');
const shelfRoutes = require('./routes/shelfRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// データベース接続
require('./models/itemModel');
require('./models/shelfModel');
require('./models/inventoryModel');

// ミドルウェア設定
app.use(cors());
app.use(express.json());

// ルート設定
app.use('/api/items', itemRoutes);
app.use('/api/shelves', shelfRoutes);
app.use('/api/inventories', inventoryRoutes);

// サーバ起動
const PORT = 3001; // お好みのポート番号
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});