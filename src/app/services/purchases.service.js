import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllPurchases } from "../store/allPurchases";
import { getProduct } from "../store/product";
import { getPurchases } from "../store/userPurchases";

const historyPurchases = useSelector(getPurchases());
const allHistoryPurchases = useSelector(getAllPurchases());
const product = useSelector(getProduct());

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
            return {
                sizes: item.sizes,
                value: (item.value -= indexQuantityProduct[indexQuantity].value)
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
        toast.error(error.message);
        console.log(error);
    }
};
