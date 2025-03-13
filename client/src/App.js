//// filepath: /home/pakue/my-warehouse-management/client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemEdit from './components/ItemEdit';
import ShelfList from './components/ShelfList';
import ShelfDetail from './components/ShelfDetail';
import CreateItem from './components/CreateItem';

function App() {
  return (
    <Router>
      <nav style={{ margin: '1rem' }}>
        <Link to="/items" style={{ marginRight: '1rem' }}>物品一覧</Link>
        <Link to="/shelves" style={{ marginRight: '1rem' }}>棚一覧</Link>
        <Link to="/create-item">物品登録</Link>
      </nav>

      <Routes>
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        {/* 物品詳細更新用の画面 */}
        <Route path="/items/:id/edit" element={<ItemEdit />} />

        <Route path="/shelves" element={<ShelfList />} />
        <Route path="/shelves/:id" element={<ShelfDetail />} />
        <Route path="/create-item" element={<CreateItem />} />

        <Route path="*" element={<div>ページが見つかりません</div>} />
      </Routes>
    </Router>
  );
}

export default App;