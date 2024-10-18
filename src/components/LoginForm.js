import React from 'react';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const LoginForm = ({ email, setEmail, password, setPassword, showPassword, handleClickPassword, handleSubmit }) => {
  return (
  <form onSubmit={handleSubmit}>
  <input 
    type="email" 
    placeholder="Email" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    required 
  />
  <input 
    type={showPassword ? "text" : "password"} 
    placeholder="Пароль" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    required 
  />
  <span class ="pass-icon loginPass" onClick={handleClickPassword}>{showPassword ? <FaRegEyeSlash></FaRegEyeSlash>:<FaRegEye></FaRegEye>}</span>          
  <button type="submit" class = "button">Войти</button>     
</form>
  );
};

export default LoginForm;