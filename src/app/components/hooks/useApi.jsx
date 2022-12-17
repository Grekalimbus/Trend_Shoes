import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import httpServices from "../../services/http.service";

const ApiContext = React.createContext();

export const useApi = () => {
    return useContext(ApiContext);
};

const ApiProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [dataFirm, setDataFirm] = useState(null);

    // пулл данных в состояния product/dataFirm
    useEffect(() => {
        const getDataProductAndFirm = async () => {
            try {
                const { data } = await httpServices.get(".json");
                const { product, firm } = data;
                setProduct(Object.keys(product).map((item) => product[item]));
                setDataFirm(firm);
            } catch (error) {
                console.log("expectedErrors");
            }
        };

        getDataProductAndFirm();
    }, []);
    return (
        <ApiContext.Provider value={{ product: product, dataFirm: dataFirm }}>
            {children}
        </ApiContext.Provider>
    );
};

ApiProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default ApiProvider;