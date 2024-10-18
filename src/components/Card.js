import React from 'react';

const Card = ({ imgPhoto, title, price }) => {
  return (
<div class="card">
  <div class="card__top">
    <a href='/' class="card__image">
      <img
        src={imgPhoto}
        alt="title"
      />
    </a>
    <div class="card__label">-10%</div>
  </div>
  <div class="card__bottom">
    <div class="card__prices">
      <div class="card__price card__price--discount">{price}</div>
      <div class="card__price card__price--common">{price}</div>
    </div>
    <a href='/' class="card__title">{title}</a>
    <button class="card__add">В корзину</button>
  </div>
</div>
  );
}

export default Card;