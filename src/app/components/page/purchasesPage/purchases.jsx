import React from "react";
import styles from "./index.module.css";
import CardPurchases from "./cardPurchases";
import { useApi } from "../../hooks/useApi";

const Purchases = () => {
    const { historyPurchases } = useApi();
    const reverseArray =
        historyPurchases !== undefined
            ? historyPurchases.reverse()
            : historyPurchases;
    return (
        <div className={styles.mainBlokInfo}>
            {historyPurchases === undefined ? (
                <div>Loadnig</div>
            ) : (
                reverseArray.map((item) => {
                    return (
                        <CardPurchases key={item._id} historyPurchases={item} />
                    );
                })
            )}
        </div>
    );
};

export default Purchases;
