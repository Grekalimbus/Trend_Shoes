import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Form from "../../common/form";
import validator from "../../../utils/validator";
import { toast } from "react-toastify";
import validatorConfig from "../../../utils/validatorConfig";
import handleChangeProduct from "../../../services/purchases.service";
import { useSelector } from "react-redux";
import { getUserPurchases } from "../../../store/userPurchases";
import { getProduct } from "../../../store/product";
import { getUser } from "../../../store/user";
import { getBasketUser } from "../../../store/basketUser";
import { basketService } from "../../../services/basket.service";

const FormPage = () => {
    const historyPurchases = useSelector(getUserPurchases());
    const product = useSelector(getProduct());
    const basketProduct = useSelector(getBasketUser());
    const user = useSelector(getUser());
    const { clearBasket } = basketService;
    const [data, setData] = useState({
        user: "",
        phone: "",
        email: "",
        telegram: "",
        adress: ""
    });

    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);
    useEffect(() => {
        if (localStorage.getItem("dataForm")) {
            setData(JSON.parse(localStorage.getItem("dataForm")));
        } else {
            localStorage.removeItem("dataForm");
        }
    }, []);
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
        const quantityProduct = basketProduct.map((item) => {
            return item.quantity;
        });
        try {
            if (e.target[5].checked) {
                localStorage.setItem("dataForm", JSON.stringify(data));
            }
            if (!e.target[5].checked) {
                localStorage.removeItem("dataForm");
            }
            await handleChangeProduct(
                basketProduct,
                quantityProduct,
                data,
                user,
                product,
                historyPurchases
            );
            clearBasket(user);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.log(error);
        }
    };
    return !basketProduct || basketProduct?.length === 0 ? (
        <div className={styles.processing}>
            Вы оформили заказ и находится в обработке
        </div>
    ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.divForm}>
                <Form
                    name={"user"}
                    value={data.user}
                    label={"Имя Фамилия"}
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
                    error={errors.adress}
                />
                <div className={styles.blockCheckBox}>
                    <input type="checkbox" name="checkbox" />
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
