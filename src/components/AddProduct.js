import React, { useState, useContext, useEffect } from 'react';
import { CategoryContext } from '../props/CategoryContext';
import '../css/addProductStyle.css'

const AddProduct = ({ onAddProduct }) => {
    const { getCategories } = useContext(CategoryContext);

    const [subcategoryId, setSubcategoryId] = useState(''); 
    const [brand, setBrand] = useState('');
    const [count, setCount] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
            const fetchCategories = async () => {
                const fetchedCategories = await getCategories();
                setCategories(fetchedCategories);
            };    
            fetchCategories();
        }, [getCategories]);

    const handleSubcategoryChange = (e) => {
        const selectedId = e.target.value; 
        setSubcategoryId(selectedId); 
    };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    if (!subcategoryId) {
        alert('Пожалуйста, выберите подкатегорию перед добавлением товара.');
        return;
    }

    const newProduct = {
        name: brand,
        description,
        price: parseFloat(price), 
        categoryId: parseInt(subcategoryId), 
        count: parseInt(count)
    };
    console.log('Добавляемый продукт:', newProduct);

    try {
        const response = await fetch('http://85.208.87.56/api/v1/goods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(newProduct)
        });

        if (!response.ok) {
            throw new Error('Ошибка при отправке на сервер: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Ответ от сервера:', result);

        onAddProduct(result);

    } catch (error) {
        console.error('Ошибка:', error);
    }

    setSubcategoryId('');
    setBrand('');
    setPrice('');
    setCount('');
    setDescription('');
    setImageFile(null);
    setSearchTerm('');
  };



  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value && value.length <= 700) {
        setDescription(value);
    }
    };

    const allSubcategories = categories.flatMap((cat) => 
        (cat.Childs || []).map((sub) => ({
            id: `${sub.Id}`, 
            title: sub.Title,
            categoryTitle: cat.Title
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
                <select value={subcategoryId} onChange={handleSubcategoryChange}>
                    <option value="" disabled>Выберите подкатегорию</option>
                    {filteredSubcategories.map((subcat) => (
                        <option key={subcat.id} value={subcat.id}> 
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
            <label>Загрузить изображение</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
            </div>
            <button class = "addProductButton" type="submit">Добавить Товар</button>
    </form>

    );
};

export default AddProduct;