import React, { useState } from "react";
import styles from "./header.module.css";
import { Link, useHistory } from "react-router-dom";
import localStorageService, {
    deleteTokens
} from "../../../services/localStorage.service";
import { getUser } from "../../../store/user";
import { useSelector } from "react-redux";
import NotUser from "./notUser";
import HaveUser from "./haveUser";

const Header = () => {
    const [statusMenu, setStatusMenu] = useState(false);
    const [styleMenu, setStyleMenu] = useState(styles.buttonMenu);
    const [styleHeader, setStyleHeader] = useState(styles.header);
    const [styleButton, setStyleButton] = useState(styles.button);
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
        localStorage.setItem("storageBasket", "[]");
        localStorage.setItem("dataSizes", "[]");
        window.location.reload();
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
            {!user ? (
                <NotUser
                    handleMenu={handleMenu}
                    handleHideMenu={handleHideMenu}
                    styleMenu={styleMenu}
                    styleHeader={styleHeader}
                    styleButton={styleButton}
                />
            ) : (
                <HaveUser
                    handleHideMenu={handleHideMenu}
                    handleMenu={handleMenu}
                    isAdminStatus={isAdminStatus}
                    handleGoOut={handleGoOut}
                    balance={user.balance}
                    styleMenu={styleMenu}
                    styleHeader={styleHeader}
                    styleButton={styleButton}
                />
            )}
        </header>
    );
};

export default Header;
