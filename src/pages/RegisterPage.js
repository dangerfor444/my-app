import React, { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

import '../css/styleLogin.css'
const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShow] = useState(false);
  const [showRepeatPassword, setShowRepeat] = useState(false);

  const handleClickPassword = () => {
    setShow(!showPassword);
  }

  const handleClickRepeatPassword = () => {
    setShowRepeat(!showRepeatPassword);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Сбрасываем ошибку перед новой валидацией

    // Валидация паролей
    if (password.length < 8) {
      setError('Пароль должен содержать не менее 8 символов');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // Если все проверки пройдены, можно продолжить с регистрацией
    console.log({ username, email, password });
    // Здесь должна быть логика для отправки данных на сервер
    navigate('/productsPage');// Переход на страницу личного кабинета
  };

  return (
    <div class="container reg">     
      <div class="registration form">
      <div class="ellipse ellipseRegister"></div>
      <div class="rectangle recRegister"></div>
      <div class="ellipse2"></div>
      <div class="rectangle2"></div>
      <header>Регистрация</header>
      {error && <p className="error">{error}</p>} {/* Отображаем ошибку, если она есть */}
      <RegisterForm
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        handleClickPassword={handleClickPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleClickRepeatPassword={handleClickRepeatPassword}
        showRepeatPassword={showRepeatPassword}
        handleSubmit={handleSubmit}
      />
      <div class="signup">
        <span class="signup">У вас уже есть аккаунт?
        <Link to="/" class = "link"><label for="check">Авторизация</label></Link>
        </span>
      </div>
      </div>
    </div>
  );
};

export default RegisterPage;