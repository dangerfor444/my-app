import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
//import BasketWindow from '../components/BasketWindow';



const BasketPage = () => {
  const [ showNav, setShowNav] = useState(false);

  return (
    <body class = "productPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Panel admin / Корзина</h1>
        </header>
        <Navbar show = {showNav}/>      
        
    </body>
  );
}

export default BasketPage;
