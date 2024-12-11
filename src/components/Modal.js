import React from 'react';


const Modal = ({ isOpen, product, onDelete}) => {
  if (!isOpen) return null;

  return (
    <div class="modal-overlay">
      <div class="modal-content">
        <h2 class = "modal-component productName">{product.brand}</h2>
        <p class = "modal-component">{product.description}</p>
        <p class = "modal-component countProduct"><strong>Количество:</strong> {product.count}</p>
        {/*<p class = "modal-component">{product.category} / {product.subcategory}</p>*/}
        <button class="delete-button" onClick={() => onDelete(product.id)}>
          Удалить продукт
        </button>
      </div>
    </div>
  );
};

export default Modal;