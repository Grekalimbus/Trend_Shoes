import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { getAllPurchases } from "../../../store/allPurchases";

const StatisticPage = () => {
    const [amount, setAmount] = useState(0);
    const allHistoryPurchases = useSelector(getAllPurchases());

    const quantityPurchases = () => {
        let value = 0;
        if (allHistoryPurchases) {
            const arrayKey = Object.keys(allHistoryPurchases);
            arrayKey.forEach((item) => {
                allHistoryPurchases[item].forEach((el) => {
                    value += 1;
                });
            });
            return value;
        }
    };

    function getAmount() {
        if (allHistoryPurchases) {
            const arrayKeyAllHistory = Object.keys(allHistoryPurchases);
            arrayKeyAllHistory.forEach((item) => {
                allHistoryPurchases[item].forEach((item) => {
                    setAmount((prevState) => (prevState += item.price));
                });
            });
        }
    }
    useEffect(() => {
        if (allHistoryPurchases) getAmount();
    }, [allHistoryPurchases]);

    return !allHistoryPurchases ? (
        <div>Loading</div>
    ) : (
        <div className={styles.wrapStatistic}>
            <div className={styles.flexElemStatistic}>
                <div className={styles.titleElem}>
                    Кол-во проданных товаров за все время:
                    {!allHistoryPurchases ? 0 : quantityPurchases()}
                </div>
                <div className={styles.titleElem}>
                    Кол-во полученых денег с продаж за все время: {amount}
                </div>
            </div>
            <div className={styles.flexElemStatisticHide}> </div>
        </div>
    );
};

export default StatisticPage;
