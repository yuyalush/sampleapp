import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    item_name: '',
    remarks: '',
    shelf_id: '',
    current_stock: 0,
    proper_stock: 0
  });
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    // 物品の詳細を取得
    fetch(`/api/items/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) setEditData({
          item_name: data.item_name || '',
          remarks: data.remarks || '',
          shelf_id: data.shelf_id || '',
          current_stock: data.current_stock || 0,
          proper_stock: data.proper_stock || 0
        });
      })
      .catch(err => console.error(err));

    // 既存棚一覧を取得
    fetch('/api/shelves')
      .then(res => res.json())
      .then(data => setShelves(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (key, value) => {
    setEditData(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || '更新が完了しました');
        navigate('/items');
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>物品編集</h2>

      <div>
        <label>アイテム名：</label>
        <input
          type="text"
          value={editData.item_name}
          onChange={(e) => handleChange('item_name', e.target.value)}
        />
      </div>

      <div>
        <label>備考：</label>
        <input
          type="text"
          value={editData.remarks}
          onChange={(e) => handleChange('remarks', e.target.value)}
        />
      </div>

      {/* 棚を変更するためのプルダウン */}
      <div>
        <label>棚：</label>
        <select
          value={editData.shelf_id}
          onChange={(e) => handleChange('shelf_id', e.target.value)}
        >
          <option value="">棚を選択</option>
          {shelves.map(shelf => (
            <option key={shelf.id} value={shelf.id}>
              {shelf.shelf_name} (ID: {shelf.id})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>現在在庫数：</label>
        <input
          type="number"
          value={editData.current_stock}
          onChange={(e) => handleChange('current_stock', e.target.value)}
        />
      </div>

      <div>
        <label>適正在庫数：</label>
        <input
          type="number"
          value={editData.proper_stock}
          onChange={(e) => handleChange('proper_stock', e.target.value)}
        />
      </div>

      <button onClick={handleUpdate}>更新</button>
    </div>
  );
}

export default ItemEdit;