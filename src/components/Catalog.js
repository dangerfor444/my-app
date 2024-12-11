import React, { useContext, useState } from 'react';
import { CategoryContext } from '../props/CategoryContext';
import '../css/catalog.css';
import { RxCross2 } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";

const Catalog = () => {
    const { categories, addCategory, removeCategory, addSubcategory, removeSubcategory } = useContext(CategoryContext);
    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        if (newCategory.length > 35) {
            alert('Категория не может превышать 35 символов.');
            return;
        }

        try {
            const response = await addCategory({ 
                Title: newCategory, 
                Description: 'Описание по умолчанию', 
                ParentId: null 
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
  
            setNewCategory('');
        } catch (error) {
            console.error('Ошибка добавления категории:', error);
        }
    };

    const handleSubcategorySubmit = async (e, categoryIndex) => {
        e.preventDefault();
        if (newSubcategory.length > 35) {
            alert('Подкатегория не может превышать 35 символов.');
            return;
        }
        try {
            const response = await addSubcategory(categoryIndex, {
                Title: newSubcategory,
                Description: 'Описание по умолчанию',
                ParentId: categories[categoryIndex].Id
            });
    
            if (!response.ok) {              
                const errorText = await response.text(); 
                throw new Error(`Ошибка ${response.status}: ${errorText}`);
            }
             
            setNewSubcategory('');
        } catch (error) {
            console.error('Ошибка при добавлении подкатегории:', error);
        }
    };

    return (
        <div className="categoty-cont">
            <h2>Категории</h2>
            <form className="form-category" onSubmit={handleCategorySubmit}>
                <input 
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Добавить категорию"
                    required
                />
                <button className="add-category-button" type="submit">Добавить</button>
            </form>

            <ul className="category-ul">
            {categories.map((category, index) => (
                <li className="li-category" key={index}>
                    {category.Title} 
                    <RxCross2 className="cross-icon" onClick={() => removeCategory(category.Id)} />          
                    <CiSquarePlus className="plus-add-subcategory" onClick={() => setSelectedCategoryIndex(index)}/>
                    {selectedCategoryIndex === index && (
                        <form className="form-subcategory" onSubmit={(e) => handleSubcategorySubmit(e, index)}>
                            <input 
                                type="text"
                                value={newSubcategory}
                                onChange={(e) => setNewSubcategory(e.target.value)}
                                placeholder="Добавить подкатегорию"
                                required
                            />
                            <button className="add-category-button" type="submit">Добавить</button>
                        </form>
                    )}
                    {category.Childs && category.Childs.length > 0 && (
                        <ul className="subcategory-ul">
                            {category.Childs.map((subcat, subIndex) => (
                                <li className="subcategory-li" key={subIndex}>
                                    {subcat.Title} 
                                    <RxCross2 className="cross-icon" onClick={() => removeSubcategory(index, subIndex)} />
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
            </ul>
        </div>
    );
};

export default Catalog;