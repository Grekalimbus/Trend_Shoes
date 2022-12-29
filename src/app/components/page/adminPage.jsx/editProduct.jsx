import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useApi } from "../../hooks/useApi";
import Form from "../../common/form";
import validator from "../../../utils/validator";
import validatorConfig from "../../../utils/validatorConfig";
import { toast } from "react-toastify";

const EditProduct = () => {
    const { product } = useApi();
    const [activeProduct, setProduct] = useState(null);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        name: "",
        url1: "",
        url2: "",
        url3: "",
        price: ""
    });
    const changeActiveProduct = (idProduct) => {
        const filterProduct = product.filter((item) => {
            return item._id === idProduct;
        });
        const objectProduct = filterProduct[0];
        setProduct(objectProduct);
        setData((prevState) => ({
            ...prevState,
            name: objectProduct.name,
            url1: objectProduct.imgProduct[0],
            price: String(objectProduct.price)
        }));
    };
    const handleChangeForm = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        console.log(target.value);
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const filterProduct =
            activeProduct === null
                ? null
                : product.filter((item) => {
                      return item._id === activeProduct._id;
                  });
        const objectProduct = filterProduct === null ? null : filterProduct[0];
        const isValid = validate();
        if (!isValid) {
            return toast.error("Правильно заполните все участки формы");
        } else if (
            data.name === objectProduct.name &&
            data.url1 === objectProduct.imgProduct[0] &&
            Number(data.price) === objectProduct.price
        ) {
            return toast.error("Изменений не было");
        }
        return toast.success("четко");
    };
    return product === null ? (
        <div>Loading</div>
    ) : (
        <div className={styles.wrapPageEdit}>
            <div className={styles.flexElemProduct}>
                {product.map((item) => {
                    return (
                        <div key={item._id} className={styles.elemProduct}>
                            <h3 className={styles.titleName}>{item.name}</h3>
                            <div className={styles.wrapImg}>
                                <img
                                    src={item.imgProduct[0]}
                                    alt={item.name}
                                    className={styles.img}
                                />
                            </div>

                            <button
                                className={styles.buttonPick}
                                onClick={() => {
                                    changeActiveProduct(item._id);
                                }}
                            >
                                Выбрать
                            </button>
                        </div>
                    );
                })}
            </div>

            <form className={styles.flexElemForm} onSubmit={handleSubmit}>
                <Form
                    name={"name"}
                    value={data.name}
                    label={"Название товара"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.name}
                />
                <Form
                    name={"url1"}
                    value={data.url1}
                    label={"Ссылка на фото"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.url1}
                />
                <Form
                    name={"url2"}
                    value={data.url2}
                    label={"Ссылка на фото"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={""}
                />
                <Form
                    name={"url3"}
                    value={data.url3}
                    label={"Ссылка на фото"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={""}
                />
                <Form
                    name={"price"}
                    value={data.price}
                    label={"Цена"}
                    handleChangeForm={handleChangeForm}
                    styles={styles}
                    error={errors.price}
                />
                <button className={styles.button}>Отредактировать</button>
            </form>
        </div>
    );
};

export default EditProduct;
