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
       <div>
                <label>Название товара:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Цена:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Описание:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label>URL изображения:</label>
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