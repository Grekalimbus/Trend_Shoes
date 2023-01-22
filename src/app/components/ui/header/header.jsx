import React, { useState } from "react";
import styles from "./header.module.css";
import { Link, useHistory } from "react-router-dom";
import localStorageService, {
    deleteTokens
} from "../../../services/localStorage.service";
import { useSelector } from "react-redux";
import { getUser } from "../../../store/user";
import { getAllPurchases } from "../../../store/allPurchases";

const Header = () => {
    const [color, setColor] = useState(true);
    const historyPurchases = useSelector(getAllPurchases());
    const history = useHistory();
    const user = useSelector(getUser());
    setTimeout(() => {
        setColor((pervState) => !pervState);
    }, 5000);
    function isAdminStatus() {
        if (user !== undefined && user !== null) {
            if (user.email === "grechkin-danil@mail.ru") {
                return true;
            }
        }
        return false;
    }

    const handleGoOut = () => {
        deleteTokens();
        history.push("/");
        location.reload();
    };
    return (
        <header>
            <div
                className={color === true ? styles.header : styles.headerChange}
            >
                <Link to="/" className={styles.button}>
                    <h2 className={styles.h2}>Главная</h2>
                </Link>
                <Link to="/productPage" className={styles.button}>
                    <h2 className={styles.h2}>Каталог</h2>
                </Link>

                <div className={styles.button}>
                    <h2 className={styles.h2}>
                        ₽:{" "}
                        {user !== undefined && user !== null
                            ? user.balance
                            : "----"}
                    </h2>
                </div>
                <Link to="/basketPage" className={styles.button}>
                    <h2 className={styles.h2}>Корзина</h2>
                </Link>
                {historyPurchases === null ? (
                    <div className={styles.button}>Покупки</div>
                ) : (
                    <Link to="/purchases" className={styles.button}>
                        <h2 className={styles.h2}>Покупки</h2>
                    </Link>
                )}
                {isAdminStatus() && (
                    <Link to="/adminPage" className={styles.button}>
                        <h2 className={styles.h2}>Админка</h2>
                    </Link>
                )}

                {user === null ? (
                    <Link to="/login" className={styles.button}>
                        <h2 className={styles.h2}>Вход / Регистрация</h2>
                    </Link>
                ) : (
                    <div
                        className={styles.button}
                        onClick={() => {
                            handleGoOut();
                        }}
                    >
                        <h2 className={styles.h2}>Выйти</h2>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
