import React, { useState, useEffect } from "react";
import Buttons from "./buttons";
import CardBasket from "./cardBasket";
import styles from "./index.module.css";
import NotBasket from "./notBasket";
import { useSelector } from "react-redux";
import { getBasketUser } from "../../../store/basketUser";

const BasketPage = () => {
    const basket = useSelector(getBasketUser());
    const [amount, setAmount] = useState(0);
    useEffect(() => {
        if (basket) {
            basket.forEach((item) => {
                item.quantity.forEach((q) => {
                    setAmount(
                        (prevState) => (prevState += item.price * q.value)
                    );
                });
            });
        }
    }, [basket]);
    const handleIncrementAmount = (price) => {
        setAmount((prevState) => (prevState += price));
    };
    const handleDecrementAmount = (price) => {
        setAmount((prevState) => (prevState -= price));
    };
    return !basket || basket.length <= 0 ? (
        <NotBasket />
    ) : (
        <div>
            <div className={styles.blockBasket}>
                {basket.map((item) => {
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
