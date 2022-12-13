import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Form from "../../common/form";

const FormPage = () => {
    const [data, setData] = useState({
        user: "",
        phone: "",
        mail: "",
        telegram: "",
        adress: ""
    });
    const handleChangeForm = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <form className={styles.form}>
            <Form
                name={"user"}
                value={data.user}
                label={"ФИО"}
                handleChangeForm={handleChangeForm}
                styles={styles}
            />
            <Form
                name={"phone"}
                value={data.phone}
                label={"Телефон"}
                handleChangeForm={handleChangeForm}
                styles={styles}
            />
            <Form
                name={"mail"}
                value={data.mail}
                label={"Электронная почта"}
                handleChangeForm={handleChangeForm}
                styles={styles}
            />
            <Form
                name={"telegram"}
                value={data.telegram}
                label={"telegram"}
                handleChangeForm={handleChangeForm}
                styles={styles}
            />
            <Form
                name={"adress"}
                value={data.adress}
                label={"Адресс куда отправить посылку"}
                handleChangeForm={handleChangeForm}
                styles={styles}
            />
            <div className={styles.blockCheckBox}>
                <input type="checkbox" value={true} name="checkbox" />
                <label htmlFor="checkbox" className={styles.labelCheckBox}>
                    Запомнить данные
                </label>
            </div>
            <button className={styles.button}>Оформить заказ</button>
        </form>
    );
};

export default FormPage;
