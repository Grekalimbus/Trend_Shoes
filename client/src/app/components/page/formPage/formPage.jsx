import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Form from "../../common/form";
import validator from "../../../utils/validator";
import { toast } from "react-toastify";
import getFilterProductCart from "../../../utils/filterProductCart";
import validatorConfig from "../../../utils/validatorConfig";
import handleChangeProduct from "../../../services/purchases.service";
import { useSelector } from "react-redux";
import { getUserPurchases } from "../../../store/userPurchases";
import { getProduct } from "../../../store/product";
import { getUser } from "../../../store/user";
// import { useApi } from "../../hooks/useApi";

const FormPage = () => {
    const historyPurchases = useSelector(getUserPurchases());
    const product = useSelector(getProduct());
    const user = useSelector(getUser());
    // const [data, setData] = useState({
    //     user: "",
    //     phone: "",
    //     email: "",
    //     telegram: "",
    //     adress: ""
    // });
    const [data, setData] = useState({
        user: ""
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return toast.error("Правильно заполните все участки формы");
        }
        const quantityProduct = filterProductCart.map((item) => {
            return item.quantity;
        });
        try {
            await handleChangeProduct(
                filterProductCart,
                quantityProduct,
                data,
                user,
                product,
                historyPurchases
            );
            localStorage.setItem("storageBasket", "[]");
            // window.location.reload();
        } catch (error) {
            console.log(error);
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
                {/* <Form
                    name={"phone"}
                    value={data.phone}
                    label={"Телефон"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.phone}
                />
                <Form
                    name={"email"}
                    value={data.email}
                    label={"Электронная почта"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.email}
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
                    error={errors.adress} */}
                {/* /> */}
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
