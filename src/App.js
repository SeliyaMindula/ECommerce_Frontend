import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import HomePage from'./pages/Homepage';
import FavProductPage from './pages/FavProductPage';
import EditProductPage from './pages/EditProductpage';
import SearchResultsPage from './pages/SearchResultspage';

// ... other imports

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/Favorite" element={<FavProductPage />} />
        <Route path="/edit-products/:id" element={<EditProductPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        {/* Define other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
