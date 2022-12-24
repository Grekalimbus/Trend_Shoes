import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Buttons = ({ amount }) => {
    const { user } = useAuth();
    const clearBasket = () => {
        localStorage.setItem("storageBasket", "[]");
        location.reload();
    };
    const needAutn = (user) => {
        if (!user) return toast.error("Чтобы оформить заказ, войти в акаунт");
    };
    return (
        <div className={styles.blockButton}>
            <div className={styles.buttonClick} onClick={clearBasket}>
                Очистить
            </div>
            <div className={styles.amount}>Сумма: {amount}</div>
            {user !== undefined ? (
                <Link to="/formPage" className={styles.buttonClick}>
                    <p className={styles.title}>Оформить заказ</p>
                </Link>
            ) : (
                <div
                    className={styles.buttonClick}
                    onClick={() => {
                        needAutn();
                    }}
                >
                    Оформить заказ
                </div>
            )}
        </div>
    );
};
Buttons.propTypes = {
    amount: PropTypes.number
};
export default Buttons;
