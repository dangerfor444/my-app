import React, { useState } from 'react';
import '../css/addProductStyle.css'

const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
        name,
        price,
        description,
        imageUrl,
    };

    onAddProduct(newProduct);

    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} class = "addProductForm">
       <div class = "inputProductItem">
                <label>Категория</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div class = "inputProductItem">
                <label>Бренд</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div class = "inputProductItem">
                <label>Модель</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div class = "inputProductItem">
                <label>Цена</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div class = "inputProductItem">
                <label>Количество</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div class = "inputProductItem">
                <label>Цвет</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div class = "inputProductItem">
                <label>Описание товара</label>
                <textarea
                    class = "descriptionProduct"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div class = "inputProductItem">
                <label>Заргрузить URL</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <button type="submit">Добавить товар</button>
    </form>
  );
};

export default AddProduct;