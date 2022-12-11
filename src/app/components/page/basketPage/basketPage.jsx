import React from "react";
import Buttons from "./buttons";
import CardBasket from "./cardBasket";
import styles from "./index.module.css";

const BasketPage = () => {
    return (
        <div>
            <div className={styles.blockBasket}>
                <CardBasket />
                <CardBasket />
                <CardBasket />
            </div>
            <Buttons />
        </div>
    );
};

export default BasketPage;
