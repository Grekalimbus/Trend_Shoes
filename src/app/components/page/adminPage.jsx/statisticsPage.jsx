import React from "react";
import styles from "./index.module.css";

const StatisticPage = () => {
    return (
        <div className={styles.wrapStatistic}>
            <div className={styles.flexElemStatistic}>
                <div className={styles.titleElem}>
                    Кол-во проданных товаров за все время: 0
                </div>
                <div className={styles.titleElem}>
                    Кол-во полученых денег с продаж за все время: 0
                </div>
                <div className={styles.titleElem}>
                    Кол-во зарегестрированых пользователей на сайте:{" "}
                </div>
            </div>
            <div className={styles.flexElemStatisticHide}> </div>
        </div>
    );
};

export default StatisticPage;
