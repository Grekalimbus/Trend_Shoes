import React, { useState } from "react";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import SignInForm from "./signInForm";
import SignUPForm from "./signUpForm";

const LoginPage = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });
    const [errors, setErrors] = useState({});
    const { exit } = useParams();

    const handleChangeForm = ({ target }) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
        console.log(data);
    };
    const handleSubmit = () => {
        console.log("submit");
    };

    return (
        <div className={styles.wrapperForm}>
            <form onSubmit={handleSubmit}>
                {exit ? (
                    <SignInForm />
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
