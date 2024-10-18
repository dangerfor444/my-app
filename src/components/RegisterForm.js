import React from 'react';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const RegisterForm = ({username, setUsername,email, setEmail, password, setPassword, showPassword, showRepeatPassword, confirmPassword, setConfirmPassword, handleClickRepeatPassword, handleClickPassword, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Логин" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
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
        <span class ="pass-icon" onClick={handleClickPassword}>{showPassword ? <FaRegEyeSlash></FaRegEyeSlash>:<FaRegEye></FaRegEye>}</span>       
        
        <input 
          type={showRepeatPassword ? "text" : "password"} 
          placeholder="Повторите пароль" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
        />
        <span class ="pass-icon sec" onClick={handleClickRepeatPassword}>{showRepeatPassword ? <FaRegEyeSlash></FaRegEyeSlash>:<FaRegEye></FaRegEye>}</span>       
        
        <button type="submit" class = "button">Зарегистрироваться</button>
      </form>
  );
};

export default RegisterForm;