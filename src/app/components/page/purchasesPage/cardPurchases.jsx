import React from "react";
import styles from "./index.module.css";

const CardPurchases = () => {
    return (
        <div className={styles.cardInfo}>
            <div className={styles.elemFlex}>
                <div className={styles.flexElemInfo}>
                    <div className={styles.mainTitle}>
                        Данные заполненные в форме
                    </div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                </div>
                <div className={styles.flexElemInfo}>
                    <div className={styles.mainTitle}>Данные о товаре</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                    <div className={styles.inforTitle}>Фио</div>
                </div>
            </div>
            <div className={styles.elemFlexTwo}>
                <img src="" alt="" />
            </div>
        </div>
    );
};

export default CardPurchases;
