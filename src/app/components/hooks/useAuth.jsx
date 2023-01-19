import React, { useContext } from "react";
import PropTypes from "prop-types";
import httpServices from "../../services/http.service";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
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
