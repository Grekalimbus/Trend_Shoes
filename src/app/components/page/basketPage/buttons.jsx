import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

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
            <div className={styles.buttonClick}>Оформить заказ</div>
        </div>
    );
};
Buttons.propTypes = {
    amount: PropTypes.number
};
export default Buttons;
