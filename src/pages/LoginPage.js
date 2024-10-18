import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import '../css/styleLogin.css'
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShow] = useState(false);

  const handleClickPassword = () => {
    setShow(!showPassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика авторизации
    console.log({ email, password });
    // Здесь добавьте проверку сервера или локальную проверку.
    navigate('/productsPage'); // Переход на страницу личного кабинета
  };

  return ( 
    <div class="container">
      <div class="login form">
      <div class="ellipse"></div>
      <div class="rectangle"></div>
      <div class="ellipse2"></div>
      <div class="rectangle2"></div>
      <header>Авторизация</header>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        handleClickPassword={handleClickPassword}
        handleSubmit={handleSubmit}
      />
      <div class="signup">
        <span class="signup">У вас нет аккаунта?
         <Link to="/register"><label for="check">Регистрация</label></Link>
        </span>       
      </div>
    </div>
  </div>
  );
};

export default LoginPage;