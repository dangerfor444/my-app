import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import ProductsPage from './pages/ProductsPage';
import AuthorizationPage from './pages/AuthorizationPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AuthorizationPage  />} />
          <Route path="/productsPage" element={<ProductsPage />} />           
        </Routes>
      </div>
    </Router>
  );
};

export default App;