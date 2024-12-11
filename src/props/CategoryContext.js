import React, { createContext, useState, useEffect  } from 'react';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

     const getCategories = async () => {
        try {
            const response = await fetch('http://85.208.87.56/api/v1/good-categories');
            if (!response.ok) throw new Error('Ошибка при загрузке категорий');
            const data = await response.json();
            console.log('Полученные данные:', data);
            
            if (Array.isArray(data.GoodCategories)) {
                setCategories(data.GoodCategories);  
            } else {
                console.error('Полученные данные не содержат массив GoodCategories:', data);
            }
        } catch (error) {
            console.error('Ошибка при получении категорий:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);
  
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
        if (response.ok) {
            const newCategory = await response.json();
            setCategories((prevCategories) => [...prevCategories, newCategory]);
        } else {
            console.error('Ошибка при добавлении категории');
        }
    };

    const removeCategory = async (categoryId) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://85.208.87.56/api/v1/good-categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.ok) {
                setCategories((prevCategories) => 
                    prevCategories.filter((category) => category.Id !== categoryId)
                );
            } else {
                console.error('Ошибка при удалении категории');
                alert('Произошла ошибка при удалении категории. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Ошибка при попытке удалить категорию:', error);
        }
    };
    
    const addSubcategory = async (categoryIndex, subcategory) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://85.208.87.56/api/v1/good-categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(subcategory),
        });
        if (response.ok) {
            const newSubcategory = await response.json();
            setCategories((prevCategories) => {
                const updatedCategories = [...prevCategories];
                if (updatedCategories[categoryIndex]) {
                    updatedCategories[categoryIndex].Childs.push(newSubcategory);
                }
                return updatedCategories;
            });
        } else {
            console.error('Ошибка при добавлении подкатегории');
        }
    };

    const removeSubcategory = async (categoryIndex, subcategoryIndex) => {
        const subcategoryId = categories[categoryIndex].Childs[subcategoryIndex].Id;
        const token = localStorage.getItem('authToken');
    
        try {
            const response = await fetch(`http://85.208.87.56/api/v1/good-categories/${subcategoryId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setCategories((prevCategories) => {
                    const updatedCategories = [...prevCategories];
                    if (updatedCategories[categoryIndex]) {
                        updatedCategories[categoryIndex].Childs = updatedCategories[categoryIndex].Childs.filter((_, index) => index !== subcategoryIndex);
                    }
                    return updatedCategories;
                });
            } else {
                console.error('Ошибка при удалении подкатегории');
                alert('Произошла ошибка при удалении подкатегории. Попробуйте снова.');
            }
        } catch (error) {
            console.error('Ошибка при попытке удалить подкатегорию:', error);
        }
    };
    
    return (
        <CategoryContext.Provider value={{ categories, addCategory, removeCategory, addSubcategory, removeSubcategory }}>
            {children}
        </CategoryContext.Provider>
    );
};