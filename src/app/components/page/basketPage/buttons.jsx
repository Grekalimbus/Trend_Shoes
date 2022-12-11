import React from "react";
import styles from "./index.module.css";

const Buttons = () => {
    return (
        <div className={styles.blockButton}>
            <div className={styles.buttonClick}>Очистить</div>
            <div className={styles.amount}>Сумма: 0000</div>
            <div className={styles.buttonClick}>Оформить заказ</div>
        </div>
    );
};

export default Buttons;
