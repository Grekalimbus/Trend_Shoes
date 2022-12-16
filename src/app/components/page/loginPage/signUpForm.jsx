import React from "react";
import Form from "../../common/form";
import styles from "./index.module.css";
import stylesForm from "../formPage/index.module.css";
import PropTypes from "prop-types";

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
            <button className={styles.button}>Зарегистрироваться</button>
        </div>
    );
};

SignUPForm.propTypes = {
    data: PropTypes.object,
    error: PropTypes.object,
    handleChangeForm: PropTypes.func
};
export default SignUPForm;
