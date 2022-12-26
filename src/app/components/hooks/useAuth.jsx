import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../../services/user.service";
import localStorageService, {
    setTokens
} from "../../services/localStorage.service";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    async function signUp({ email, password }) {
        const key = "AIzaSyCypYdSOsrKE2MT68JMCTLT9XKPESR35xU";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        try {
            const { data } = await axios.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens({ ...data });
            createUser({ ...data, balance: 10000 });
            setUser({ ...data, balance: 10000 });
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
            const data = userService
                .create(dataUserKey)
                .then((res) => setUser(res));
        } catch (error) {
            console.log(error);
        }
    }
    async function loginIn({ email, password }) {
        const key = "AIzaSyCypYdSOsrKE2MT68JMCTLT9XKPESR35xU";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
        try {
            const { data } = await axios.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens({ ...data });
            getUserData();
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObject = { password: "Неверный пароль" };
                    throw errorObject;
                }
            }
        }
    }
    async function getUserData() {
        try {
            const data = await userService.getCurrentUser();
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        }
    }, []);
    async function refreshTokenChek() {
        const key = "AIzaSyCypYdSOsrKE2MT68JMCTLT9XKPESR35xU";
        const url = "https://securetoken.googleapis.com/v1/token?key=";
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        if (refreshToken && expiresDate < Date.now()) {
            const { data } = await axios.post(url + key, {
                grant_type: "refresh_token",
                refresh_token: refreshToken
            });
            console.log(data);
            localStorageService.setTokens({
                refreshToken: data.refresh_token,
                idToken: data.id_token,
                localId: data.user_id,
                expiresIn: data.expires_in
            });
        }
    }
    useEffect(() => {
        refreshTokenChek();
    }, []);
    return (
        <AuthContext.Provider value={{ signUp, loginIn, user }}>
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
