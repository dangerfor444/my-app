import React from 'react';
import { useLocation } from 'react-router-dom';
import logo from './logo.png'
import { FaRegNewspaper } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
//import { TbBrandDatabricks } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa"
import { CiLogout } from "react-icons/ci";
import '../css/navbar.css'
const Navbar = ({show}) => {

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
        <div class = {show ? 'sidenav active' : 'sidenav'} >
          <img src={logo} alt="logo" class = "logo" />
          <span class ="login_user">Admin</span>
          <ul>
            <li>
             <a href = '/'><FaRegNewspaper />Новости</a>
            </li>
            <li class={isActive('/productsPage') ? 'active-link' : ''}>
              <a href='/productsPage'><FaBoxOpen />Товары</a>
            </li>
            <li class={isActive('/CatalogPage') ? 'active-link' : ''}>
             <a href = '/CatalogPage'><AiOutlineProduct/>Каталог</a>
            </li>
            <li class = "logout">
             <a href = '/'><CiLogout />Выйти</a>
            </li>
          </ul>
        </div>
  );
}

export default Navbar;

