import React, { useState, useEffect } from "react";
import Buttons from "./buttons";
import CardBasket from "./cardBasket";
import styles from "./index.module.css";
import NotBasket from "./notBasket";

const BasketPage = () => {
    const [amount, setAmount] = useState(0);
    const dataLocalStorage = JSON.parse(localStorage.getItem("storageBasket"));
    const dataSizes = JSON.parse(localStorage.getItem("dataSizes"));
    const filterProductCart = dataLocalStorage.filter((item, index) => {
        return (
            JSON.stringify(item.quantity) !== JSON.stringify(dataSizes[index])
        );
    });
    useEffect(() => {
        filterProductCart.forEach((item) => {
            item.quantity.forEach((q) => {
                setAmount((prevState) => (prevState += item.price * q.value));
            });
        });
    }, []);
    const handleIncrementAmount = (price) => {
        setAmount((prevState) => (prevState += price));
    };
    const handleDecrementAmount = (price) => {
        setAmount((prevState) => (prevState -= price));
    };
    return filterProductCart.length <= 0 ? (
        <NotBasket />
    ) : (
        <div>
            <div className={styles.blockBasket}>
                {filterProductCart.map((item) => {
                    return (
                        <CardBasket
                            key={item._id}
                            dataProduct={item}
                            handleIncrementAmount={handleIncrementAmount}
                            handleDecrementAmount={handleDecrementAmount}
                        />
                    );
                })}
            </div>
            <Buttons amount={amount} />
        </div>
    );
};

export default BasketPage;
