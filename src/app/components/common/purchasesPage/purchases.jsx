import React from "react";
import styles from "./index.module.css";
import CardPurchases from "./cardPurchases";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPurchases } from "../../../store/userPurchases";
import { getAllPurchases } from "../../../store/allPurchases";

const Purchases = () => {
    const { other } = useParams();
    const historyPurchases = useSelector(getPurchases());
    const allHistoryPurchases = useSelector(getAllPurchases());

    const keyUsers =
        allHistoryPurchases !== null ? Object.keys(allHistoryPurchases) : null;

    const createArrayHistory = () => {
        const allHistory = [];
        if (keyUsers !== null && allHistoryPurchases !== null) {
            keyUsers.forEach((key) => {
                allHistoryPurchases[key].forEach((item) => {
                    allHistory.push(item);
                });
            });
            return allHistory;
        } else {
            return null;
        }
    };
    const arrayAllHistory = createArrayHistory();
    const reserveAllHistory =
        arrayAllHistory !== null ? arrayAllHistory.reverse() : null;
    const reversehistoryPurchases = () => {
        const reversehistoryPurchases = [];
        if (historyPurchases) {
            const index = historyPurchases.map((el, index) => index);
            const reverseIndex = index.reverse();
            reverseIndex.forEach((item) =>
                reversehistoryPurchases.push(historyPurchases[item])
            );
            return reversehistoryPurchases;
        }
    };
    reversehistoryPurchases();

    if (other !== undefined) {
        return (
            <div className={styles.mainBlokInfo}>
                {!historyPurchases && !allHistoryPurchases ? (
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
                {!historyPurchases && !allHistoryPurchases ? (
                    <div>Loadnig</div>
                ) : (
                    reversehistoryPurchases().map((item) => {
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
