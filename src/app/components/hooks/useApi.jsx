import React, { useContext } from "react";
import PropTypes from "prop-types";

const ApiContext = React.createContext();

export const useApi = () => {
    return useContext(ApiContext);
};

const ApiProvider = ({ children }) => {
    return (
        <ApiContext.Provider value={{ val: 1 }}>{children}</ApiContext.Provider>
    );
};

ApiProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default ApiProvider;
