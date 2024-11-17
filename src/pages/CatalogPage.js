import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";

import Catalog from '../components/Catalog';


const CatalogPage = () => {
  const [ showNav, setShowNav] = useState(false);

  return (
    <body class = "productPage" onMouseEnter={() => setShowNav(true)}>
      <header class = "menu" >
      <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
        <h1>Panel admin / Каталог</h1>
        </header>
        <Navbar show = {showNav}/>      
        <Catalog />
    </body>
  );
}

export default CatalogPage;
