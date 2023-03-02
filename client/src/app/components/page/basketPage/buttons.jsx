import React from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import localStorageService from "../../../services/localStorage.service";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/user";
import { basketService } from "../../../services/basket.service";

const Buttons = ({ amount }) => {
    const history = useHistory();
    const user = useSelector(getUser());
    const { clearBasket } = basketService;
    const needAutn = () => {
        if (user && amount > user.balance) {
            toast.error("Сумма превышает счет вашего баланса");
            return console.log(false);
        } else if (!user) {
            toast.error("Войдите в акаунт");
        } else if (user && amount <= user.balance) {
            localStorageService.setAmount(amount);
            history.push("/formPage");
        }
    };

    return (
        <div className={styles.blockButton}>
            <div
                className={styles.buttonClick}
                onClick={() => {
                    clearBasket(user);
                }}
            >
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
        </div>
    );
};
Buttons.propTypes = {
    amount: PropTypes.number
};
export default Buttons;
