import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import httpServices from "../../services/http.service";
import dataBasket from "../../utils/getBasket";
import localStorageService from "../../services/localStorage.service";

const ApiContext = React.createContext();

export const useApi = () => {
    return useContext(ApiContext);
};

const ApiProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [dataFirm, setDataFirm] = useState(null);
    const basketDataSizes = dataBasket.getBasketSizes();

    // пулл данных в состояния product/dataFirm
    useEffect(() => {
        const getDataProductAndFirm = async () => {
            try {
                const { data } = await httpServices.get("/product.json");
                const firm = await httpServices.get("/firm.json");

                setProduct(Object.keys(data).map((item) => data[item]));
                setDataFirm(firm.data);
            } catch (error) {
                console.log("expectedErrors");
            }
        };

        getDataProductAndFirm();
    }, []);
    // деформация или удаление product с DB
    const handleChangeProduct = async (filterProduct, quantityProduct) => {
        const changeArrayProduct = [];
        product.forEach((objectProduct) => {
            filterProduct.forEach((itemBasket) => {
                if (itemBasket._id === objectProduct._id) {
                    changeArrayProduct.push({ ...objectProduct });
                }
            });
        });
        const arrayQuantityProduct = changeArrayProduct.map(
            (item) => item.quantity
        );
        const changeQuantity = arrayQuantityProduct.map((item, index) => {
            const indexQuantityProduct = quantityProduct[index];
            const changeItem = item.map((item, indexQuantity) => {
                return {
                    sizes: item.sizes,
                    value: (item.value -=
                        indexQuantityProduct[indexQuantity].value)
                };
            });
            return changeItem;
        });
        const finishChangeProduct = changeArrayProduct.map((item, index) => {
            return { ...item, quantity: changeQuantity[index] };
        });
        const getProduct = (item) => {
            let newObject = {};
            finishChangeProduct.forEach((itemProduct) => {
                if (itemProduct._id === item._id) {
                    newObject = itemProduct;
                } else {
                    newObject = item;
                }
            });
            return newObject;
        };
        const newDataProduct = product.map((item) => {
            if (getProduct(item)._id === item._id) {
                return getProduct(item);
            }
            return item;
        });
        const deleteProdct = newDataProduct.filter((item, index) => {
            return (
                JSON.stringify(item.quantity) !==
                JSON.stringify(basketDataSizes[index])
            );
        });
        const transformProduct = () => {
            const product = {};
            deleteProdct.forEach((item) => {
                product[item._id] = item;
            });
            return product;
        };
        console.log(transformProduct());
        // сделать проверку, есть ли в объекте quantity где все value = 0
        // изменить объекты в базе данных
        // сделать так, чтобы объект удалялся, если все value 0
        // сделать счет баланса

        const accessToken = localStorageService.getAccessToken();
        // const newBalance =
        try {
            const { data } = await httpServices.put(
                `/product.json?auth=${accessToken}`,
                { ...transformProduct() }
            );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ApiContext.Provider
            value={{
                product: product,
                dataFirm: dataFirm,
                handleChangeProduct
            }}
        >
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
