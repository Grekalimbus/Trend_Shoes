import React, { useContext } from "react";
import PropTypes from "prop-types";
import httpServices from "../../services/http.service";
import dataBasket from "../../utils/getBasket";
import localStorageService from "../../services/localStorage.service";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user";

const ApiContext = React.createContext();

export const useApi = () => {
    return useContext(ApiContext);
};

const ApiProvider = ({ children }) => {
    const user = useSelector(getUser());
    const basketDataSizes = dataBasket.getBasketSizes();
    const userID = localStorageService.getUserId();

    // деформация или удаление product с DB
    const handleChangeProduct = async (
        filterProduct,
        quantityProduct,
        dataForm,
        user,
        product,
        historyPurchases
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
        // const handleChangeHistoryPurchases = () => {
        //     if (historyPurchases === null) {
        //         setHistoryPurchases(transformProductForHistory);
        //     } else if (historyPurchases !== null) {
        //         transformProductForHistory.forEach((item) => {
        //             setHistoryPurchases((prevState) => prevState.push(item));
        //         });
        //     }
        // };
        // handleChangeHistoryPurchases();

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
            console.log("try");
            // const dataHistoryPurchases = await httpServices.put(
            //     `historyPurchases/${userID}.json?auth=${accessToken}`,
            //     historyPurchases !== null
            //         ? historyPurchases
            //         : transformProductForHistory
            // );
            // const dataPrice = await httpServices.put(
            //     `users/${userID}/balance.json?auth=${accessToken}`,
            //     newBalance
            // );
            // const { data } = await httpServices.put(
            //     `/product.json?auth=${accessToken}`,
            //     { ...transformProduct() }
            // );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ApiContext.Provider
            value={{
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
