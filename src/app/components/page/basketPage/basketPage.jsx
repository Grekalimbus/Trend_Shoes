import React from "react";
import Buttons from "./buttons";
import CardBasket from "./cardBasket";
import styles from "./index.module.css";
import NotBasket from "./notBasket";

const BasketPage = () => {
    const dataLocalStorage = JSON.parse(localStorage.getItem("storageBasket"));
    return dataLocalStorage.length <= 0 ? (
        <NotBasket />
    ) : (
        <div>
            <div className={styles.blockBasket}>
                {dataLocalStorage.map((item) => {
                    return <CardBasket key={item._id} data={item} />;
                })}
            </div>
            <Buttons />
        </div>
    );
};

export default BasketPage;
