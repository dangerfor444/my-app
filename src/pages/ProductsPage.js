import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import AddProduct from '../components/AddProduct';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { FaList } from "react-icons/fa";




const ProductsPage = () => {
  const [showNav, setShowNav] = useState(false);

  const [products, setProducts] = useState( () => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(() => { 
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]); 

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };



  return (
    <body class = "productPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Panel admin / Товары</h1>
        </header>
        <Navbar show = {showNav}/>      
        <AddProduct onAddProduct={handleAddProduct}/>
        <FaList class = "ListProductIcon"/>
        <h2 class = "ProductList">Список товаров</h2>
        <div class = "cont container_cards">
        {products.map((product) => (       
          <Card 
          key={product.id} 
          product={product}
          onOpenModal={handleOpenModal}
           />
           
        ))}
        </div>
        <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />
    </body>
  );
}

export default ProductsPage;
