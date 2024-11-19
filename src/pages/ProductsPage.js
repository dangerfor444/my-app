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

  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => { 
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]); 

  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now() 
    };
    setProducts(prevProducts => [...prevProducts, productWithId]);
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <body class = "productPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Panel admin / Товары</h1>
        </header>
        <Navbar show = {showNav}/>      
        <AddProduct onAddProduct={handleAddProduct}/>
        <div class = "bar-list">
        <FaList class = "ListProductIcon"/>
        <h2 class = "ProductList">Список товаров</h2>
        <div class="search-container">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          class="search-input"
        />
        
      </div>
      
      </div>
        <div class = "cont container_cards">
        {filteredProducts.map((product) => (       
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
        onDelete={handleDeleteProduct}
      />
    </body>
  );
}

export default ProductsPage;
