import React, { useState, useContext } from 'react';
import { CategoryContext } from '../props/CategoryContext';
import '../css/addProductStyle.css'

const AddProduct = ({ onAddProduct }) => {
    const { categories } = useContext(CategoryContext);

    const [subcategory, setSubcategory] = useState('');
    const [brand, setBrand] = useState('');
    const [count, setCount] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
/*

const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedSubcategory = allSubcategories.find(sub => sub.title === subcategory);

    const newProduct = {
        name: brand, 
        description,
        price: parseFloat(price), 
        categoryId: selectedSubcategory ? parseInt(selectedSubcategory.id.split('-')[0]) : null, 
    };
    onAddProduct(newProduct);
    console.log('Данные нового товара:', newProduct);


    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('Токен авторизации отсутствует');
        }
        const response = await fetch('http://85.208.87.56/api/v1/goods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
            const errorInfo = await response.json();
            throw new Error('Ошибка отправки данных на сервер: ' + errorInfo.message);
        }

        

        onAddProduct(newProduct);

        setSubcategory('');
        setBrand('');
        setPrice('');
        setCount('');
        setDescription('');
        setImageUrl('');
        setSearchTerm('');
        } catch (error) {
        console.error('Ошибка:', error);
        }
    };
*/
    
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
        subcategory,
        brand,
        price,
        count,
        description,
        imageUrl,
    };

    onAddProduct(newProduct);

    setSubcategory('');
    setBrand('');
    setPrice('');
    setCount('');
    setDescription('');
    setImageUrl('');
    setSearchTerm('');
  };


  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value && value.length <= 700) {
        setDescription(value);
    }
    };

    const allSubcategories = categories.flatMap((cat, categoryIndex) => 
        cat.subcategories.map((sub, subIndex) => ({
            id: `${categoryIndex}-${subIndex}`, 
            title: sub.title,
            categoryTitle: cat.title
        }))
    );

    const filteredSubcategories = allSubcategories.filter(subcat => 
        subcat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subcat.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <form onSubmit={handleSubmit} class = "addProductForm">
             <div className="inputProductItem">
                <label>Поиск категории</label>
                    <input
                     type="text"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     placeholder="Введите название категории"
                    />
            </div>
            <div className="inputProductItem">
                <label>Подкатегория</label>
                <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                    <option value="" disabled>Выберите подкатегорию</option>
                    {filteredSubcategories.map((subcat, index) => (
                        <option key={index} value={subcat.title} data-id={subcat.id}>
                            {subcat.categoryTitle} &gt; {subcat.title}
                        </option>
                    ))}
                </select>
            </div>
            <div class = "inputProductItem">
                <label>Название товара</label>
                <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
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