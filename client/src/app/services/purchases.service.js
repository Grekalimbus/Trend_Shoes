import { toast } from "react-toastify";
import localStorageService from "./localStorage.service";
import httpServices from "./http.service";

const handleChangeProduct = async (
    filterProduct,
    quantityProduct,
    dataForm,
    user,
    product,
    historyPurchases
) => {
    const basketDataSizes = filterProduct.filter((item) => {
        return item.quantity;
    });
    const userID = localStorageService.getUserId();
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
        if (!historyPurchases || !historyPurchases[0]?.history.length) {
            return transformProductForHistory;
        } else if (historyPurchases[0]?.history.length) {
            const newArr = historyPurchases[0]?.history
                .concat(transformProductForHistory)
                .reverse();
            return newArr;
        }
    };
    const newHistoryArr = handleChangeHistoryPurchases();
    if (product) {
        product.forEach((objectProduct) => {
            filterProduct.forEach((itemBasket) => {
                if (itemBasket._id === objectProduct._id) {
                    changeArrayProduct.push({ ...objectProduct });
                }
            });
        });
    }
    const arrayQuantityProduct = changeArrayProduct.map(
        (item) => item.quantity
    );

    const changeQuantity = arrayQuantityProduct.map((item, index) => {
        const indexQuantityProduct = quantityProduct[index];
        const changeItem = item.map((item, indexQuantity) => {
            const newOb = { ...item };
            return {
                ...newOb,
                value: (newOb.value -=
                    indexQuantityProduct[indexQuantity].value)
            };
        });
        return changeItem;
    });

    const finishChangeProduct = changeArrayProduct.map((item, index) => {
        return { ...item, quantity: changeQuantity[index] };
    });
    const handleGetProduct = (item) => {
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
        if (handleGetProduct(item)._id === item._id) {
            return handleGetProduct(item);
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
        const dataHistoryPurchases = await httpServices.patch(
            `historyPurchases/${userID}`,
            newHistoryArr
        );
        const dataPrice = await httpServices.patch(`user/${userID}/balance`, {
            balance: newBalance
        });
        const { data } = await httpServices.patch(`/product`, {
            ...transformProduct()
        });
    } catch (error) {
        toast.error(error.message);
        console.log(error);
    }
};

export default handleChangeProduct;
