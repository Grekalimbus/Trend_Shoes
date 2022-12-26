import React from "react";
import styles from "./index.module.css";
import CardPurchases from "./cardPurchases";
const Purchases = () => {
    return (
        <div className={styles.mainBlokInfo}>
            <CardPurchases />
            <CardPurchases />
            <CardPurchases />
            <CardPurchases />
            <CardPurchases />
            <CardPurchases />
        </div>
    );
};

export default Purchases;
