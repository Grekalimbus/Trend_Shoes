import React, { useState, useEffect } from "react";
import styles from "../index.module.css";
import Form from "../../../common/form";
import validator from "../../../../utils/validator";
import validatorConfig from "../../../../utils/validatorConfig";
import { toast } from "react-toastify";
import productService from "../../../../services/product.service";

const AddFirm = () => {
    const { addFirm } = productService;
    const [data, setData] = useState({ id: "", firm: "" });
    const [errors, setErrors] = useState({});
    const handleChangeForm = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        validate();
    }, [data]);

    const submitFirm = async () => {
        try {
            if (data.id.length >= 8 && data.firm !== "") {
                const object = { _id: data.id, name: data.firm };
                await addFirm(data.id, object);
                window.location.reload();
            }
            if (data.id.length < 8 && data.firm !== "") {
                toast.error("Заполните правильно участки");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.addFirmPage}>
            <Form
                name="id"
                value={data.id}
                handleChangeForm={handleChangeForm}
                styles={styles}
                label="Уникальный id"
                error={errors.id}
            />
            <Form
                name="firm"
                value={data.firm}
                handleChangeForm={handleChangeForm}
                styles={styles}
                label="Название фирмы"
                error={errors.firm}
            />
            <button className={styles.button} onClick={submitFirm}>
                Добавить
            </button>
        </div>
    );
};
export default AddFirm;
