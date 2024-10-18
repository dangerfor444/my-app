import React from 'react';
import logo from './logo.png'
import { FaRegNewspaper } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { TbBrandDatabricks } from "react-icons/tb";
import { FaBoxOpen } from "react-icons/fa"
import { CiLogout } from "react-icons/ci";
import '../css/navbar.css'
const Navbar = ({show}) => {
  return (
        <div class = {show ? 'sidenav active' : 'sidenav'}>
          <img src={logo} alt="logo" class = "logo" />
          <span class ="login_user">UserLogin</span>
          <ul>
            <li>
             <a href = '/'><FaRegNewspaper />Новости</a>
            </li>
            <li>
             <a href = '/'><FaUsers />Пользователи</a>
            </li>
            <li>
             <a href = '/'><TbBrandDatabricks />Бренды</a>
            </li>
            <li class = "products">
             <a href = '/productsPage'><FaBoxOpen />Товары</a>
            </li>
            <li>
             <a href = '/'><AiOutlineProduct class = "svg"/>Каталог</a>
            </li>
            <li class = "logout">
             <a href = '/'><CiLogout />Выйти</a>
            </li>
          </ul>
        </div>
  );
}

export default Navbar;

