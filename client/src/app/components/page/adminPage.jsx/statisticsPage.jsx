import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { getAllPurchases } from "../../../store/allPurchases";
import Loader from "../../common/loader/loader";

const StatisticPage = () => {
    const [amount, setAmount] = useState(0);
    const allHistoryPurchases = useSelector(getAllPurchases());
    const createArrayHistoryAll = () => {
        const allHistoryArray = [];
        if (allHistoryPurchases) {
            allHistoryPurchases.forEach((item) => {
                item.history.forEach((item) => {
                    allHistoryArray.push(item);
                });
            });
            return allHistoryArray;
        } else {
            return [];
        }
    };
    const allHistoryArray = createArrayHistoryAll();

    const quantityPurchases = () => {
        let value = 0;
        if (allHistoryArray) {
            allHistoryArray.forEach((item) => {
                value += 1;
            });
            return value;
        }
    };

    function getAmount() {
        if (allHistoryArray) {
            allHistoryArray.forEach((item) => {
                setAmount((prevState) => (prevState += item.price));
            });
        }
    }
    useEffect(() => {
        if (allHistoryArray) getAmount();
    }, []);

    return !allHistoryArray ? (
        <Loader />
    ) : (
        <div className={styles.wrapStatistic}>
            <div className={styles.flexElemStatistic}>
                <div className={styles.titleElem}>
                    Кол-во проданных товаров за все время:
                    {!allHistoryArray ? 0 : quantityPurchases()}
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
