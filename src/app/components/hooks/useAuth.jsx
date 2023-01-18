import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import userService from "../../services/user.service";
import localStorageService, {
    setTokens
} from "../../services/localStorage.service";
import httpServices from "../../services/http.service";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
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
    async function addProduct(id, object) {
        try {
            const data = await httpServices.put(`product/${id}.json`, object);
        } catch (error) {
            console.log(error);
        }
    }
    async function changeObjectQuantity(id, array) {
        try {
            const data = await httpServices.put(
                `product/${id}/quantity.json`,
                array
            );
        } catch (error) {
            console.log(error);
        }
    }
    async function addFirmDataBase(id, object) {
        try {
            const data = await httpServices.put(`firm/${id}.json`, object);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                addProduct,
                changeObjectQuantity,
                addFirmDataBase
            }}
        >
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
