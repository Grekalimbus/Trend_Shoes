import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../../services/user.service";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refreshToken";
const EXPIRES_KEY = "jwt-expires";

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
        // expiresDate - момент, к которому истечёт expiresIn
        const expiresDate = new Date().getTime() + expiresIn * 1000;
        localStorage.setItem(TOKEN_KEY, idToken);
        localStorage.setItem(REFRESH_KEY, refreshToken);
        localStorage.setItem(EXPIRES_KEY, expiresDate);
    }
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
            console.log(error);
        }
    }
    async function createUser(dataUserKey) {
        try {
            const data = userService.create(dataUserKey);
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
