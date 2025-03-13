import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>物品一覧</h2>
      <table>
        <thead>
          <tr>
            <th>物品の名前</th>
            <th>棚の名前</th>
            <th>現在の在庫数</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.item_id}>
              <td>
                <Link to={`/items/${item.item_id}`}>{item.item_name}</Link>
              </td>
              <td>{item.shelf_name}</td>
              <td>{item.current_stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;