import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Form from "../../common/form";
import validator from "../../../utils/validator";

const FormPage = () => {
    const [data, setData] = useState({
        user: "",
        phone: "",
        mail: "",
        telegram: "",
        adress: ""
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0 ? true : false;
    };
    const handleChangeForm = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(isValid);
    };
    const validatorConfig = {
        user: {
            isRequired: { message: "ФИО обязательно для заполнения" }
        },
        phone: {
            isRequired: { message: "Номер телефона обязателен для заполнения" }
        },
        mail: {
            isRequired: { message: "@mail обязательно для заполнения" }
        },
        telegram: {
            isRequired: { message: "telegram обязательно для заполнения" }
        },
        adress: {
            isRequired: { message: "Адресс обязательно для заполнения" }
        }
    };
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.divForm}>
                <Form
                    name={"user"}
                    value={data.user}
                    label={"ФИО"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.user}
                />
                <Form
                    name={"phone"}
                    value={data.phone}
                    label={"Телефон"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.phone}
                />
                <Form
                    name={"mail"}
                    value={data.mail}
                    label={"Электронная почта"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.mail}
                />
                <Form
                    name={"telegram"}
                    value={data.telegram}
                    label={"telegram"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.telegram}
                />
                <Form
                    name={"adress"}
                    value={data.adress}
                    label={"Адресс куда отправить посылку"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.adress}
                />
                <div className={styles.blockCheckBox}>
                    <input type="checkbox" value={true} name="checkbox" />
                    <label htmlFor="checkbox" className={styles.labelCheckBox}>
                        Запомнить данные
                    </label>
                </div>
                <button className={styles.button}>Оформить заказ</button>
            </div>
        </form>
    );
};

export default FormPage;
