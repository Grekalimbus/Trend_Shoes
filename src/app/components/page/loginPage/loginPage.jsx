import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import SignInForm from "./signInForm";
import SignUPForm from "./signUpForm";
import validatorConfig from "../../../utils/validatorConfig";
import validator from "../../../utils/validator";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
    const { signUp } = useAuth();
    const [data, setData] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    const [errors, setErrors] = useState({});
    const { exit } = useParams();
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
        signUp(data);
        console.log(data);
        toast.success("Вы зарегались");
    };

    return (
        <div className={styles.wrapperForm}>
            <form onSubmit={handleSubmit}>
                {exit ? (
                    <SignInForm
                        data={data}
                        error={errors}
                        handleChangeForm={handleChangeForm}
                    />
                ) : (
                    <SignUPForm
                        data={data}
                        error={errors}
                        handleChangeForm={handleChangeForm}
                    />
                )}
            </form>
        </div>
    );
};

export default LoginPage;
