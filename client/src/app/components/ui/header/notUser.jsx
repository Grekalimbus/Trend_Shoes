import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NotUser = ({
    handleMenu,
    handleHideMenu,
    styleMenu,
    styleHeader,
    styleButton
}) => {
    return (
        <div className={styleHeader}>
            <div onClick={handleMenu} className={styleMenu}>
                MENU
            </div>
            <Link to="/" className={styleButton} onClick={handleHideMenu}>
                <h2 className={styles.h2}>Главная</h2>
            </Link>
            <Link
                to="/productPage"
                className={styleButton}
                onClick={handleHideMenu}
            >
                <h2 className={styles.h2}>Каталог</h2>
            </Link>

            <div className={styleButton}>
                <h2 className={styles.h2}>₽: ---- </h2>
            </div>
            <Link to="/login" className={styleButton} onClick={handleHideMenu}>
                <h2 className={styles.h2}>Регистрация</h2>
            </Link>
            <Link
                to="/login/exit"
                className={styleButton}
                onClick={handleHideMenu}
            >
                <h2 className={styles.h2}>Вход</h2>
            </Link>
        </div>
    );
};

NotUser.propTypes = {
    handleMenu: PropTypes.func,
    handleHideMenu: PropTypes.func,
    styleMenu: PropTypes.string,
    styleHeader: PropTypes.string,
    styleButton: PropTypes.string
};

export default NotUser;
