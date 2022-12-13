import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Buttons = ({ amount }) => {
    const clearBasket = () => {
        localStorage.setItem("storageBasket", "[]");
        location.reload();
    };
    return (
        <div className={styles.blockButton}>
            <div className={styles.buttonClick} onClick={clearBasket}>
                Очистить
            </div>
            <div className={styles.amount}>Сумма: {amount}</div>
            <Link to="/formPage" className={styles.buttonClick}>
                <p className={styles.title}>Оформить заказ</p>
            </Link>
        </div>
    );
};
Buttons.propTypes = {
    amount: PropTypes.number
};
export default Buttons;
