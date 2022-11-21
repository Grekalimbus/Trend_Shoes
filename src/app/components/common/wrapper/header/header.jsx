import React from 'react';
import stylesHeader from './header.module.css';
import imgLogo1 from '../../../../../img/logoHeader.svg';
// import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className={stylesHeader.header}>
      <img src={imgLogo1} alt="imgLogo1" className={stylesHeader.image} />

      <div className={stylesHeader.text}>
        <a>Вход / </a>
        <a>Регистрация</a>
      </div>
    </header>
  );
};

export default Header;
