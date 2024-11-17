import React, { createContext, useState, useEffect  } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState(() => {
        const storedCategories = localStorage.getItem('categories');
        return storedCategories ? JSON.parse(storedCategories) : [];
    });

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);
  
    const addCategory = (category) => {
        setCategories((prevCategories) => [...prevCategories, { title: category.title, subcategories: [] }]);
    };

    const removeCategory = (index) => {
        setCategories((prevCategories) => 
            prevCategories.filter((_, i) => i !== index) 
        );
    };

    const addSubcategory = (categoryIndex, subcategory) => {
        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            if (updatedCategories[categoryIndex]) {
                updatedCategories[categoryIndex].subcategories.push({ title: subcategory });
            }
            return updatedCategories;
        });
    };

    const removeSubcategory = (categoryIndex, subcategoryIndex) => {
        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            if (updatedCategories[categoryIndex]) {
                updatedCategories[categoryIndex].subcategories = updatedCategories[categoryIndex].subcategories.filter((_, index) => index !== subcategoryIndex);
            }
    
            return updatedCategories;
        });
    };
    
    return (
        <CategoryContext.Provider value={{ categories, addCategory, removeCategory, addSubcategory, removeSubcategory }}>
            {children}
        </CategoryContext.Provider>
    );
};