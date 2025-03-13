import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 物品詳細情報(物品データ + 棚データ + 在庫データ)をまとめて保持する想定
  const [detail, setDetail] = useState({
    item_name: '',
    remarks: '',
    shelf_name: '',
    x_position: '',
    y_position: '',
    shelf_number: '',
    current_stock: 0,
    proper_stock: 0
  });

  useEffect(() => {
    // サーバ側でJOINするか、複数リクエストをまとめるかは実装次第
    // ここでは例として /api/items/:id が「物品 + 棚 + 在庫」をまとめて返すと仮定
    fetch(`/api/items/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data) setDetail(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleGoToEdit = () => {
    navigate(`/items/${id}/edit`);
  };

  return (
    <div>
      <h2>物品詳細</h2>
      <div>
        <strong>アイテム名:</strong> {detail.item_name}
      </div>
      <div>
        <strong>備考:</strong> {detail.remarks}
      </div>
      <hr />
      <div>
        <strong>棚名:</strong> {detail.shelf_name}
      </div>
      <div>
        <strong>棚位置:</strong> X: {detail.x_position}, Y: {detail.y_position},  
        棚番号: {detail.shelf_number}
      </div>
      <hr />
      <div>
        <strong>現在在庫数:</strong> {detail.current_stock}
      </div>
      <div>
        <strong>適正在庫数:</strong> {detail.proper_stock}
      </div>

      <br />
      <button onClick={handleGoToEdit}>更新</button>
    </div>
  );
}

export default ItemDetail;