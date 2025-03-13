import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function CreateItem() {
  const [searchParams] = useSearchParams();
  const defaultShelfId = searchParams.get('shelf_id') || '';
  const [item_name, setItemName] = useState('');
  const [remarks, setRemarks] = useState('');
  const [current_stock, setCurrentStock] = useState(0);
  const [proper_stock, setProperStock] = useState(0);
  const [shelves, setShelves] = useState([]);
  const [shelf_id, setShelfId] = useState(defaultShelfId);

  useEffect(() => {
    // 棚一覧を読み込み、選択用に表示
    fetch('/api/shelves')
      .then(res => res.json())
      .then(data => setShelves(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_name,
        remarks,
        current_stock,
        proper_stock,
        shelf_id
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || '登録が完了しました');
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>物品登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>アイテム名：</label>
          <input
            type="text"
            value={item_name}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <label>備考：</label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <div>
          <label>現在在庫数：</label>
          <input
            type="number"
            value={current_stock}
            onChange={(e) => setCurrentStock(e.target.value)}
          />
        </div>
        <div>
          <label>適正在庫数：</label>
          <input
            type="number"
            value={proper_stock}
            onChange={(e) => setProperStock(e.target.value)}
          />
        </div>
        <div>
          <label>棚選択：</label>
          <select
            value={shelf_id}
            onChange={(e) => setShelfId(e.target.value)}
          >
            <option value="">選択してください</option>
            {shelves.map(shelf => (
              <option key={shelf.id} value={shelf.id}>
                {shelf.shelf_name} (ID: {shelf.id})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default CreateItem;