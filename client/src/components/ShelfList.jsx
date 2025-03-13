import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ShelfList() {
  const [shelves, setShelves] = useState([]);
  const [shelf_name, setShelfName] = useState('');
  const [x_position, setXPosition] = useState('');
  const [y_position, setYPosition] = useState('');
  const [shelf_number, setShelfNumber] = useState('');

  useEffect(() => {
    fetch('/api/shelves')
      .then(res => res.json())
      .then(data => setShelves(data))
      .catch(err => console.error(err));
  }, []);

  const handleCreate = () => {
    fetch('/api/shelves', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shelf_name, x_position, y_position, shelf_number })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || '棚が登録されました');
        const newShelfId = data.shelfId; // サーバで返すように変更

        // ここで newShelfId を使って物品登録などの処理ができる
        // 例: navigate(`/create-item?shelf_id=${newShelfId}`);

        // 再読み込み
        return fetch('/api/shelves')
          .then(res => res.json())
          .then(refresh => setShelves(refresh));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>棚一覧</h2>
      <ul>
        {shelves.map(shelf => (
          <li key={shelf.id}>
            {/* 棚名をクリックすると詳細ページへ */}
            <Link to={`/shelves/${shelf.id}`}>
              {shelf.shelf_name} / X: {shelf.x_position}, Y: {shelf.y_position}, 棚番号: {shelf.shelf_number}
            </Link>
          </li>
        ))}
      </ul>

      <h3>棚の新規登録</h3>
      <div>
        <label>棚名：</label>
        <input
          type="text"
          value={shelf_name}
          onChange={(e) => setShelfName(e.target.value)}
        />
      </div>
      <div>
        <label>X位置：</label>
        <input
          type="number"
          value={x_position}
          onChange={(e) => setXPosition(e.target.value)}
        />
      </div>
      <div>
        <label>Y位置：</label>
        <input
          type="number"
          value={y_position}
          onChange={(e) => setYPosition(e.target.value)}
        />
      </div>
      <div>
        <label>棚番号：</label>
        <input
          type="number"
          value={shelf_number}
          onChange={(e) => setShelfNumber(e.target.value)}
        />
      </div>
      <button onClick={handleCreate}>登録</button>
    </div>
  );
}

export default ShelfList;