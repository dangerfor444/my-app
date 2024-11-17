import React from 'react';
import '../css/basketStyle.css'
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const BasketWindow = () => {
  return (
    <section class="section-cart">
        <div class="section-cart__body">
            <div class="container">
                <section class="cart">
                    <header class="cart-header">
                        <div class="cart-header__title">наименование</div>
                        <div class="cart-header__count">количество</div>
                        <div class="cart-header__cost">стоимость</div>
                    </header>

                    <section class="product">
                        <div class="product__img"><img src="./img/products/macbook.jpg" alt="Apple MacBook Air 13"/></div>
                        <div class="product__title">Apple MacBook Air 13</div>
                        <div class="product__count">
                            <div class="count">
                                <div class="count__box">
                                    <input type="number" class="count__input" min="1" max="100" value="1"/>
                                </div>
                                <div class="count__controls">
                                    <a href = '/' class="count__up">
                                      <IoIosArrowUp />
                                    </a>
                                    <a href = '/' class="count__down">
                                      <IoIosArrowDown />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="product__price">110 000 руб.</div>
                        <div class="product__controls">
                          <RxCross2 />
                        </div>
                    </section>                   
                    <footer class="cart-footer">
                        <div class="cart-footer__count">3 единицы</div>
                        <div class="cart-footer__price">329 000 руб.</div>
                    </footer>
                </section>

            </div>
        </div>
    </section>
  );
};

export default BasketWindow;