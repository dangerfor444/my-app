import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationForm from '../components/AuthorizationForm';
import '../css/styleLogin.css'

const AuthorizationPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [buttonText, setButtonText] = useState('Отправить код');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
        interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
    } else if (timer === 0) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
    }, [isTimerActive, timer]);

  const sendCode = () => {
    setIsCodeSent(true);
    console.log('Код отправлен!');
    setMessage('Письмо с кодом было отправлено на ваш почтовый адрес');
    setButtonText('Войти');  
    setIsTimerActive(true);
    setTimer(30);
  }


  const handleSendCode = (e) => {
    e.preventDefault();
    if (buttonText === 'Отправить код') {
      sendCode();
      } 
    else if (code.length !== 8){
      setMessage('Неверный код');
    }
      else {       
      navigate('/productsPage');
      }
  };


  return ( 
    <body class = "bodyLogin">
    <div class="container">
      <div class="login form">
      <div class="ellipse"></div>
      <div class="rectangle"></div>
      <div class="ellipse2"></div>
      <div class="rectangle2"></div>
      {message && <p class = "message">{message}</p>} {}
      <header>Авторизация</header>
      <AuthorizationForm
        email={email}
        setEmail={setEmail}
        handleSendCode = {handleSendCode}
        code={code}
        setCode={setCode}
        isCodeSent={isCodeSent}
        buttonText={buttonText}
        isTimerActive={isTimerActive}
        timer={timer}
        sendCode = {sendCode}
      />
    </div>
  </div>
  </body>
  );
};

export default AuthorizationPage;