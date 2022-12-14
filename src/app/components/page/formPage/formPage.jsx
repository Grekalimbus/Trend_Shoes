import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Form from "../../common/form";
import validator from "../../../utils/validator";
import { toast } from "react-toastify";
import getFilterProductCart from "../../../utils/filterProductCart";

const FormPage = () => {
    const [data, setData] = useState({
        user: "",
        phone: "",
        mail: "",
        telegram: "",
        adress: ""
    });
    const filterProductCart = getFilterProductCart();
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChangeForm = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return toast.error("Правильно заполните все участки формы");
        }
        localStorage.setItem("storageBasket", "[]");
        window.location.reload();
    };
    const validatorConfig = {
        user: {
            isRequired: { message: "ФИО обязательно для заполнения" },
            isUser: {
                message: "Введине ФИО полностью"
            }
        },
        phone: {
            isRequired: { message: "Номер телефона обязателен для заполнения" },
            isPhone: { message: "Номер должен состоять только из цифр" }
        },
        mail: {
            isRequired: { message: "@mail обязательно для заполнения" },
            isEmail: { message: "Почта указана не верно" }
        },
        telegram: {
            isRequired: { message: "telegram обязательно для заполнения" }
        },
        adress: {
            isRequired: { message: "Адресс обязательно для заполнения" }
        }
    };
    return filterProductCart.length === 0 ? (
        <div className={styles.processing}>
            Вы оформили заказ и находится в обработке
        </div>
    ) : (
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
