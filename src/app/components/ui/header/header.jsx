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
    const [statusMenu, setStatusMenu] = useState(false);
    const [styleMenu, setStyleMenu] = useState(styles.buttonMenu);
    const [styleHeader, setStyleHeader] = useState(styles.header);
    const [styleButton, setStyleButton] = useState(styles.button);
    const historyPurchases = useSelector(getAllPurchases());
    const history = useHistory();
    const user = useSelector(getUser());
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
    const handleMenu = () => {
        setStatusMenu((prevState) => (prevState = !prevState));
        if (!statusMenu) {
            setStyleMenu(styles.buttonMenuActive);
            setStyleHeader(styles.headerActive);
            setStyleButton(styles.buttonActive);
        }
        if (statusMenu) {
            setStyleMenu(styles.buttonMenu);
            setStyleHeader(styles.header);
            setStyleButton(styles.button);
        }
    };
    const handleHideMenu = () => {
        setStatusMenu(false);
        setStyleMenu(styles.buttonMenu);
        setStyleHeader(styles.header);
        setStyleButton(styles.button);
    };
    return (
        <header>
            <div className={styleHeader}>
                <div onClick={handleMenu} className={styleMenu}>
                    MENU
                </div>
                <Link to="/" className={styleButton} onClick={handleHideMenu}>
                    <h2 className={styles.h2}>Главная</h2>
                </Link>
                <Link
                    to="/productPage"
                    className={styleButton}
                    onClick={handleHideMenu}
                >
                    <h2 className={styles.h2}>Каталог</h2>
                </Link>

                <div className={styleButton}>
                    <h2 className={styles.h2}>
                        ₽:{" "}
                        {user !== undefined && user !== null
                            ? user.balance
                            : "----"}
                    </h2>
                </div>
                <Link
                    to="/basketPage"
                    className={styleButton}
                    onClick={handleHideMenu}
                >
                    <h2 className={styles.h2}>Корзина</h2>
                </Link>
                {historyPurchases === null ? (
                    <div className={styleButton}>Покупки</div>
                ) : (
                    <Link
                        to="/purchases"
                        className={styleButton}
                        onClick={handleHideMenu}
                    >
                        <h2 className={styles.h2}>Покупки</h2>
                    </Link>
                )}
                {isAdminStatus() && (
                    <Link
                        to="/adminPage"
                        className={styleButton}
                        onClick={handleHideMenu}
                    >
                        <h2 className={styles.h2}>Админка</h2>
                    </Link>
                )}

                {!user ? (
                    <Link
                        to="/login"
                        className={styleButton}
                        onClick={handleHideMenu}
                    >
                        <h2 className={styles.h2}>Вход</h2>
                    </Link>
                ) : (
                    <div
                        className={styleButton}
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
