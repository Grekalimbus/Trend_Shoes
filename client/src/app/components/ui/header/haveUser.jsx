import React from "react";
import styles from "./header.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserPurchases } from "../../../store/userPurchases";

const HaveUser = ({
    handleHideMenu,
    handleMenu,
    isAdminStatus,
    handleGoOut,
    balance,
    styleMenu,
    styleHeader,
    styleButton
}) => {
    const historyPurchases = useSelector(getUserPurchases());
    const purchases = historyPurchases?.[0].history.length === 0 ? false : true;
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
                <h2 className={styles.h2}>₽: {balance} </h2>
            </div>
            <Link
                to="/basketPage"
                className={styleButton}
                onClick={handleHideMenu}
            >
                <h2 className={styles.h2}>Корзина</h2>
            </Link>
            {purchases && (
                <Link
                    to="/purchases"
                    className={styleButton}
                    onClick={handleHideMenu}
                >
                    <h2 className={styles.h2}>Покупки</h2>
                </Link>
            )}
            {isAdminStatus() && (
                <Link
                    to="/adminPage"
                    className={styleButton}
                    onClick={handleHideMenu}
                >
                    <h2 className={styles.h2}>Админка</h2>
                </Link>
            )}
            <div className={styleButton} onClick={handleGoOut}>
                <h2 className={styles.h2}>Выход </h2>
            </div>
        </div>
    );
};

HaveUser.propTypes = {
    handleMenu: PropTypes.func,
    handleHideMenu: PropTypes.func,
    isAdminStatus: PropTypes.func,
    handleGoOut: PropTypes.func,
    balance: PropTypes.number,
    styleMenu: PropTypes.string,
    styleHeader: PropTypes.string,
    styleButton: PropTypes.string
};

export default HaveUser;
