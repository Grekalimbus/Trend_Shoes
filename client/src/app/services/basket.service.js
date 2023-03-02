import { toast } from "react-toastify";
import httpServices from "./http.service";

const addInitialItemBasket = async (activeSize, data, dataSizes, userId) => {
    const changeQuantity = data.quantity.map((item, index) => {
        if (
            dataSizes[index].value === 0 &&
            dataSizes[index].sizes === activeSize
        ) {
            toast.error("Размеров нет");
            return null;
        } else if (item.sizes === activeSize && dataSizes[index].value !== 0) {
            return { sizes: item.sizes, value: (item.value += 1) };
        }
        return item;
    });
    const validateQuantity = changeQuantity.every((item) => item);

    if (validateQuantity) {
        const changeData = { ...data, quantity: changeQuantity };
        const dataBasket = httpServices.patch(`basket/${userId}`, changeData);
        toast.success("Товар был добавлен в корзину");
    }
};

function compareQuantity(item, dataSizes) {
    if (JSON.stringify(item) === JSON.stringify(dataSizes)) {
        return true;
    }
    return false;
}
const increment = async (
    data,
    activeSize,
    dataSizes,
    changeState,
    user,
    basketFromDB,
    history
) => {
    let copyData = { ...data };
    data.quantity.forEach((item, index) => {
        if (
            item.sizes === activeSize &&
            compareQuantity(item, dataSizes[index])
        ) {
            toast.info("Размеров больше нет");
        } else if (
            item.sizes === activeSize &&
            !compareQuantity(item, dataSizes[index])
        ) {
            const newQuantityForCopyData = copyData.quantity.map((item) => {
                if (item.sizes === activeSize) {
                    const newObject = { ...item };
                    return {
                        sizes: newObject.sizes,
                        value: (newObject.value += 1)
                    };
                }
                return item;
            });
            copyData = { ...data, quantity: newQuantityForCopyData };
            changeState(copyData);
            const checkProductForBasket = basketFromDB.some((item) => {
                return item._id === data._id;
            });
            if (!checkProductForBasket) {
                const newDataForBasketDB = [copyData];
                const dataConcatWithBasketDB =
                    newDataForBasketDB.concat(basketFromDB);
                httpServices.put(`basket/${user._id}`, dataConcatWithBasketDB);
                if (history !== "/basketPage") {
                    toast.dark("Товар был добавлен в корзину");
                }
            } else {
                const historyForDB = basketFromDB.map((item) => {
                    if (item._id === copyData._id) {
                        return copyData;
                    }
                    return item;
                });
                httpServices.put(`basket/${user._id}`, historyForDB);
                if (history !== "/basketPage") {
                    toast.dark("Товар был добавлен в корзину");
                }
            }
        }
    });
};

const decrement = async (
    data,
    activeSize,
    dataSizes,
    changeState,
    user,
    basketFromDB
) => {
    let copyData = { ...data };
    data.quantity.forEach((item, index) => {
        if (item.sizes === activeSize && item.value !== 0) {
            const newQuantityForCopyData = copyData.quantity.map((item) => {
                if (item.sizes === activeSize) {
                    const newObject = { ...item };
                    return {
                        sizes: newObject.sizes,
                        value: (newObject.value -= 1)
                    };
                }
                return item;
            });
            copyData = { ...data, quantity: newQuantityForCopyData };

            changeState(copyData);
            const validateDataQuantity = copyData.quantity.every(
                (item) => !item.value
            );

            if (validateDataQuantity) {
                const filterData = basketFromDB.filter(
                    (item) => item._id !== data._id
                );
                httpServices.put(`basket/${user._id}`, filterData);
                window.location.reload();
            } else {
                const historyForDB = basketFromDB.map((item) => {
                    if (item._id === copyData._id) {
                        return copyData;
                    }
                    return item;
                });
                httpServices.put(`basket/${user._id}`, historyForDB);
            }
        }
    });
};

const clearBasket = async (user) => {
    httpServices.put(`basket/${user._id}`, []);
    window.location.reload();
};

const deleteProductDB = async (data, user, basketFromDB) => {
    const filterData = basketFromDB.filter((item) => item._id !== data._id);
    httpServices.put(`basket/${user._id}`, filterData);
    window.location.reload();
};

export const basketService = {
    addInitialItemBasket,
    increment,
    decrement,
    clearBasket,
    deleteProductDB
};
