import React from "react";
import styles from "./index.module.css";
import CardPurchases from "./cardPurchases";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserPurchases } from "../../../store/userPurchases";
import { getAllPurchases } from "../../../store/allPurchases";

const Purchases = () => {
    const { other } = useParams();
    const historyPurchases = useSelector(getUserPurchases());
    const allHistoryPurchases = useSelector(getAllPurchases());
    console.log("historyPurchases", historyPurchases);
    console.log("allHistoryPurchases", allHistoryPurchases);

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
    // const keyUsers =
    //     allHistoryPurchases !== null ? Object.keys(allHistoryPurchases) : null;

    // const createArrayHistory = () => {
    //     const allHistory = [];
    //     if (keyUsers !== null && allHistoryPurchases !== null) {
    //         keyUsers.forEach((key) => {
    //             allHistoryPurchases[key].forEach((item) => {
    //                 allHistory.push(item);
    //             });
    //         });
    //         return allHistory;
    //     } else {
    //         return null;
    //     }
    // };
    const arrayAllHistory = createArrayHistoryAll();
    const reserveAllHistory = arrayAllHistory
        ? arrayAllHistory.reverse()
        : null;
    // const reversehistoryPurchases = () => {
    //     const reversehistoryPurchases = [];
    //     if (historyPurchases) {
    //         const index = historyPurchases.map((el, index) => index);
    //         const reverseIndex = index.reverse();
    //         reverseIndex.forEach((item) =>
    //             reversehistoryPurchases.push(historyPurchases[item])
    //         );
    //         return reversehistoryPurchases;
    //     }
    // };
    // reversehistoryPurchases();
    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // if (other !== undefined) {
    //     return (
    //         <div className={styles.mainBlokInfo}>
    //             {!historyPurchases && !allHistoryPurchases ? (
    //                 <div>Loading</div>
    //             ) : (
    //                 reserveAllHistory.map((item) => {
    //                     return (
    //                         <CardPurchases
    //                             key={item._id + randomIntFromInterval(1, 1500)}
    //                             historyPurchases={item}
    //                         />
    //                     );
    //                 })
    //             )}
    //         </div>
    //     );
    // } else if (other === undefined) {
    //     return (
    //         <div className={styles.mainBlokInfo}>
    //             {!historyPurchases && !allHistoryPurchases ? (
    //                 <div>Loadnig</div>
    //             ) : (
    //                 reversehistoryPurchases().map((item) => {
    //                     return (
    //                         <CardPurchases
    //                             key={item._id + randomIntFromInterval(1, 1500)}
    //                             historyPurchases={item}
    //                         />
    //                     );
    //                 })
    //             )}
    //         </div>
    //     );
    // }
    if (other !== undefined) {
        return (
            <div className={styles.mainBlokInfo}>
                {!historyPurchases?.history && !allHistoryPurchases ? (
                    <div>Loading</div>
                ) : (
                    reserveAllHistory.map((item) => {
                        return (
                            <CardPurchases
                                key={item._id + randomIntFromInterval(1, 1500)}
                                historyPurchases={item.history}
                            />
                        );
                    })
                )}
            </div>
        );
    } else if (other === undefined) {
        return (
            <div className={styles.mainBlokInfo}>
                {!historyPurchases?.history && !allHistoryPurchases ? (
                    <div>Loadnig</div>
                ) : (
                    reserveAllHistory.map((item) => {
                        return (
                            <CardPurchases
                                key={item._id + randomIntFromInterval(1, 1500)}
                                historyPurchases={item.history}
                            />
                        );
                    })
                )}
            </div>
        );
    }
};

export default Purchases;
