import React from "react";
import Form from "../../common/form";
import styles from "./index.module.css";
import stylesForm from "../formPage/index.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SignUPForm = ({ data, error, handleChangeForm }) => {
    return (
        <div className={styles.flex}>
            <Form
                name={"email"}
                value={data.email}
                handleChangeForm={handleChangeForm}
                styles={stylesForm}
                error={error.email}
                label={"Электронная почта"}
            />
            <Form
                name={"password"}
                value={data.password}
                handleChangeForm={handleChangeForm}
                styles={stylesForm}
                error={error.password}
                label={"Пароль"}
                type={"password"}
            />
            <Form
                name={"repeatPassword"}
                value={data.repeatPassword}
                handleChangeForm={handleChangeForm}
                styles={stylesForm}
                error={error.repeatPassword}
                label={"Повторите пароль"}
                type={"password"}
            />
            <div className={styles.flexButtons}>
                <Link to="/login/exit" className={styles.button}>
                    <p className={styles.textLink}>У меня уже есть акаунт</p>
                </Link>
                <button type="submit" className={styles.button}>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
};

SignUPForm.propTypes = {
    data: PropTypes.object,
    error: PropTypes.object,
    handleChangeForm: PropTypes.func
};
export default SignUPForm;
