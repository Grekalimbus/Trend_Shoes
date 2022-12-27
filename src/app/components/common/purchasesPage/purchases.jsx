import React from "react";
import styles from "./index.module.css";
import CardPurchases from "./cardPurchases";
import { useApi } from "../../hooks/useApi";
import { useParams } from "react-router-dom";

const Purchases = () => {
    const { other } = useParams();
    const { historyPurchases, allHistoryPurchases } = useApi();
    const reverseArray =
        historyPurchases !== undefined
            ? historyPurchases.reverse()
            : historyPurchases;
    const keyUsers =
        allHistoryPurchases !== undefined
            ? Object.keys(allHistoryPurchases)
            : null;

    const createArrayHistory = () => {
        const allHistory = [];
        if (keyUsers !== null && allHistoryPurchases !== undefined) {
            keyUsers.forEach((key) => {
                allHistoryPurchases[key].forEach((item) => {
                    allHistory.push(item);
                });
            });
            return allHistory;
        }
    };
    const arrayAllHistory = createArrayHistory();
    const reserveAllHistory =
        arrayAllHistory !== undefined ? arrayAllHistory.reverse() : null;
    console.log(reverseArray);

    if (other !== undefined) {
        return (
            <div className={styles.mainBlokInfo}>
                {reserveAllHistory === null ? (
                    <div>Loading</div>
                ) : (
                    reserveAllHistory.map((item) => {
                        return (
                            <CardPurchases
                                key={item._id}
                                historyPurchases={item}
                            />
                        );
                    })
                )}
            </div>
        );
    } else if (other === undefined) {
        return (
            <div className={styles.mainBlokInfo}>
                {reverseArray === undefined ? (
                    <div>Loadnig</div>
                ) : (
                    reverseArray.map((item) => {
                        return (
                            <CardPurchases
                                key={item._id}
                                historyPurchases={item}
                            />
                        );
                    })
                )}
            </div>
        );
    }
};

export default Purchases;
