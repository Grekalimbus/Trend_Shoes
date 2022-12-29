import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import httpServices from "../../services/http.service";
import dataBasket from "../../utils/getBasket";
import localStorageService from "../../services/localStorage.service";
import { useAuth } from "./useAuth";

const ApiContext = React.createContext();

export const useApi = () => {
    return useContext(ApiContext);
};

const ApiProvider = ({ children }) => {
    const [product, setProduct] = useState(null);
    const [dataFirm, setDataFirm] = useState(null);
    const [historyPurchases, setHistoryPurchases] = useState();
    const [allHistoryPurchases, setAllHistory] = useState();
    const { user } = useAuth();
    const basketDataSizes = dataBasket.getBasketSizes();
    const userID = localStorageService.getUserId();
    // пулл данных в состояния product/dataFirm
    useEffect(() => {
        const getDataProductAndFirm = async () => {
            try {
                const allHistory = await httpServices.get(
                    `historyPurchases.json`
                );
                const dataHistoryPurchases = await httpServices.get(
                    `historyPurchases/${userID}.json`
                );
                if (allHistory !== null) {
                    setAllHistory(allHistory.data);
                }
                if (dataHistoryPurchases !== null) {
                    setHistoryPurchases(dataHistoryPurchases.data);
                }
                const { data } = await httpServices.get("/product.json");
                const firm = await httpServices.get("/firm.json");

                setProduct(Object.keys(data).map((item) => data[item]));
                setDataFirm(firm.data);
            } catch (error) {
                console.log(error);
            }
        };

        getDataProductAndFirm();
    }, []);
    // изменение product/id
    const handleChangeProductID = async (id, object) => {
        try {
            const data = await httpServices.put(`product/${id}.json`, object);
        } catch (error) {
            console.log(error);
        }
    };
    // Удаление product
    const handleDeleteProduct = async (object) => {
        try {
            const data = await httpServices.put(`product.json`, object);
        } catch (error) {
            console.log(error);
        }
    };
    // деформация или удаление product с DB
    const handleChangeProduct = async (
        filterProduct,
        quantityProduct,
        dataForm
    ) => {
        const newDate = new Date();
        const day = newDate.getDate();
        const month = newDate.getMonth();
        const year = newDate.getFullYear();
        const hour = newDate.getHours();
        const minute = newDate.getMinutes();
        const stringDate = `${day}.${month}.${year}`;
        const timeDate = `${hour}:${minute}`;

        const changeArrayProduct = [];

        const transformProductForHistory = filterProduct.map((item) => {
            return {
                ...item,
                dataForm: dataForm,
                date: stringDate,
                time: timeDate
            };
        });
        const handleChangeHistoryPurchases = () => {
            console.log(historyPurchases);
            if (historyPurchases === null) {
                setHistoryPurchases(transformProductForHistory);
            } else if (historyPurchases !== null) {
                transformProductForHistory.forEach((item) => {
                    setHistoryPurchases((prevState) => prevState.push(item));
                });
            }
        };
        handleChangeHistoryPurchases();

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
        const accessToken = localStorageService.getAccessToken();
        const amount = localStorage.getItem("amount");
        const newBalance = user.balance - amount;

        try {
            const dataHistoryPurchases = await httpServices.put(
                `historyPurchases/${userID}.json?auth=${accessToken}`,
                historyPurchases !== null
                    ? historyPurchases
                    : transformProductForHistory
            );
            const dataPrice = await httpServices.put(
                `users/${userID}/balance.json?auth=${accessToken}`,
                newBalance
            );
            const { data } = await httpServices.put(
                `/product.json?auth=${accessToken}`,
                { ...transformProduct() }
            );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ApiContext.Provider
            value={{
                product: product,
                dataFirm: dataFirm,
                handleChangeProduct,
                historyPurchases,
                allHistoryPurchases,
                handleChangeProductID,
                handleDeleteProduct
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
