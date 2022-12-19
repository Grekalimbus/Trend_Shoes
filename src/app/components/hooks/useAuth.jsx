import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../../services/user.service";
import { setTokens } from "../../services/localStorage.service";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    async function signUp({ email, password }) {
        const key = "AIzaSyCypYdSOsrKE2MT68JMCTLT9XKPESR35xU";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        try {
            const { data } = await axios.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            createUser(data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email уже зарегестрирован"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function createUser(dataUserKey) {
        try {
            userService.create(dataUserKey);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <AuthContext.Provider value={{ signUp }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
