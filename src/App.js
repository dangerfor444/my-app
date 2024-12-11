import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import ProductsPage from './pages/ProductsPage';
import AuthorizationPage from './pages/AuthorizationPage';

import CatalogPage from './pages/CatalogPage';
import { CategoryProvider } from './props/CategoryContext';

const App = () => {
  return (
    <CategoryProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthorizationPage  />} />
          <Route path="/productsPage" element={<ProductsPage />} />        
          <Route path="/CatalogPage" element={<CatalogPage />} />     
        </Routes>
      </div>
    </Router>
    </CategoryProvider>
  );
};

export default App;