import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import CardPurchases from "./cardPurchases";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserPurchases } from "../../../store/userPurchases";
import { getAllPurchases } from "../../../store/allPurchases";
import Loader from "../loader/loader";

const Purchases = () => {
    const { other } = useParams();
    const historyPurchases = useSelector(getUserPurchases());
    const allHistoryPurchases = useSelector(getAllPurchases());
    const [arrayUserHistory, setArrayUserHistory] = useState(null);
    useEffect(() => {
        if (
            historyPurchases &&
            historyPurchases[0] &&
            historyPurchases.length
        ) {
            setArrayUserHistory(historyPurchases[0].history);
        }
    }, [historyPurchases]);

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

    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    if (other !== undefined) {
        return !allHistoryArray ? (
            <Loader />
        ) : (
            <div className={styles.mainBlokInfo}>
                {allHistoryArray.map((item) => {
                    return (
                        <CardPurchases
                            key={item._id + randomIntFromInterval(1, 1500)}
                            historyPurchases={item}
                        />
                    );
                })}
            </div>
        );
    } else if (other === undefined) {
        return !arrayUserHistory ? (
            <h2 className={styles.notPurchases}>
                У вас нет покупок на данный момент
            </h2>
        ) : (
            <div className={styles.mainBlokInfo}>
                {arrayUserHistory.map((item) => {
                    return (
                        <CardPurchases
                            key={item._id + randomIntFromInterval(1, 1500)}
                            historyPurchases={item}
                        />
                    );
                })}
            </div>
        );
    }
};

export default Purchases;
