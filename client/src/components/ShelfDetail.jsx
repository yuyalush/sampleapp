//// filepath: /home/pakue/my-warehouse-management/client/src/components/ShelfDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ShelfDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shelfData, setShelfData] = useState({
    shelf_name: '',
    x_position: '',
    y_position: '',
    shelf_number: ''
  });

  // 初期表示時に棚情報を取得
  useEffect(() => {
    fetch(`/api/shelves/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) setShelfData(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  // 更新
  const handleUpdate = () => {
    fetch(`/api/shelves/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shelf_name: shelfData.shelf_name,
        x_position: shelfData.x_position,
        y_position: shelfData.y_position,
        shelf_number: shelfData.shelf_number
      })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || '棚情報が更新されました');
        navigate('/shelves'); // 棚一覧へ戻る
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>棚の詳細・更新</h2>
      <div>
        <label>棚名：</label>
        <input
          type="text"
          value={shelfData.shelf_name}
          onChange={(e) => setShelfData({ ...shelfData, shelf_name: e.target.value })}
        />
      </div>
      <div>
        <label>X位置：</label>
        <input
          type="number"
          value={shelfData.x_position}
          onChange={(e) => setShelfData({ ...shelfData, x_position: e.target.value })}
        />
      </div>
      <div>
        <label>Y位置：</label>
        <input
          type="number"
          value={shelfData.y_position}
          onChange={(e) => setShelfData({ ...shelfData, y_position: e.target.value })}
        />
      </div>
      <div>
        <label>棚番号：</label>
        <input
          type="number"
          value={shelfData.shelf_number}
          onChange={(e) => setShelfData({ ...shelfData, shelf_number: e.target.value })}
        />
      </div>

      <button onClick={handleUpdate}>更新</button>
    </div>
  );
}

export default ShelfDetail;