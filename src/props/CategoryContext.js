import React, { createContext} from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const getCategories = async () => {
        try {
            const response = await fetch('http://85.208.87.56/api/v1/good-categories');
            if (!response.ok) throw new Error('Ошибка при загрузке категорий');
            const data = await response.json();
            console.log('Полученные данные:', data);
            return data.GoodCategories || [];
        } catch (error) {
            console.error('Ошибка при получении категорий:', error);
            return [];
        }
    };

    const addCategory = async (category) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://85.208.87.56/api/v1/good-categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        });
    
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ошибка при добавлении категории:', errorText);
            throw new Error('Ошибка при добавлении категории');
        }
    
        return; 
    };

    const removeCategory = async (categoryId) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://85.208.87.56/api/v1/good-categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.error('Ошибка при удалении категории');
            throw new Error('Ошибка при удалении категории');
        }
    };
    
    const addSubcategory = async (subcategory) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://85.208.87.56/api/v1/good-categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(subcategory),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ошибка при добавлении подкатегории:', errorText);
            throw new Error('Ошибка при добавлении подкатегории');
        }

        return;
    };

    const removeSubcategory = async (subcategoryId) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://85.208.87.56/api/v1/good-categories/${subcategoryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            console.error('Ошибка при удалении подкатегории');
            throw new Error('Ошибка при удалении подкатегории');
        }
    };
    
    return (
        <CategoryContext.Provider value={{ getCategories, addCategory, removeCategory, addSubcategory, removeSubcategory }}>
            {children}
        </CategoryContext.Provider>
    );
};