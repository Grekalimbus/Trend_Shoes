import React, { useState } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
    const [color, setColor] = useState(true);
    setTimeout(() => {
        setColor((pervState) => !pervState);
    }, 5000);
    const balance = localStorage.getItem("balance");

    return (
        <header>
            <div
                className={color === true ? styles.header : styles.headerChange}
            >
                <Link to="/" className={styles.button}>
                    <h2 className={styles.h2}>Главная</h2>
                </Link>
                <Link to="/productPage" className={styles.button}>
                    <h2 className={styles.h2}>Каталог</h2>
                </Link>

                <div className={styles.button}>
                    <h2 className={styles.h2}>₽: {balance}</h2>
                </div>
                <Link to="/basketPage" className={styles.button}>
                    <h2 className={styles.h2}>Корзина</h2>
                </Link>
                <div className={styles.button}>
                    <h2 className={styles.h2}>История покупок</h2>
                </div>
                <Link to="/basketPage" className={styles.button}>
                    <h2 className={styles.h2}>Корзина</h2>
                </Link>
                <Link to="/login" className={styles.button}>
                    <h2 className={styles.h2}>Вход / Регистрация</h2>
                </Link>
            </div>
        </header>
    );
};

export default Header;
