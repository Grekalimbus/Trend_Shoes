import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useApi } from "../../../hooks/useApi";
import Form from "../../../common/form";
import validatorConfig from "../../../../utils/validatorConfig";
import validator from "../../../../utils/validator";
import { toast } from "react-toastify";
import BlockSizesValue from "./blockSizeValue";

const AddNewProduct = () => {
    const { dataFirm } = useApi();
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
    // console.log(arrayData);
    const sizesObject = [
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
    ];
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
    const handleSubmit = () => {
        const isValid = validate();
        if (!isValid) {
            return toast.error("Правильно заполните все участки формы");
        }
        console.log(data);
    };
    if (!dataFirm) {
        return <div>Loading</div>;
    } else if (dataFirm) {
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
                                value={item}
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
                    {sizesObject.map((item) => {
                        return (
                            <BlockSizesValue key={item.sizes} object={item} />
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
