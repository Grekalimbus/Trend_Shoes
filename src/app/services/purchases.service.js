import { toast } from "react-toastify";
import localStorageService from "./localStorage.service";
import httpServices from "./http.service";
import dataBasket from "../utils/getBasket";

const handleChangeProduct = async (
    filterProduct,
    quantityProduct,
    dataForm,
    user,
    product,
    historyPurchases
) => {
    const basketDataSizes = dataBasket.getBasketSizes();
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
    const changeQuantity = arrayQuantityProduct[0].map((item, index) => {
        const indexQuantityProduct = quantityProduct[index];
        // const changeItem = item.map((item, indexQuantity) => {
        //     return {
        //         sizes: item.sizes,
        //         value: (item.value -= indexQuantityProduct[indexQuantity].value)
        //     };
        // });

        return item;
    });
    console.log("changeArrayProduct", changeArrayProduct);
    console.log("arrayQuantityProduct", arrayQuantityProduct);
    console.log("changeQuantity", changeQuantity);
    // const finishChangeProduct = changeArrayProduct.map((item, index) => {
    //     return { ...item, quantity: changeQuantity[index] };
    // });
    // const handleGetProduct = (item) => {
    //     let newObject = {};
    //     finishChangeProduct.forEach((itemProduct) => {
    //         if (itemProduct._id === item._id) {
    //             newObject = itemProduct;
    //         } else {
    //             newObject = item;
    //         }
    //     });
    //     return newObject;
    // };
    // const newDataProduct = product.map((item) => {
    //     if (handleGetProduct(item)._id === item._id) {
    //         return handleGetProduct(item);
    //     }
    //     return item;
    // });
    // const deleteProdct = newDataProduct.filter((item, index) => {
    //     return (
    //         JSON.stringify(item.quantity) !==
    //         JSON.stringify(basketDataSizes[index])
    //     );
    // });
    // const transformProduct = () => {
    //     const product = {};
    //     deleteProdct.forEach((item) => {
    //         product[item._id] = item;
    //     });
    //     return product;
    // };
    // const accessToken = localStorageService.getAccessToken();
    // const amount = localStorage.getItem("amount");
    // const newBalance = user.balance - amount;

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
        toast.error(error.message);
        console.log(error);
    }
};

export default handleChangeProduct;
