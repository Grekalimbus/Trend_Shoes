import React from "react";
import styles from "./index.module.css";

const Buttons = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("storageBasket"));
    const getAmout = () => {
        let amout = 0;
        dataLocalStorage.forEach((item) => {
            item.quantity.forEach((q) => {
                amout += item.price * q.value;
            });
        });
        return amout;
    };
    const clearBasket = () => {
        localStorage.setItem("storageBasket", "[]");
        location.reload();
    };

    return (
        <div className={styles.blockButton}>
            <div className={styles.buttonClick} onClick={clearBasket}>
                Очистить
            </div>
            <div className={styles.amount}>Сумма: {getAmout()}</div>
            <div className={styles.buttonClick}>Оформить заказ</div>
        </div>
    );
};

export default Buttons;
