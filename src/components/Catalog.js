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
    

    
    const handleCategorySubmit = (e) => {
        e.preventDefault();
        if (newCategory.length > 35) {
            alert('Категория не может превышать 35 символов.');
            return;
        }
        addCategory({ title: newCategory, subcategories: [] });
        setNewCategory('');
    };

    const handleSubcategorySubmit = (e, categoryIndex) => {
        e.preventDefault();
        if (newSubcategory.length > 35) {
            alert('Подкатегория не может превышать 35 символов.');
            return;
        }
        addSubcategory(categoryIndex, newSubcategory);
        setNewSubcategory('');
    };




    return (
        <div class = "categoty-cont">
            <h2>Категории</h2>
            <form class = "form-category" onSubmit={handleCategorySubmit}>
                <input 
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Добавить категорию"
                    required
                />
                <button class = "add-category-button" type="submit">Добавить</button>
            </form>

            <ul class ="category-ul">
            {categories.map((category, index) => (
                    <li class = "li-category" key={index}>
                        {category.title} 
                        <RxCross2 className="cross-icon" onClick={() => removeCategory(index)} />          
                        <CiSquarePlus class = "plus-add-subcategory"onClick={() => setSelectedCategoryIndex(index)}/>
                        {selectedCategoryIndex === index && (
                            <form class = "form-subcategory" onSubmit={(e) => handleSubcategorySubmit(e, index)}>
                                <input 
                                    type="text"
                                    value={newSubcategory}
                                    onChange={(e) => setNewSubcategory(e.target.value)}
                                    placeholder="Добавить подкатегорию"
                                    required
                                />
                                <button class = "add-category-button" type="submit">Добавить</button>
                            </form>
                        )}
                        {category.subcategories && category.subcategories.length > 0 && (
                            <ul class = "subcategory-ul">
                                {category.subcategories.map((subcat, subIndex) => (
                                    <li class = "subcategory-li" key={subIndex}>{subcat.title}
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