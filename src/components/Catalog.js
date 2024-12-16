import React, { useContext, useState, useEffect } from 'react';
import { CategoryContext } from '../props/CategoryContext';
import '../css/catalog.css';
import { RxCross2 } from "react-icons/rx";
import { CiSquarePlus } from "react-icons/ci";

const Catalog = () => {
    const { getCategories, addCategory, removeCategory, addSubcategory, removeSubcategory } = useContext(CategoryContext);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        };
  
        fetchCategories();
    }, [getCategories]);

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        if (newCategory.length > 35) {
            alert('Категория не может превышать 35 символов.');
            return;
        }
      
        try {
            await addCategory({ 
                Title: newCategory, 
                Description: 'Описание по умолчанию', 
                ParentId: null 
            });
        setCategories((prev) => [...prev, { 
            Title: newCategory, 
            Description: 'Описание по умолчанию', 
            Id: Math.random(), 
            Childs: [] 
        }]);
        setNewCategory('');
    } catch (error) {
        console.error('Ошибка добавления категории:', error);
        alert(`Не удалось добавить категорию: ${error.message}`);
    }
    };

    const handleSubcategorySubmit = async (e, categoryIndex) => {
        e.preventDefault();
        if (newSubcategory.length > 35) {
            alert('Подкатегория не может превышать 35 символов.');
            return;
        }
        
        try {
            await addSubcategory({
                Title: newSubcategory,
                Description: 'Описание по умолчанию',
                ParentId: categories[categoryIndex].Id
            });
            
            const newSubcategoryObj = {
                Title: newSubcategory,
                Description: 'Описание по умолчанию',
                Id: Math.random(), 
            };
    
            setCategories((prev) => {
                const updatedCategories = prev.map((category, index) => {
                    if (index === categoryIndex) {
                        return {
                            ...category,
                            Childs: [...category.Childs, newSubcategoryObj]
                        };
                    }
                    return category;
                });
                return updatedCategories;
            });

            setNewSubcategory('');
    
        } catch (error) {
            console.error('Ошибка при добавлении подкатегории:', error);
            alert(`Не удалось добавить подкатегорию: ${error.message}`);
        }
    };

    const handleRemoveCategory = async (categoryId) => {
        try {
            await removeCategory(categoryId);
            setCategories((prev) => prev.filter((category) => category.Id !== categoryId));
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
        }
    };

    const handleRemoveSubcategory = async (categoryIndex, subcategoryIndex) => {
        const subcategoryId = categories[categoryIndex].Childs[subcategoryIndex].Id;
        try {
            await removeSubcategory(subcategoryId);
            setCategories((prev) => {
                const updatedCategories = [...prev];
                updatedCategories[categoryIndex].Childs = updatedCategories[categoryIndex].Childs.filter((_, index) => index !== subcategoryIndex);
                return updatedCategories;
            });
        } catch (error) {
            console.error('Ошибка при удалении подкатегории:', error);
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
                    <RxCross2 className="cross-icon" onClick={() => handleRemoveCategory(category.Id)} />          
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
                                    <RxCross2 className="cross-icon" onClick={() => handleRemoveSubcategory(index, subIndex)} />
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