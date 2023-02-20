import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useParams, useHistory } from "react-router-dom";
import SignInForm from "./signInForm";
import SignUPForm from "./signUpForm";
import validatorConfig from "../../../utils/validatorConfig";
import validator from "../../../utils/validator";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
    getErrorPassword,
    getUser,
    loginIn,
    signUp
} from "../../../store/user";

const LoginPage = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });
    const user = useSelector(getUser());
    const error = useSelector(getErrorPassword());
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const { exit } = useParams();
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        if (exit) {
            delete errors.repeatPassword;
        }

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
        if (!exit) {
            if (error) {
                validate();
                setErrors({ ...error });
            }
            dispatch(signUp(data));
            history.push("/");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        if (exit) {
            dispatch(loginIn(data));
            history.push("/");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };
    if (user) {
        return <div className={styles.trueUp}>Вы вошли в акаунт</div>;
    } else {
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
    }
};

export default LoginPage;
