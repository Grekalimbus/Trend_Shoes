import { toast } from "react-toastify";
import httpServices from "./http.service";

const addInitialItemBasket = async (
    activeSize,
    data,
    changeState,
    dataSizes,
    userId,
    productDB
) => {
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
    const filterChangeQuantity = changeQuantity.filter((item) => {
        return item.value !== 0;
    });
    const validateQuantity = changeQuantity.every((item) => item);

    if (validateQuantity) {
        const changeQuantityDB = productDB.quantity.map((item) => {
            if (item.sizes === activeSize) {
                const newObject = { ...item };
                return {
                    sizes: newObject.sizes,
                    value: (newObject.value -= 1)
                };
            }
            return item;
        });
        const filterChangedQuantityDB = changeQuantityDB.filter(
            (item) => item.value !== 0
        );
        const changeProductDB = {
            ...productDB,
            quantity: filterChangedQuantityDB
        };
        const nullValueForQuantity = changeProductDB.quantity.map((item) => {
            return { sizes: item.sizes, value: 0 };
        });
        const objectForChangeState = {
            ...changeProductDB,
            quantity: nullValueForQuantity
        };
        const changeData = { ...data, quantity: filterChangeQuantity };
        console.log(changeQuantity);
        const dataBasket = httpServices.patch(`basket/${userId}`, {
            ...changeProductDB,
            quantity: changeQuantity
        });
        const dataProduct = httpServices.put(
            `product/${changeData._id}`,
            changeProductDB
        );
        changeState(objectForChangeState);
        toast.success("Товар был добавлен в корзину");
    }
};

const handleIncrement = async (activeSize) => {
    if (!activeSize) {
        toast.error("Укажите размер");
    }
};

const handleDecrement = async (activeSize) => {
    if (!activeSize) {
        toast.error("Укажите размер");
    }
};

export const basketService = {
    addInitialItemBasket,
    handleIncrement,
    handleDecrement
};
