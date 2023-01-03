import React, { useState, useEffect } from "react";
import styles from "../index.module.css";
import Form from "../../../common/form";
import validator from "../../../../utils/validator";
import validatorConfig from "../../../../utils/validatorConfig";

const AddFirm = () => {
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
        </div>
    );
};
export default AddFirm;
