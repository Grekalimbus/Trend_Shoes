import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import Form from "../../../common/form";
import validatorConfig from "../../../../utils/validatorConfig";
import validator from "../../../../utils/validator";
import { toast } from "react-toastify";
import BlockSizesValue from "./blockSizeValue";
import handleChangeQuantityFunc from "../../../../utils/changeSizes";
import { useSelector } from "react-redux";
import { getFirm, getIsLoadingFirmStatus } from "../../../../store/firm";
import productService from "../../../../services/product.service";

const AddNewProduct = () => {
    const dataFirm = useSelector(getFirm());
    const isLoading = useSelector(getIsLoadingFirmStatus());
    const { add } = productService;
    const [quantityObject, setQuantityObject] = useState([
        { sizes: 37, value: 0 },
        { sizes: 38, value: 0 },
        { sizes: 39, value: 0 },
        { sizes: 40, value: 0 },
        { sizes: 41, value: 0 },
        { sizes: 42, value: 0 },
        { sizes: 43, value: 0 },
        { sizes: 44, value: 0 },
        { sizes: 45, value: 0 },
        { sizes: 46, value: 0 },
        { sizes: 47, value: 0 },
        { sizes: 48, value: 0 }
    ]);
    const quantity = quantityObject.some((item) => {
        return item.value !== 0;
    });
    const [data, setData] = useState({
        firm: "",
        id: "",
        name: "",
        url1: "",
        url2: "",
        url3: "",
        price: ""
    });
    const arrayLabelForm = [
        "Уникальный ID из 8 символов",
        "Имя товара",
        "1-я ссылка на фото товара",
        "2-я ссылка на фото товара",
        "3-я ссылка на фото товара",
        "Стоимость товара"
    ];
    const filterData = Object.keys(data).filter((item) => {
        return item !== "firm";
    });
    const [errors, setErrors] = useState({ id: "" });

    const handleChangeQuantity = (object, { target }) => {
        handleChangeQuantityFunc(
            object,
            target,
            setQuantityObject,
            quantityObject
        );
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    const handleChangeForm = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        if (target.value === "Выбрать фирму") {
            setData((prevState) => ({ ...prevState, [target.name]: "" }));
        }
    };
    const handleSubmit = async () => {
        const isValid = validate();
        if (!isValid) {
            if (!data.firm) {
                return toast.error("Выберите фирму товара");
            }
            return toast.error("Правильно заполните все участки формы");
        }
        if (!quantity) {
            return toast.error("Выберите размеры");
        }
        const filterArraySizes = quantityObject.filter(
            (item) => item.value !== 0
        );

        const arrayUrl = [data.url1, data.url2, data.url3];
        const filterArrayUrl = arrayUrl.filter((item) => item !== "");

        const newObjectForDataBase = {
            _id: data.id,
            name: data.name,
            firm: data.firm,
            price: Number(data.price),
            quantity: filterArraySizes,
            imgProduct: filterArrayUrl
        };
        try {
            console.log(newObjectForDataBase);
            await add(newObjectForDataBase);
            localStorage.setItem("storageBasket", "[]");
            localStorage.setItem("dataSizes", "[]");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    if (isLoading) {
        return <div>Loading</div>;
    } else if (!isLoading) {
        return (
            <div className={styles.wrappNewProduct}>
                <select
                    className={`form-select ${styles.flexElemSelect}`}
                    aria-label="Default select example"
                    value={data.firm}
                    name="firm"
                    onChange={(e) => {
                        handleChangeForm(e);
                    }}
                >
                    <option value="">Выбрать фирму</option>
                    {Object.keys(dataFirm).map((item) => {
                        return (
                            <option
                                key={item}
                                value={dataFirm[item].id}
                                className={styles.option}
                            >
                                {dataFirm[item].name}
                            </option>
                        );
                    })}
                </select>
                {filterData.map((item, index) => {
                    return (
                        <Form
                            key={item}
                            name={item}
                            value={data[item]}
                            label={arrayLabelForm[index]}
                            handleChangeForm={handleChangeForm}
                            styles={styles}
                            error={errors[item]}
                        />
                    );
                })}
                <div className={styles.flexElemSizesForForm}>
                    {quantityObject.map((item) => {
                        return (
                            <BlockSizesValue
                                key={item.sizes}
                                object={item}
                                handleChangeQuantity={handleChangeQuantity}
                            />
                        );
                    })}
                </div>

                <button
                    className={styles.buttonAddProduct}
                    onClick={handleSubmit}
                >
                    Добавить товар
                </button>
            </div>
        );
    }
};
export default AddNewProduct;
