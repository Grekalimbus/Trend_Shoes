import React, { useContext } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import httpServices from "../../services/http.service";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const signUp = async () => {
        const key = "AIzaSyCypYdSOsrKE2MT68JMCTLT9XKPESR35xU";
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
        // const { data } = await httpServices.post(url, {
        //     email,
        //     password,
        //     returnSecureToken: true
        // });
        // console.log(data);
    };
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
