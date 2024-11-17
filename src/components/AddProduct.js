import React, { useState, useContext } from 'react';
import { CategoryContext } from '../props/CategoryContext';
import '../css/addProductStyle.css'

const AddProduct = ({ onAddProduct }) => {
    const { categories } = useContext(CategoryContext);

    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [count, setCount] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
        category,
        brand,
        model,
        price,
        count,
        description,
        imageUrl,
    };

    onAddProduct(newProduct);

    setBrand('');
    setModel('');
    setPrice('');
    setCount('');
    setDescription('');
    setImageUrl('');
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value && value.length <= 700) {
        setDescription(value);
    }
};



  return (
    <form onSubmit={handleSubmit} class = "addProductForm">
       <div class = "inputProductItem">
                <label>Категория</label>
                
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="" disabled>Выберите категорию</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat.title}>
                            {cat.title}
                        </option>
                    ))}
                </select>
            </div>
            <div class = "inputProductItem">
                <label>Бренд</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                />                
            </div>
            <div class = "inputProductItem">
                <label>Модель</label>
                <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
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
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
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
                    onChange={handleDescriptionChange}              
                />
                <p>{description.length}/700</p>
            </div>
            <div class = "inputProductItem url">
                <label>Заргрузить URL</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <button class = "addProductButton" type="submit">Добавить Товар</button>
    </form>

    );
};

export default AddProduct;