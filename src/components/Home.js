import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Добро пожаловать!</h1>
      <Link to="/register">Регистрация</Link>
      <Link to="/login">Авторизация</Link>
    </div>
  );
};

export default Home;