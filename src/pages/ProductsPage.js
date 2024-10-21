import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import AddProduct from '../components/AddProduct';
import Card from '../components/Card';
import '../css/navbar.css'

const ProductsPage = () => {
  const [ showNav, setShowNav] = useState(false);
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
};

  return (
    <body class = "productPage">
      <header class = "menu">
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        <h1>Panel admin / Товары</h1>
        </header>
        <Navbar show = {showNav}/>      
        <div class = "cont container_cards">
        {products.map((product, index) => (
          <Card 
            key={index} 
            title={product.title} 
            price={product.price} 
            imgPhoto={product.imgPhoto} 
          />
        ))}
        </div>
    </body>
  );
}

export default ProductsPage;
