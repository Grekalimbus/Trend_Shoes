import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Buttons = ({ amount }) => {
    const history = useHistory();
    const { user } = useAuth();
    const clearBasket = () => {
        localStorage.setItem("storageBasket", "[]");
        location.reload();
    };
    const needAutn = () => {
        if (user && amount > user.balance) {
            toast.error("Сумма превышает счет вашего баланса");
            return console.log(false);
        } else if (!user) {
            toast.error("Войдите в акаунт");
        } else if (user && amount <= user.balance) {
            history.push("/formPage");
        }
    };

    return (
        <div className={styles.blockButton}>
            <div className={styles.buttonClick} onClick={clearBasket}>
                Очистить
            </div>
            <div className={styles.amount}>Сумма: {amount}</div>

            <div
                className={styles.buttonClick}
                onClick={() => {
                    needAutn();
                }}
            >
                Оформить заказ
            </div>

            {/* {callAuthFunck === "true" ? (
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
            )} */}
        </div>
    );
};
Buttons.propTypes = {
    amount: PropTypes.number
};
export default Buttons;
